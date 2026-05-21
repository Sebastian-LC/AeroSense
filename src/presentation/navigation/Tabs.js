import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Text, Platform} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import DashboardScreen from '../screens/DashboardScreen';
import HistoryScreen from '../screens/HistoryScreen';
import SensorsScreen from '../screens/SensorsScreen';
import SettingsScreen from '../screens/SettingsScreen';

const Tab = createBottomTabNavigator();

const TabIcon = ({icon, color, focused}) => (
  <Text
    style={{
      color: color,
      fontSize: 20,
      fontWeight: focused ? 'bold' : 'normal',
      marginTop: 4, // Eliminamos el margen superior para que el icono suba
    }}>
    {icon}
  </Text>
);

const Tabs = () => {
  const insets = useSafeAreaInsets();

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#0f2133',
          borderTopColor: '#1d3347',
          height: Platform.OS === 'android' ? 100 : 88,
          paddingBottom: Platform.OS === 'android' ? 25 : (insets.bottom > 0 ? insets.bottom : 10),
        },
        tabBarActiveTintColor: '#4dabf7',
        tabBarInactiveTintColor: '#9fb6ce',
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: '600',
          marginBottom: Platform.OS === 'android' ? 8 : 0,
        },
      }}>
      <Tab.Screen
        name="Dashboard"
        component={DashboardScreen}
        options={{
          tabBarIcon: props => <TabIcon icon="📊" {...props} />,
        }}
      />
      <Tab.Screen
        name="Historial"
        component={HistoryScreen}
        options={{
          tabBarIcon: props => <TabIcon icon="🕒" {...props} />,
        }}
      />
      <Tab.Screen
        name="Sensores"
        component={SensorsScreen}
        options={{
          tabBarIcon: props => <TabIcon icon="📡" {...props} />,
        }}
      />
      <Tab.Screen
        name="Ajustes"
        component={SettingsScreen}
        options={{
          tabBarIcon: props => <TabIcon icon="⚙️" {...props} />,
        }}
      />
    </Tab.Navigator>
  );
};

export default Tabs;
