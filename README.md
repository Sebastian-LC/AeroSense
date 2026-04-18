# AeroSense – Monitoreo de calidad de aire interior (React Native)

Aplicación Android en React Native (JavaScript) con arquitectura limpia (presentation/domain/data), simulación realista de CO₂ y PM2.5 por minuto, clasificación de riesgo con tendencia, visualización en tiempo real, almacenamiento en Firestore y notificaciones FCM en cambios de estado. Preparada para reemplazar la simulación por datos reales (ESP32 vía WiFi/Firebase).

## Estructura
```
src/
  presentation/
    navigation/RootNavigator.js, Tabs.js
    screens/OnboardingScreen.js, DashboardScreen.js, HistoryScreen.js, SettingsScreen.js
    components/StatusPill.js, MetricCard.js, TrendArrow.js, LineChartCard.js, ScenarioSelector.js, RootGradient.js
    hooks/useNotifications.js
    state/useAirQualityStore.js
  domain/
    models/Reading.js, AirQualityState.js, Trend.js
    usecases/getTrend.js, classifyState.js, generateSimReading.js, onStateChangeNotify.js
    services/AirQualityDataSource.js, AirQualityRepository.js
  data/
    datasources/simulation/SimulationDataSource.js
    datasources/firebase/FirebaseDataSource.js
    repositories/AirQualityRepositoryImpl.js
    mappers/readingMapper.js
  config/firebase/index.js
  constants/thresholds.js, scenarios.js, colors.js
  utils/format.js, notifications.js
```

## Instalación
```bash
cd AeroSense
npm install   # o yarn
```
Dependencias clave: Zustand, React Navigation, react-native-chart-kit + react-native-svg, @react-native-firebase/app|firestore|messaging, @notifee/react-native, seedrandom, date-fns.

### Android
1) Coloca `android/app/google-services.json` de tu proyecto Firebase.
2) Ejecuta:
```bash
npm run android
```

## Simulación y lógica
- Ticks cada 60s (5s en modo desarrollo) generados por `SimulationDataSource` usando patrones por escenario (oficina vacía, ocupada, mala ventilación), drift progresivo, eventos de ventilación y ruido reproducible (`seedrandom`).
- Tendencia: pendiente de los últimos 5 puntos (up/flat/down) con rachas.
- Clasificación: umbrales CO₂ (<800/<1200/>1200), PM2.5 (<12/<35/>35), escalamiento si tendencia asciende y está cerca del siguiente umbral, desescalamiento si cae 3 muestras seguidas. Estados: Normal, Saturación progresiva, Riesgo cognitivo, Crítico.
- Persistencia: cada lectura se intenta guardar en Firestore `air_quality/{timestamp}` con {co2, pm25, state} (best effort en simulación).

## UI
- Onboarding simple → Tabs.
- Dashboard: estado actual, métricas CO₂/PM2.5, flecha de tendencia, mini gráfica de 10 puntos.
- Historial: lista cronológica + carga desde Firestore.
- Ajustes: selector de escenario, toggle de fuente (simulación/Firebase), toggle de notificaciones.

## Notificaciones FCM
- `useNotifications` pide permiso y crea canal Android.
- `onStateChangeNotify` dispara notificación local (Notifee) sólo cuando cambia el estado.
- Para push remotas, crea una Cloud Function que observe `air_quality` y envíe FCM cuando `state` cambia.

## Preparado para ESP32
- Interfaz `AirQualityDataSource` permite añadir `Esp32DataSource` (HTTP/WebSocket/Firebase). Implementa `getData()` y `subscribe(cb)` y úsalo en `startStream('esp32')` sin tocar la capa de presentación.

## Cómo correr en desarrollo
- `npm start` para Metro.
- `npm run android` en emulador/dispositivo.
- Usa el toggle de notificaciones en Ajustes para probar (Android 13 requiere permiso; se solicita al abrir).

## Pruebas sugeridas (Jest)
- `classifyState` en límites y con tendencia asc/desc.
- `generateSimReading` mantiene rangos y aplica ventilación.
- Store: `startStream` produce lecturas y dispara una notificación sólo al cambiar estado (usar fake timers).
- Mapper Firestore round-trip.

## Notas
- Nombre de paquete Android: `com.aerosense`.
- Si no hay Firebase configurado, la app sigue funcionando en modo simulación.
