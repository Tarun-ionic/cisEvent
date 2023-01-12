import React, { useEffect } from 'react';
import {
    SafeAreaView,
    StyleSheet,
    Button,
    Text,
    View,
    TouchableOpacity,
    TextInput,
    Linking,
} from "react-native";
import CheckBox from '@react-native-community/checkbox';
import { useDispatch, useSelector } from 'react-redux';
import { getRegister } from '../slices/auth.slice';

export default RegisterScreen = ({ props, setHeaderShown }) => {
    const dispatch = useDispatch();
    const registerData = useSelector(state=>state.auth);
    const [name, onNameChange] = React.useState(null);
    const [email, onEmailChange] = React.useState(null);
    const [mobile, onMobileChange] = React.useState(null);
    const [password, onPasswordChange] = React.useState(null);
    const [confirmpassword, onConfirmPasswordChange] = React.useState(null);
    const [errorFlag, setErrorFlag] = React.useState(false);
    const [error, setError] = React.useState(null);
    const [isSelected, setSelection] = React.useState(false);

    const setErrorMessage = (status, errorMessage) => {
        setErrorFlag(status);
        setError(errorMessage);
    }

    useEffect(()=>{
        if(registerData?.data?.error){
            setErrorMessage(true, registerData?.data?.message);
        } else {
            setErrorMessage(false, null);
            props.navigation.navigate('Login')
            alert(registerData?.data?.message);
        }
    },[registerData])

    const openTandC = async()=>{
        await Linking.openURL('https://vesperr-react.netlify.app/terms-and-conditions')
    }

    const onRegister = () => {
        if (name && email && mobile && password && confirmpassword) {
            const reg = /^[0]?[789]\d{9}$/;
            const validRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
            if (reg.test(mobile) === false) {
                setErrorMessage(true, 'Mobile number is not valid.');
            } else if (password !== confirmpassword) {
                setErrorMessage(true, 'Passwoad and confirm password should be same.');
            } else if (validRegex.test(email) === false) {
                setErrorMessage(true, 'invalid email address.');
            }
            else {
                if (isSelected) {
                    setErrorMessage(false, null);
                    const registerData = {
                        'name': name,
                        'email': email,
                        'mobile': mobile,
                        'password': password,
                        'tNc': isSelected
                      };
                      dispatch(getRegister(registerData))
                } else {
                    setErrorMessage(true, 'Please check terms and conditions.');
                }
            }
        } else {
            setErrorMessage(true, 'All fields are required !!');
        }
    }

    return (
        <View style={{ flex: 1, justifyContent: 'center' }}>
            <View style={{alignItems:'center'}}>
                <Text style={{fontWeight:'800', fontSize:22, marginBottom:20}}>REGISTER</Text>
                </View>
            <SafeAreaView>
                <TextInput
                    style={styles.input}
                    onChangeText={onNameChange}
                    placeholder="Name*"
                    value={name}
                />
                <TextInput
                    style={styles.input}
                    onChangeText={onEmailChange}
                    placeholder="Email*"
                    value={email}
                />
                <TextInput
                    style={styles.input}
                    onChangeText={onMobileChange}
                    keyboardType="numeric"
                    placeholder="Mobile*"
                    value={mobile}
                />
                <TextInput
                    style={styles.input}
                    onChangeText={onPasswordChange}
                    placeholder="Password*"
                    secureTextEntry={true}
                    value={password}
                />

                <TextInput
                    style={styles.input}
                    onChangeText={onConfirmPasswordChange}
                    value={confirmpassword}
                    secureTextEntry={true}
                    placeholder="Confirm Password*"
                />
                {errorFlag && <View><Text style={{ color: 'red', marginLeft: 12 }}> {error} </Text></View>}

                <View style={styles.checkboxContainer}>
                    <CheckBox
                        style={styles.checkbox}
                        value={isSelected}
                        onValueChange={setSelection} />
                         <TouchableOpacity onPress={() => {openTandC() }}>
                    <Text style={styles.label}>Terms and condition</Text>
                         </TouchableOpacity>
                </View>

                <View style={styles.buttonStyle}>
                    <Button
                        onPress={() => { onRegister() }}
                        title="Register"
                    />
                    <View style={{ alignItems: 'center', marginTop: 40, flexDirection: 'row', justifyContent: 'center' }}>
                        <Text>Already have an account ?  </Text>
                        <TouchableOpacity onPress={() => { props.navigation.navigate('Login') }}>
                            <Text style={{ color: 'blue' }}>Login</Text>
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
    },
    label: {
        margin: 8,
    },
    checkboxContainer: {
        marginLeft: 8,
        flexDirection: "row",
        marginBottom: 10,
        marginTop: 10,
    },
});