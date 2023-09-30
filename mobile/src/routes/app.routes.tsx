import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Dashboard from '../pages/Dashboard';
import Profile from '../pages/Profile';
import CreateAppointment from '../pages/CreateAppointment';
import AppointmentCreated from '../pages/AppointmentCreated';

const Auth = createStackNavigator();

const Routes: React.FC = () => {
  return (
    <>
      <Auth.Navigator
        screenOptions={{
          headerShown: false,
          cardStyle: { backgroundColor: '#312e38' },
        }}
      >
        <Auth.Screen name="Dashboard" component={Dashboard} />
        <Auth.Screen name="Profile" component={Profile} />
        <Auth.Screen name="CreateAppointment" component={CreateAppointment} />
        <Auth.Screen name="AppointmentCreated" component={AppointmentCreated} />
      </Auth.Navigator>
    </>
  );
};

export default Routes;
