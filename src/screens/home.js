import React from 'react';
import { Button, View } from 'react-native';
import SettingScreen from './setting';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


const Stack = createNativeStackNavigator();

const RednersItem = (props) => <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Button
            onPress={() => props.navigation.navigate('Setting')}
            title="Go to setting"
        />
    </View>

export default HomeScreen = (props) => {
    return (
        <>
            <Stack.Navigator initialRouteName="Home"
                screenOptions={{
                    headerShown: false,
                }}>
                <Stack.Screen
                    name="home"
                    component={RednersItem}
                />
                  <Stack.Screen
                    name="Setting"
                    component={SettingScreen}
                />
            </Stack.Navigator>

        </>
    );
};

