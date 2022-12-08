

import React, { useEffect } from 'react';
import {
    SafeAreaView,
    StyleSheet,
    Button,
    Text,
    View,
    TouchableOpacity,
    TextInput,
    ScrollView,
    Image,
    Linking,
} from "react-native";
import CheckBox from '@react-native-community/checkbox';
import { useDispatch, useSelector } from 'react-redux';
import { getRegister } from '../slices/auth.slice';

export default ProfileScreen = ({ props }) => {
    const dispatch = useDispatch();
    const registerData = useSelector(state => state.auth);
    const [name, onNameChange] = React.useState(null);
    const [email, onEmailChange] = React.useState(null);
    const [mobile, onMobileChange] = React.useState(null);
    const [hobbies, onhobbiesChange] = React.useState(null);
    const [about, onaboutChange] = React.useState(null);
    const [title, ontitleChange] = React.useState(null);
    const [topic, ontopicChange] = React.useState(null);
    const [topicdesc, ontopicdescChange] = React.useState(null);
    const [address, onaddressChange] = React.useState(null);
    const [state, onstateChange] = React.useState(null);
    const [zipcode, onzipcodeChange] = React.useState(null);
    const [company, oncompanyChange] = React.useState(null);
    const [errorFlag, setErrorFlag] = React.useState(false);
    const [error, setError] = React.useState(null);
    const [isSelected, setSelection] = React.useState(false);

    const setErrorMessage = (status, errorMessage) => {
        setErrorFlag(status);
        setError(errorMessage);
    }

    const openTandC = async () => {
        await Linking.openURL('https://vesperr-react.netlify.app/terms-and-conditions')
    }

    const openCamera = () => {

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
        <SafeAreaView>
            <ScrollView>
                <View style={{ justifyContent: 'center' }}>
                    <TouchableOpacity onPress={() => { openCamera() }}>
                        <View style={styles.imageView}>
                            <Image
                                source={require('../assets/user.png')}
                                style={styles.sideMenuProfileIcon}
                            />
                        </View>
                    </TouchableOpacity>



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
                        onChangeText={onhobbiesChange}
                        placeholder="Your Hobbies"
                        value={hobbies}
                    />
                    <TextInput
                        style={styles.input}
                        onChangeText={onaboutChange}
                        placeholder="About You"
                        value={about}
                    />
                    <TextInput
                        style={styles.input}
                        onChangeText={ontitleChange}
                        placeholder="Title"
                        value={title}
                    />
                    <TextInput
                        style={styles.input}
                        onChangeText={ontopicChange}
                        placeholder="Topic"
                        value={topic}
                    />
                    <TextInput
                        style={styles.input}
                        onChangeText={ontopicdescChange}
                        placeholder="Topic description"
                        value={topicdesc}
                    />
                    <TextInput
                        style={styles.input}
                        onChangeText={onaddressChange}
                        placeholder="Address"
                        value={address}
                    />
                    <TextInput
                        style={styles.input}
                        onChangeText={onstateChange}
                        placeholder="State"
                        value={state}
                    />
                    <TextInput
                        style={styles.input}
                        onChangeText={onzipcodeChange}
                        placeholder="Zipcode"
                        value={zipcode}
                    />
                    <TextInput
                        style={styles.input}
                        onChangeText={oncompanyChange}
                        placeholder="Company name*"
                        value={company}
                    />

                    {errorFlag && <View><Text style={{ color: 'red', marginLeft: 12 }}> {error} </Text>
                    </View>}

                    <View style={styles.checkboxContainer}>
                        <CheckBox
                            style={styles.checkbox}
                            value={isSelected}
                            onValueChange={setSelection} />
                        <TouchableOpacity onPress={() => { openTandC() }}>
                            <Text style={styles.label}>Terms and condition</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.buttonStyle}>
                        <Button
                            onPress={() => { onRegister() }}
                            title="Update"
                        />

                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
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
    imageView: {
        resizeMode: 'center',
        width: 100,
        height: 100,
        borderRadius: 100,
        alignSelf: 'center',
        borderWidth: 2,
        marginTop: 40,
        alignItems: 'center'
    },
    sideMenuProfileIcon: {
        resizeMode: 'center',
        width: 90,
        height: 95,
        borderRadius: 50,
        alignSelf: 'center',
    },
});

