
import React, { useEffect, useState } from 'react';
import {
    View,
    SafeAreaView,
    TextInput,
    StyleSheet,
    ScrollView,
    Button,
    Text,
    Image,
    FlatList,
    TouchableOpacity,
} from 'react-native';
import { getEventLikeUpdate, getLikedEvents, getEventInterestUpdate, getMyEvents, getEventsData } from '../slices/event.slice';
import { useDispatch, useSelector } from 'react-redux';
const apiUrl = "https://pdng1.elb.cisinlive.com/";
import EventDetialsScreen from './eventdetails';
import AddEventModal from './addEvent';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Icon from 'react-native-vector-icons/Ionicons';
import Video from 'react-native-video';
const Stack = createNativeStackNavigator();

export default MyeventScreen = ({ props, setHeaderShown }) => {
    const dispatch = useDispatch();
    const eventData = useSelector(state => state.events?.data?.data?.data);
    const event = useSelector(state => state?.events);
    const getProfile = useSelector(state => state?.user?.data?.data);
    const [visible, setVisible] = React.useState(false);
    const [name, onNameChange] = React.useState(null);
    const [desc, onDescChange] = React.useState(null);
    const [pickerValue, setpickerValue] = React.useState('');
    const showModal = () => setVisible(true);
    const hideModal = () => setVisible(false);
    const containerStyle = { backgroundColor: 'white' };

    useEffect(() => {
        if (eventData?.data?.error) {
            console.log('events data ', eventData?.data?.error)
        }
    }, [eventData])

    useEffect(() => {
        const getNavigation = props.navigation.addListener("focus", () => {
            dispatch(getMyEvents({}));
        });
        return getNavigation;
    }, [props.navigation]);

    useEffect(() => {
        console.log('event ', JSON.stringify(event))
        if (event.status == 'fulfilled' && (event.apiName == 'getLikesUpdate' || event.apiName == 'getInterestUpdate')) {
            dispatch(getMyEvents({}));
        }
    }, [event])

    const WrapperComponent = () => {

    }

    const updateLikes = (id) => {
        dispatch(getEventLikeUpdate({ 'id': id }))
    }

    const updateInterested = (id) => {
        dispatch(getEventInterestUpdate({ 'event_id': id }))
    }

    const EventDetailScreen = props => (
        <EventDetialsScreen props={props} setHeaderShown={setHeaderShown} />
        );
        
        const AddEventScree = props => (
        <AddEventModal props={props} setHeaderShown={setHeaderShown} />
    );


    const createEvents = () => {
        console.log('worksssss');
        props.navigation.navigate('Add Event') 
    }



    const ShoweventScreen = () => {
        return (
            <SafeAreaView>
                <View>
                    <View>
                        <Button
                            onPress={() => createEvents()}
                            title="Create Event"
                        />
                    </View>

                    {!eventData?.length &&
                        <View style={{ alignItems: 'center', marginTop: '70%', justifyContent: 'center' }}>
                            <Text>No events found !</Text>
                        </View>}
                    <FlatList
                        data={eventData ? eventData : []}
                        renderItem={({ item }) => (
                            <View style={{ justifyContent: 'center', paddingBottom: 20 }}>
                                <TouchableOpacity onPress={() => { props.navigation.navigate('Details', { 'detailsItem': item }) }}>
                                    <View style={styles.boxcontainer}>
                                        {(item?.file_type == 'image' || item?.file_type == 'audio') && <Image style={styles.imageView} source={{ uri: apiUrl + item.file }} />}
                                        {item?.file_type == 'video' &&
                                            <Video source={{ uri: apiUrl + item?.file }} style={styles.backgroundVideo} />}
                                        <View>
                                            <Text style={styles.titleStyling}>{item.title}</Text>
                                            <Text numberOfLines={5} style={styles.eventDesc}>{item.description}</Text>
                                        </View>
                                        {item.likes.includes(getProfile?._id) ?
                                            <View style={styles.likeIconStyling}>
                                                <TouchableOpacity onPress={() => updateLikes(item._id)}>
                                                    <Icon
                                                        size={20}
                                                        color='red'
                                                        name="heart"
                                                    />
                                                </TouchableOpacity>
                                                <Text style={{ marginLeft: 5 }}>{item.likes.length}</Text>
                                            </View> :
                                            <View style={styles.likeIconStyling}>
                                                <TouchableOpacity onPress={() => updateLikes(item._id)}>
                                                    <Icon
                                                        size={20}
                                                        color='#000'
                                                        name="heart-outline"
                                                    />
                                                </TouchableOpacity>
                                                <Text style={{ marginLeft: 5 }}>{item.likes.length}</Text>
                                            </View>
                                        }

                                        <View style={styles.intrestedStyling}>
                                            <Icon
                                                size={20}
                                                color='#000'
                                                name="bookmark"
                                            />
                                            {item.interested_users.includes(getProfile?._id) ?
                                                <TouchableOpacity onPress={() => updateInterested(item._id)}>
                                                    <Text style={{ marginLeft: 7 }}>Interested</Text>
                                                </TouchableOpacity> :
                                                <TouchableOpacity onPress={() => updateInterested(item._id)}>
                                                    <Text style={{ marginLeft: 7 }}>Add to interest</Text>
                                                </TouchableOpacity>}
                                        </View>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        )}
                    />
                </View>
            </SafeAreaView>
        );
    }

    return (
        <>
            <Stack.Navigator initialRouteName="My Events"
                screenOptions={{
                    headerShown: true,
                    headerBackButtonMenuEnabled: false,
                }}>
                <Stack.Screen
                    name="My Events"
                    component={ShoweventScreen}
                    options={({ }) => ({
                        headerLeft: () => (
                            <TouchableOpacity onPress={() => props.navigation.openDrawer()}>
                                <Icon
                                    size={30}
                                    style={{ marginRight: 15 }}
                                    name="menu-outline"
                                />
                            </TouchableOpacity>
                        ),
                    })}
                />
                <Stack.Screen
                    name="Details"
                    component={EventDetailScreen}
                />
                  <Stack.Screen
                    name="Add Event"
                    component={AddEventScree}
                />
            </Stack.Navigator>

        </>
    );
};

const styles = StyleSheet.create({
    boxcontainer: {
        backgroundColor: '#ffffff',
        height: 200,
        marginTop: 10,
        marginLeft: 10,
        borderRadius: 5,
        width: '95%',
        elevation: 10,
        shadowColor: '#52006A',
        flexDirection: 'row',
        padding: 8
    },
    imageView: {
        height: 185,
        width: 180
    },
    titleStyling: {
        fontSize: 20,
        width: 180,
        fontWeight: '900',
        marginLeft: 5
    },
    backgroundVideo: {
        height: 185,
        width: 200
    },
    eventDesc: {
        marginLeft: 5,
        width: 180,
        marginTop: 15
    },
    likeIconStyling: {
        position: 'absolute',
        flexDirection: 'row',
        left: '52%',
        bottom: 10
    },
    intrestedStyling: {
        position: 'absolute',
        borderWidth: 1,
        padding: 5,
        flexDirection: 'row',
        bottom: 7,
        right: '2%',
        borderRadius: 5
    },
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        borderColor: 'grey',
        borderRadius: 5,
        padding: 10,
    },
    pickerStyle: {
        height: 150,
        width: "80%",
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
    }
})