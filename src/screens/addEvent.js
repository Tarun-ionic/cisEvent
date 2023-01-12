import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity, TextInput, StyleSheet, Button, ScrollView } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import DatePicker from 'react-native-date-picker';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { creatEevent, getEventsCategory } from '../slices/event.slice';
import { useDispatch, useSelector } from 'react-redux';

export default AddEventModal = (props) => {
    const dispatch = useDispatch();
    const [name, onNameChange] = React.useState(null);
    const [desc, onDescChange] = React.useState(null);
    const [category, setcategory] = React.useState('');
    const [language, setlanguage] = React.useState('');
    const [eventCategory, seteventCategory] = React.useState([]);
    const [date, setDate] = React.useState(new Date())
    const [open, setOpen] = React.useState(false);
    const [mediaData, setmediaData] = React.useState(null);
    const event = useSelector(state => state.events);
    const [errorFlag, setErrorFlag] = React.useState(false);
    const [error, setError] = React.useState(null);

    useEffect(() => {
        if (!event.categories) {
            console.log("event.categories", event.categories);
            dispatch(getEventsCategory())
        } else {
            console.log('its here')
        }
    }, []);

    useEffect(() => {
        if (event.status == 'fulfilled' && event.apiName == 'getEventsCategory') {
            console.log('event category', event?.categories?.data);
            seteventCategory(event?.categories?.data)
        }
        if (event.apiName == 'createEvent' && event.status == 'fulfilled') {
            console.log('event create', event);
            // props.navigation.goBack();
            props.navigation.navigate('My Events',{wentBack: true})
        }
    }, [event])



    const dateFormateFunc = (date) => {
        let formattedDate = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
        return formattedDate;
    }

    const setErrorMessage = (status, errorMessage) => {
        setErrorFlag(status);
        setError(errorMessage);
    }

    const createEvents = () => {
        if (name && desc && category && mediaData && language) {
            setErrorMessage(false, null);
            let formData = new FormData();
            formData.append('title', name)
            formData.append('description', desc)
            formData.append('category', category)
            formData.append('date', dateFormateFunc(date))
            formData.append('file', mediaData)
            formData.append('language', language)
            formData.append('tNc', true);
            dispatch(creatEevent(formData));
        } else {
            setErrorMessage(true, 'All fields are required !!');

        }
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
                setmediaData({ uri: response.assets[0].uri, name: response.assets[0].fileName, type: response.assets[0].type })
            }
        });
    };

    return (
        <ScrollView>
            <View style={{ width: '100%', backgroundColor: '#fff', flex: 1, paddingTop: 20 }}>
                <Text style={styles.textLabel}>Title *</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={onNameChange}
                    placeholder="Name*"
                    value={name}
                />
                <Text style={styles.textLabel}>Description *</Text>
                <TextInput
                    multiline={true}
                    numberOfLines={4}
                    style={styles.descInput}
                    onChangeText={onDescChange}
                    placeholder="Descriptions*"
                    value={desc}
                />
                <Text style={styles.textLabel}>Category *</Text>
                <View style={{ borderWidth: 1, marginHorizontal: 10, marginTop: 10, borderRadius: 5 }}>
                    {!!eventCategory?.length && <Picker style={styles.pickerStyle}
                        selectedValue={category}
                        onValueChange={(itemValue, itemPosition) =>
                            setcategory(itemValue)}
                    >
                        {eventCategory.map((item) =>
                            <Picker.Item label={item.name} value={item._id} key={item._id} />
                        )}
                    </Picker>
                    }
                </View>
                <Text style={styles.textLabel}>Date *</Text>
                <TouchableOpacity onPress={() => { setOpen(true) }}>
                    <View style={{ height: 40, marginHorizontal: 10, marginTop: 10, borderRadius: 5, borderWidth: 1 }}>
                        <Text style={{ fontSize: 16, margin: 8 }}>{dateFormateFunc(date)}</Text>
                    </View>
                </TouchableOpacity>
                <DatePicker
                    modal
                    open={open}
                    mode={'date'}
                    date={date}
                    onConfirm={(date) => {
                        setOpen(false)
                        setDate(date)
                    }}
                    onCancel={() => {
                        setOpen(false)
                    }}
                />
                <Text style={styles.textLabel}>Language *</Text>
                <View style={{ borderWidth: 1, marginHorizontal: 10, marginTop: 10, borderRadius: 5 }}>
                    <Picker style={styles.pickerStyle}
                        selectedValue={language}
                        onValueChange={(itemValue, itemPosition) =>
                            setlanguage(itemValue)}
                    >
                        {['Hindi', 'English'].map((items) =>
                            <Picker.Item label={items} value={items} />
                        )}

                    </Picker>
                </View>

                <Text style={styles.textLabel}>File *</Text>
                <View style={{ borderWidth: 1, marginHorizontal: 10, marginTop: 10, height: 40, borderRadius: 5 }}>
                    <TouchableOpacity onPress={() => { openCamera() }}>
                        <Text style={{ fontSize: 16, margin: 8 }} >Choose media...</Text>
                    </TouchableOpacity>
                </View>

                {errorFlag && <View><Text style={{ color: 'red', marginLeft: 12 }}> {error} </Text>
                </View>}


                <View style={{ marginHorizontal: 10, marginTop: 20, height: 40, borderRadius: 5 }}>
                    <Button
                        onPress={() => createEvents()}
                        title="Create Event"
                    />
                </View>
            </View>
        </ScrollView>

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
    pickerStyle: {
        width: "100%",
        color: '#344953',
        justifyContent: 'center',
    },
    descInput: {
        height: 100,
        margin: 12,
        borderWidth: 1,
        borderColor: 'grey',
        borderRadius: 5,
        padding: 5,
        textAlignVertical: 'top'
    },
    textLabel: {
        marginHorizontal: 10,
        marginTop: 10
    }
})