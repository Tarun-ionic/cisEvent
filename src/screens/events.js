import React, { useEffect, useState } from 'react';
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
import Icon from 'react-native-vector-icons/FontAwesome';
import { getEventLikeUpdate, getEventsData } from '../slices/event.slice';
import { useDispatch, useSelector } from 'react-redux';
const apiUrl = "https://pdng1.elb.cisinlive.com/";

export default EventsScreen = (props) => {
    const dispatch = useDispatch();
    const eventData = useSelector(state => state.events.data?.data.data);
    const event = useSelector(state => state.events);
    const getProfile = useSelector(state => state.user.data?.data)

    useEffect(() => {
        if (eventData?.data?.error) {
            console.log('events data ', eventData?.data?.error)
        }
    }, [eventData])

    useEffect(() => {
        dispatch(getEventsData({}));
    }, [])

    useEffect(()=>{
        console.log('event ', event)
        if(event.status == 'fulfilled' && event.apiName == 'getLikesUpdate'){
            dispatch(getEventsData({}));
        }
    },[event])

    const updateLikes = (id) => {
        dispatch(getEventLikeUpdate({ 'id': id }))
    }



    return (
        <SafeAreaView>
            {/* <ScrollView> */}
           <FlatList
                data={eventData ? eventData : []}
                renderItem={({ item }) => (
                    <View style={{ justifyContent: 'center', paddingBottom: 20 }}>
                        {/* {console.log('renderItem', item)} */}
                        <View style={styles.boxcontainer}>
                            <Image style={styles.imageView} source={{ uri: apiUrl + item.file }} />
                            <View>
                                <Text style={styles.titleStyling}>{item.title}</Text>
                                <Text numberOfLines={6} style={styles.eventDesc}>{item.description}</Text>
                            </View>
                            {item.likes.includes(getProfile._id) ?
                                <View style={styles.likeIconStyling}>
                                    <TouchableOpacity onPress={()=>updateLikes(item._id)}>
                                        <Icon
                                            size={20}
                                            color='red'
                                            name="heart"
                                        />
                                    </TouchableOpacity>
                                    <Text style={{ marginLeft: 5 }}>{item.likes.length}</Text>
                                </View> :
                                <View style={styles.likeIconStyling}>
                                    <TouchableOpacity onPress={()=>updateLikes(item._id)}>
                                        <Icon
                                            size={20}
                                            color='#000'
                                            name="heart-o"
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
                                <Text style={{ marginLeft: 7 }}>Intrested</Text>
                            </View>
                        </View>
                    </View>
                )}
            />
            {/* </ScrollView> */}
        </SafeAreaView>
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
    }
})