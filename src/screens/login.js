import React, { useEffect } from 'react';
import { getLogin } from '../slices/auth.slice';
import {
    SafeAreaView,
    StyleSheet,
    Button,
    Text,
    View,
    TouchableOpacity,
    TextInput
} from "react-native";
import { useDispatch, useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
export default LoginScreen = ({ props, setHeaderShown }) => {
    const dispatch = useDispatch();
    const authData = useSelector(state=>state.auth);
    const [email, onEmailChange] = React.useState(null);
    const [password, onPasswordChange] = React.useState(null);
    const [errorFlag, setErrorFlag] = React.useState(false);
    const [error, setError] = React.useState(null);

    const setErrorMessage = (status, errorMessage) => {
        setErrorFlag(status);
        setError(errorMessage);
    }

    useEffect(()=>{
        if(authData?.data?.error){
            setErrorMessage(true, authData?.data?.message);
        } if(authData?.data?.data) {
            setErrorMessage(false, null);
            setHeaderShown(true);
            console.log('authData?.data', authData?.data);
            AsyncStorage.setItem('accessToken', authData?.data.data.accessToken)
            props.navigation.navigate('Home')
        }
    },[authData])

    const onLogin = () => {
        const validRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
        if (email && password) {
            if (validRegex.test(email) === false) {
                setErrorMessage(true, 'invalid email address.');
            }
            else {
                setErrorMessage(false, null);
                dispatch(getLogin({'email':email, 'password':password}));
            }
        } else {
            setErrorMessage(true, 'Email and password fields are require !');
        }
    }

    return (
        <View style={{ flex: 1, justifyContent: 'center' }}>
            <View style={{ alignItems: 'center' }}><Text style={{ fontWeight: '800', fontSize: 22, marginBottom: 20 }}>LOGIN</Text></View>
            <SafeAreaView>
                <TextInput
                    style={styles.input}
                    onChangeText={onEmailChange}
                    placeholder="Email"
                    value={email}
                />

                <TextInput
                    style={styles.input}
                    onChangeText={onPasswordChange}
                    value={password}
                    secureTextEntry={true}
                    placeholder="Password"
                />
                {errorFlag && <View><Text style={{ color: 'red', marginLeft: 12 }}> {error} </Text></View>}

                <View style={styles.buttonStyle}>
                    <Button
                        onPress={() => { onLogin() }}
                        title="LOGIN"
                    />
                    <View style={{ alignItems: 'center', marginTop: 40, flexDirection: 'row', justifyContent: 'center' }}>
                        <Text>Don't have an account ?  </Text>
                        <TouchableOpacity onPress={() => { props.navigation.navigate('Register'); }}>
                            <Text style={{ color: 'blue' }}>Register</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </SafeAreaView>
        </View>
    );
};

const styles = StyleSheet.create({
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        borderColor: 'grey',
        borderRadius: 5,
        padding: 10,
    },
    buttonStyle: {
        margin: 12
    }
});