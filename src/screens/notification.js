import React, { useEffect } from 'react';
import Video from 'react-native-video';

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
const apiUrl = "https://pdng1.elb.cisinlive.com/";
import Icon from 'react-native-vector-icons/Ionicons';

import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import EventDetialsScreen from './eventdetails';
import AddEventModal from './addEvent';
import { useDispatch, useSelector } from 'react-redux';
import { getInterestedEventsData, getMyEvents } from '../slices/event.slice';
// import LoginScreen from './login'

const Tab = createMaterialTopTabNavigator();

export default NotificationsScreen = (props) => {
    const dispatch = useDispatch();
    const getProfile = useSelector(state => state?.user?.data?.data);
    const eventData = useSelector(state => state.events?.data?.data?.data);
    const event = useSelector(state => state?.events);
    const [interesetdEvent, setinteresetdEvent] = React.useState([]);
    const [myevents, setmyevents] = React.useState([]);

    useEffect(() => {
        const getNavigation = props.navigation.addListener("focus", () => {
            console.log('focus navigate page')
            dispatch(getMyEvents({}));
            dispatch(getInterestedEventsData({}));
        });
        return getNavigation;
    }, []);

    useEffect(() => {
        if (event.status == 'fulfilled' && (event.apiName == 'getInterestedEvents')) {
            setinteresetdEvent(event?.data?.data?.data)
        }
        if (event.status == 'fulfilled' && (event.apiName == 'getMyEvents')) {
            setmyevents(event?.data?.data?.data)
        }
    }, [event])

    const InterestedEventsScreen = () => {
        return (
            <SafeAreaView>
                <View>
                    {!interesetdEvent?.length &&
                        <View style={{ alignItems: 'center', marginTop: '70%', justifyContent: 'center' }}>
                            <Text>No events found !</Text>
                        </View>}
                    <View style={{marginBottom:100}}>
                        <FlatList
                            data={interesetdEvent ? interesetdEvent : []}
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
                                                <TouchableOpacity onPress={() => updateInterested(item._id)}>
                                                    <Icon
                                                        size={20}
                                                        color='#000'
                                                        name="pencil"
                                                    />
                                                </TouchableOpacity>
                                            </View>
                                            <View style={styles.deleteStyling}>
                                                <TouchableOpacity onPress={() => deleteEventFunc(item._id)}>
                                                    <Icon
                                                        size={20}
                                                        color='red'
                                                        name="trash-sharp"
                                                    />
                                                </TouchableOpacity>
                                            </View>
                                        </View>
                                    </TouchableOpacity>
                                </View>
                            )}
                        />
                    </View>
                </View>
            </SafeAreaView>
        );
    }

    const ShoweventScreen = ()=>{
        return (
            <SafeAreaView>
                <View>
                    <View>
                        <Button
                            onPress={() => createEvents()}
                            title="Create Event"
                        />
                    </View>

                    {!myevents?.length &&
                        <View style={{ alignItems: 'center', marginTop: '70%', justifyContent: 'center' }}>
                            <Text>No events found !</Text>
                        </View>}
                    <View style={{marginBottom:100}}>
                        <FlatList
                            data={myevents ? myevents : []}
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
                                                <TouchableOpacity onPress={() => updateInterested(item._id)}>
                                                    <Icon
                                                        size={20}
                                                        color='#000'
                                                        name="pencil"
                                                    />
                                                </TouchableOpacity>
                                            </View>
                                            <View style={styles.deleteStyling}>
                                                <TouchableOpacity onPress={() => deleteEventFunc(item._id)}>
                                                    <Icon
                                                        size={20}
                                                        color='red'
                                                        name="trash-sharp"
                                                    />
                                                </TouchableOpacity>
                                            </View>
                                        </View>
                                    </TouchableOpacity>
                                </View>
                            )}
                        />
                    </View>
                </View>
            </SafeAreaView>
        );
    }
 

 

  return (
    <Tab.Navigator>
      <Tab.Screen name="My events" component={ShoweventScreen} />
      <Tab.Screen name="Interested events" component={InterestedEventsScreen} />
    </Tab.Navigator>
  );
}

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
        padding: 5,
        flexDirection: 'row',
        bottom: 7,
        right: '2%',
        borderRadius: 5
    },
    deleteStyling: {
        position: 'absolute',
        padding: 5,
        flexDirection: 'row',
        bottom: 7,
        right: '15%',
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
