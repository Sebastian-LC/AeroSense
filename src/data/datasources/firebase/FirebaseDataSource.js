// Firebase temporalmente deshabilitado para presentación
export class FirebaseDataSource {
  constructor() {
    console.log('FirebaseDataSource: Modo deshabilitado');
  }

  async getData() {
    return null;
  }

  subscribe(callback) {
    console.log('FirebaseDataSource: Subscripción omitida (Modo Simulación Activo)');
    return () => {}; // No hace nada
  }

  mapData(data) {
    return null;
  }
}
