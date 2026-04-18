import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Text} from 'react-native';
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
      marginTop: 4,
    }}>
    {icon}
  </Text>
);

const Tabs = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#0f2133',
          borderTopColor: '#1d3347',
          height: 60,
          paddingBottom: 8,
        },
        tabBarActiveTintColor: '#4dabf7',
        tabBarInactiveTintColor: '#9fb6ce',
        tabBarLabelStyle: {fontSize: 12, fontWeight: '500'},
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
