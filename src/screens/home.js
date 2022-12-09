import React, { useEffect } from 'react';
import { Button, View } from 'react-native';
import SettingScreen from './setting';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useDispatch } from 'react-redux';
import { getProfile } from '../slices/user.slice';


const Stack = createNativeStackNavigator();

const RednersItem = (props) => {
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Button
                onPress={() => props.navigation.navigate('Profile')}
                title="Go to profile"
            />
        </View>)
}



export default HomeScreen = (props) => {
    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(getProfile());
    },[])
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

