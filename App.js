import 'react-native-gesture-handler';

import * as React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Employee from './page/Employee';
import AddEmployee from './page/AddEmployee';
import EditEmployee from './page/EditEmployee';
import ViewEmployee from './page/ViewEmployee';
import DeleteEmployee from './page/DeleteEmployee';
import { Ionicons } from '@expo/vector-icons';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      
      <Stack.Navigator initialRouteName="Employee">
        <Stack.Screen
          name="Employee"
          component={ViewEmployee}
          options={{
            
            title: 'Employee Registration',
            headerStyle: {
              backgroundColor: '#00AD98',
             
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',

            },
            
          }}
          
        />
        <Stack.Screen
          name="Register"
          component={AddEmployee}
          options={{
            title: 'Add Employee',
            headerStyle: {
              backgroundColor: '#2992C4',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}
        />
        <Stack.Screen
          name="Update"
          component={EditEmployee}
          options={{
            title: 'Edit Employee',
            headerStyle: {
              backgroundColor: '#A45BB9',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}
        />
        <Stack.Screen
          name="View"
          component={ViewEmployee}
          options={{
            title: 'View Employee',
            headerStyle: {
              backgroundColor: '#384F62',
            },
            headerTintColor: 'red',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}
        />
        <Stack.Screen
          name="Delete"
          component={DeleteEmployee}
          options={{
            title: 'Employee Deleted',
            headerStyle: {
              backgroundColor: '#D1503A',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
