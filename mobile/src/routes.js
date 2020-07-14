import React from 'react';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import SignIn from './Pages/SignIn';
import Entregas from './Pages/Dashboard';
import Details from './Pages/Details';
import Profile from './Pages/Profile';
import CreateProblem from './Pages/CreateProblem';
import ConfirmDelivery from './Pages/ConfirmDelivery';
import ProblemsPage from './Pages/ProblemsPage';
import {createStackNavigator} from 'react-navigation-stack';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {TouchableOpacity} from 'react-native-gesture-handler';

export default (signedIn = false) =>
  createAppContainer(
    createSwitchNavigator(
      {
        Sign: createSwitchNavigator({
          SignIn,
        }),
        App: createBottomTabNavigator(
          {
            Dashboard: {
              screen: createStackNavigator(
                {
                  Entregas,
                  Details,
                  CreateProblem,
                  ProblemsPage,
                  ConfirmDelivery,
                },
                {
                  defaultNavigationOptions: ({navigation}) => ({
                    // headerTransparent: true,
                    headerBackTitleVisible: false,
                    headerTintColor: '#fff',
                    headerTitleStyle: {
                      fontWeight: 'bold',
                      fontSize: 16,
                    },
                    headerBackAllowFontScaling: true,
                    headerLeft: () => (
                      <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Icon name="chevron-left" size={25} color="#fff" />
                      </TouchableOpacity>
                    ),
                  }),
                },
              ),
              navigationOptions: {
                tabBarLabel: 'Entregas',
                tabBarIcon: ({tintColor}) => (
                  <Icon name="reorder" size={20} color={tintColor} />
                ),
                activeTintColor: '#7D40E7',
              },
            },
            Profile,
          },
          {
            tabBarOptions: {
              activeTintColor: '#7D40E7',
              style: {height: 70, paddingVertical: 12},
            },
          },
        ),
      },
      {
        initialRouteName: signedIn ? 'App' : 'Sign',
      },
    ),
  );
