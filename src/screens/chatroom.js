import React, { useEffect } from 'react';
import { Button, Text, StyleSheet, View, FlatList, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { getAllUsers } from '../slices/user.slice';
import { auth, database } from '../services/firebase';
import { collection, addDoc, where, orderBy, query, onSnapshot } from 'firebase/firestore';
import Chat from './chat'
import SettingScreen from './setting';

import Icon from 'react-native-vector-icons/Ionicons';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

export default ChatroomScreen = (props) => {
    const dispatch = useDispatch();
    const getALlUSersArr = useSelector(state => state.user);
    const [usersList, setUsersList] = React.useState([])
    const getProfile = useSelector(state => state.user?.data?.data);

    useEffect(() => {
        dispatch(getAllUsers());
    }, [])

    const goToChat = (userId) => {
        props.navigation.navigate('Chat', { 'recieverId': userId })
    }

    const checkChatThread = (userId) => {
        const collectionRef = collection(database, 'Chatroom');
        const queryRef = query(collectionRef, where('users', "array-contains", (getProfile?._id)))
        const unsubscribe = onSnapshot(queryRef, snapshot => {
            console.log('snapshot', snapshot.docs);
            if (!snapshot?.docs.length) {
                let chatRoom = {
                    type: "oneToOne",
                    users: [userId, getProfile?._id],
                    from: getProfile?._id,
                    to: userId,
                    lastMessage: null,
                    lastMessageTime: null,
                    lastMessagetimeStapm: null,
                    unreadCount: 0,
                    fromName: getProfile?.name,
                    toName: 'name',
                    groupName: null
                }
                addDoc(collection(database, 'Chatroom'), chatRoom);
            } else {
                let isFound = false;
                snapshot.docs.map(doc => {
                    let newArr = doc.data()['users'];
                    if (newArr.includes(userId) && newArr.includes(getProfile?._id)) {
                        isFound = true;
                        console.log('this is chat thread ', doc.id);
                        props.navigation.navigate('Setting', { 'recieverId': userId, 'chatthread': doc.id })
                    }
                })
                if (!isFound) {
                    let chatRoom = {
                        type: "oneToOne",
                        users: [userId, getProfile?._id],
                        from: getProfile?._id,
                        to: userId,
                        lastMessage: null,
                        lastMessageTime: null,
                        lastMessagetimeStapm: null,
                        unreadCount: 0,
                        fromName: getProfile?.name,
                        toName: 'name',
                        groupName: null
                    }
                    addDoc(collection(database, 'Chatroom'), chatRoom);
                    checkChatThread(userId);
                }
            }
        })
        return () => unsubscribe();
    }

    useEffect(() => {
        if (getALlUSersArr.status == 'fulfilled' && getALlUSersArr.apiName == 'getallusers') {
            console.log('this is data from all users ', getALlUSersArr.userInfo);
            setUsersList(getALlUSersArr.userInfo.data)
        }
    }, [getALlUSersArr])

    const ShowChatScreen = () => {
        return (
            <View style={styles.container}>
                <FlatList
                    data={usersList ? usersList : []}
                    renderItem={({ item }) =>
                        <TouchableOpacity onPress={() => { checkChatThread(item._id) }}>
                            <View style={styles.userView}>
                                <Text style={styles.userText}>{item.name} </Text>
                            </View>
                        </TouchableOpacity>
                    }
                />

            </View>
        )
    }



    return (
        <>
            <Stack.Navigator initialRouteName="Chatroom"
                screenOptions={{
                    headerShown: true,
                    headerBackButtonMenuEnabled: false,
                }}>
                <Stack.Screen
                    name="Chatroom"
                    component={ShowChatScreen}
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
                    name="Chat"
                    component={Chat}
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
    container: {
        marginTop: 40
    },
    userView: {
        backgroundColor: '#fff',
        height: 50,
        width: '100%',
        elevation: 10,
        marginTop: 2,
        padding: 10

    },
    userText: {
        fontWeight: '800',
        fontSize: 14
    }
})

