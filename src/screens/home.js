import React, { useEffect } from 'react';
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
} from 'react-native';
import SettingScreen from './setting';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useDispatch } from 'react-redux';
import { getProfile } from '../slices/user.slice';
const apiUrl = "https://vesperr-react.netlify.app/";

const Stack = createNativeStackNavigator();

const RednersItem = (props) => {
    return (
        <View style={{ marginTop: 50 }}>
            <Image style={styles.imageView} source={{ uri: apiUrl + 'assets/img/hero-img.png' }} />
            <View style={{ margin: 20 }}>
                <Text style={{ fontWeight: '800', fontSize: 24 }}>Cyber Infrastructure (P) Ltd</Text>
            </View>
            <View style={{ marginHorizontal: 20, justifyContent:'flex-start' }}>
                <Text style={{ fontSize: 14 }}>Think Big. We make IT, Possible</Text>
            </View>
            <View style={{ marginTop: 30,  justifyContent:'center', alignItems:'center', alignContent:'center' }}>
                <Text style={{ fontWeight: '800', fontSize: 28 }}>About Us</Text>
            </View>
            <View style={{ marginHorizontal: 20,marginTop:25, justifyContent:'flex-start' }}>
                <Text style={{ fontSize: 14 }}>Cyber Infrastructure is #1 Technology solution provider that assures superb satisfaction for its clients and best work environment for its employees.</Text>
            </View>
        </View>
    )
}



export default HomeScreen = (props) => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getProfile());
    }, [])
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
