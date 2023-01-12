import React, { useEffect } from 'react';
import {ImagePicker} from 'react-native-image-picker';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';

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
import { updateProfile, getProfile, updateProfileImg } from '../slices/user.slice';
import MultiSelect from 'react-native-multiple-select';
const apiUrl = "https://pdng1.elb.cisinlive.com/";

export default ProfileScreen = ( props ) => {
    const dispatch = useDispatch();
    const getProfileData = useSelector(state => state.user.data?.data);
    const profile = useSelector(state => state.user);
    const [name, onNameChange] = React.useState(null);
    const [email, onEmailChange] = React.useState(null);
    const [mobile, onMobileChange] = React.useState(null);
    const [address, onaddressChange] = React.useState(null);
    const [state, onstateChange] = React.useState(null);
    const [imagePath, setimagePath] = React.useState(null);
    const [zipcode, onzipcodeChange] = React.useState(null);
    const [city, oncityChange] = React.useState(null);
    const [errorFlag, setErrorFlag] = React.useState(false);
    const [error, setError] = React.useState(null);
    const [isSelected, setSelection] = React.useState(false);

    const [selectedItem, setSelectedItem] = React.useState([]);

    const setErrorMessage = (status, errorMessage) => {
        setErrorFlag(status);
        setError(errorMessage);
    }

    const onSelectedItemsChange = (selectedItems) => {
        setSelectedItem(selectedItems)
    };

    const items = [{
        id: 'English',
        name: 'English'
    }, {
        id: 'Hindi',
        name: 'Hindi'
    }
    ];

    const openTandC = async () => {
        await Linking.openURL('https://vesperr-react.netlify.app/terms-and-conditions')
    }

    const openCamera = async () => {
        const options = {
          title: 'Choose Option',
          storageOptions: {
            skipBackup: true,
            path: 'images',
          },
        };
       await launchCamera(options, response => {
          if (response.didCancel) {
            console.log('User cancelled image picker');
          } else if (response.error) {
            console.log('ImagePicker Error: ', response.error);
          } else if (response.customButton) {
            console.log('User tapped custom button: ', response.customButton);
          } else {
            let formData = new FormData();
            formData.append('image', {uri:response.assets[0].uri,name:response.assets[0].fileName,type:response.assets[0].type})
            console.log('form data', JSON.stringify(formData))
            dispatch(updateProfileImg(formData));
          }
        });
      };


    useEffect(()=>{
        if(profile.status == 'fulfilled' && profile.apiName == 'getProfileUpdate'){
            props.navigation.navigate('Home')
        }
        if(profile.status == 'fulfilled' && profile.apiName == 'profileImg'){
        }
    },[profile])

    useEffect(() => {
        if (getProfileData) {
            onNameChange(getProfileData.name);
            onEmailChange(getProfileData.email);
            onMobileChange(getProfileData.mobile);
            onaddressChange(getProfileData.address);
            oncityChange(getProfileData.city);
            onstateChange(getProfileData.state);
            onzipcodeChange(getProfileData.zipcode);
            setSelection(getProfileData.tNc);
            setSelectedItem(getProfileData.language);
            setimagePath(getProfileData.image)
        }
    }, [getProfileData])


    const updateUserProfile = () => {
        if (name && email && mobile) {
            const reg = /^[0]?[789]\d{9}$/;
            const validRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
            if (reg.test(mobile) === false) {
                setErrorMessage(true, 'Mobile number is not valid.');
            } else if (validRegex.test(email) === false) {
                setErrorMessage(true, 'invalid email address.');
            }
            else {
                if (isSelected) {
                    setErrorMessage(false, null);
                    let reqData = {
                        "name": name,
                        "mobile": mobile,
                        "email": email,
                        "address": address,
                        "state": state,
                        "city": city,
                        "zipcode": zipcode,
                        "language": selectedItem,
                        "tNc": isSelected,
                        "_id": getProfileData._id,
                        "image": getProfileData.image
                    }
                    dispatch(updateProfile(reqData))
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
                            {imagePath ? <Image
                                source={{ uri: apiUrl + imagePath }}
                                style={styles.sideMenuProfileIcon}
                            /> :  <Image
                                source={require('../assets/user.jpg')}
                                style={styles.sideMenuProfileIcon}
                            />}
                           
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
                        onChangeText={oncityChange}
                        placeholder="City"
                        value={city}
                    />

                    {errorFlag && <View><Text style={{ color: 'red', marginLeft: 12 }}> {error} </Text>
                    </View>}

                    <View style={{ flex: 1 , width:'94%', marginLeft: 12}}>
                        <MultiSelect
                            hideTags
                            items={items}
                            uniqueKey="id"
                            // ref={(component) => { this.multiSelect = component }}
                            onSelectedItemsChange={onSelectedItemsChange}
                            selectedItems={selectedItem}
                            selectText={'   Select language : '+selectedItem}
                            searchInputPlaceholderText="Search language..."
                            // onChangeInput={(text) => console.log(text)}
                            altFontFamily="ProximaNova-Light"
                            tagRemoveIconColor="#CCC"
                            tagBorderColor="#CCC"
                            tagTextColor="#CCC"
                            selectedItemTextColor="#CCC"
                            selectedItemIconColor="#CCC"
                            itemTextColor="#000"
                            displayKey="name"
                            searchInputStyle={{ color: '#000' }}
                            submitButtonColor="#000"
                            submitButtonText="Submit"
                        />
                       </View>

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
                            onPress={() => { updateUserProfile() }}
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

