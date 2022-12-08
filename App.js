import 'react-native-gesture-handler';
import * as React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import HomeScreen from './src/screens/home'
import NotificationsScreen from './src/screens/notification'
import ProfileScreen from './src/screens/profile'
import LoginScreen from './src/screens/login'
import RegisterScreen from './src/screens/register'
import Icon from 'react-native-vector-icons/FontAwesome';
import CustomSidebarMenu from './CustomSidebarMenu';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Provider } from 'react-redux';
import { store } from './src/store';

const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();


export default function App() {
  const [headerShown, setHeaderShown] = React.useState(false);

  const PassingValues = props => (
    <LoginScreen props={props} setHeaderShown={setHeaderShown}/>
  );

  const RegisterVal = props => (
    <RegisterScreen props={props} setHeaderShown={setHeaderShown}/>
  );


  return (
    <Provider store={store}>
    <NavigationContainer>
      <Drawer.Navigator
        screenOptions={{swipeEnabled: headerShown, headerShown: headerShown, drawerStyle: { paddingTop: 20 } }}
        drawerContent={(props) => <CustomSidebarMenu {...props} />}>
        <Drawer.Screen name="Login" component={PassingValues}
          options={{
            title: 'Login'
          }}
        />
         <Drawer.Screen name="Register" component={RegisterVal}
          options={{
            title: 'Register'
          }}
        />
        <Drawer.Screen name="Home" component={HomeScreen}
          options={{
            title: 'Home',
            drawerIcon: ({ focused, size }) => (
              <Icon
                size={20}
                color={focused ? '#7cc' : '#ccc'}
                name="home"
              />
            ),
          }}
        />
        <Drawer.Screen name="Profile" component={ProfileScreen}
          options={{
            title: 'Profile',
            drawerIcon: ({ focused, size }) => (
              <Icon
                size={25}
                color={focused ? '#7cc' : '#ccc'}
                name="user"
              />
            ),
          }}
        />
        <Drawer.Screen name="Notifications" component={NotificationsScreen}
          options={{
            title: 'Notifications',
            drawerIcon: ({ focused, size }) => (
              <Icon
                size={20}
                color={focused ? '#7cc' : '#ccc'}
                name="bell"
              />
            ),
          }}
        />
      </Drawer.Navigator>
    </NavigationContainer>
    </Provider>
  );
}