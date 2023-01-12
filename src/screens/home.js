import React, { useEffect, useRef } from 'react';
import {
    Button,
    View,
    SafeAreaView,
    StyleSheet,
    ScrollView,
    Image,
    Text,
    FlatList,
    TouchableOpacity,
    Animated
} from 'react-native';
import SettingScreen from './setting';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useDispatch } from 'react-redux';
import { getProfile } from '../slices/user.slice';
import PushNotification from 'react-native-push-notification';
const apiUrl = "https://vesperr-react.netlify.app/";

const Stack = createNativeStackNavigator();

const RednersItem = (props) => {
    const fadeAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.timing(
            fadeAnim,
            {
                toValue: 1,
                duration: 3000,
                useNativeDriver: true
            }
        ).start();
    }, [fadeAnim])


    return (
        <View style={{ marginTop: 1 }}>

            <TouchableOpacity>
                <Image style={styles.imageView} source={{ uri: apiUrl + 'assets/img/hero-img.png' }} />
                <View style={{ margin: 20 }}>
                    <Text style={{ fontWeight: '800', fontSize: 24 }}>Cyber Infrastructure (P) Ltd</Text>
                </View>
            </TouchableOpacity>
            <View style={{ marginHorizontal: 20, justifyContent: 'flex-start' }}>
                <Text style={{ fontSize: 14 }}>Think Big. We make IT, Possible</Text>
            </View>
            <Animated.View
                style={{
                    opacity: fadeAnim,
                }}
            >
                <View style={{ marginTop: 30, justifyContent: 'center', alignItems: 'center', alignContent: 'center' }}>
                    <Text style={{ fontWeight: '800', fontSize: 28 }}>About Us</Text>
                </View>
                <View style={{ marginHorizontal: 20, marginTop: 25, justifyContent: 'flex-start' }}>
                    <Text style={{ fontSize: 14 }}>Cyber Infrastructure is #1 Technology solution provider that assures superb satisfaction for its clients and best work environment for its employees.</Text>
                </View>
            </Animated.View>

        </View>
    )
}



export default HomeScreen = (props) => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getProfile());
        getDeviceToken();
    }, [])

    const getDeviceToken = () => {
        setTimeout(() => {
            PushNotification.configure({
                onRegister: function (token) {
                    console.log("TOKEN hh:", token.token);
                },
                onNotification: function (notification) {
                    console.log("NOTIFICATION:", notification);
                },
            });
        }, 3000)
    }
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

const styles = StyleSheet.create({
    imageView: {
        height: 250,
        width: '100%'
    },
})
