import React, { useEffect, useState } from 'react';
import {
    Button,
    View,
    SafeAreaView,
    StyleSheet,
    ScrollView,
    Image,
    Text,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { getEventsData } from '../slices/event.slice';
import { useDispatch, useSelector } from 'react-redux';


export default EventsScreen = (props) => {
    const dispatch = useDispatch();
    const eventData = useSelector(state=>state.events);
    const [eventsData, setEventsData] = useState([]);
    console.log('eventData', eventData);

    useEffect(()=>{
        if(eventData?.data?.error){
            console.log('events data ', eventData?.data?.error)
        } if(eventData?.data?.data){
            console.log('events data ', eventData?.data?.data)
        }
    },[eventData])

    useEffect(()=>{
        dispatch(getEventsData({}));
    },[])


    return (
        <SafeAreaView>
            <ScrollView>
                <View style={{ justifyContent: 'center', paddingBottom: 20 }}>
                    <View style={styles.boxcontainer}>
                        <Image style={styles.imageView} source={require('../assets/user.png')} />
                        <View>
                            <Text style={styles.titleStyling}>Event title here !!! dfs sadfsd asfd</Text>
                            <Text style={styles.eventDesc}>Event descriptions here !!! Event descriptions here !!! Event descriptions here !!!</Text>
                        </View>
                        <View style={styles.likeIconStyling}>
                            <Icon
                                size={20}
                                color='red'
                                name="heart"
                            />
                            <Text style={{ marginLeft: 5 }}>10</Text>
                        </View>
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
            </ScrollView>
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
        borderWidth:1,
        padding:5,
        flexDirection: 'row',
        bottom: 7,
        right: '2%',
        borderRadius:5
    }
})