import React, { useState, useCallback, useEffect, useLayoutEffect } from 'react'
import { Button, FlatList, StyleSheet, Text, TextInput, View } from 'react-native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Ionicons';
import { collection, where, addDoc, orderBy, query, onSnapshot, doc } from 'firebase/firestore';
import { auth, database } from '../services/firebase';
import { useSelector } from 'react-redux';


export default SettingScreen = (props) => {
    let getReceiverId = props?.route.params.recieverId;
    let chatId = props?.route.params.chatthread;
    console.log('getReceiverId', chatId);
    const [messages, setMessages] = useState([]);
    const [sendMessage, onsendMessage] = React.useState(null);
    const getProfile = useSelector(state => state.user?.data?.data);

    useLayoutEffect(() => {
        const collectionRef = collection(database, 'chats');
        const queryRef = query(collectionRef, where('chatid', '==', chatId), orderBy('createdAt', 'desc'))
        const unsubscribe = onSnapshot(queryRef, snapshot => {
            console.log('snapshot', snapshot.docs);
            setMessages(snapshot.docs.map(doc => (
                {
                    chatid: doc.data().chatid,
                    createdAt: doc.data().createdAt.toDate(),
                    text: doc.data().text,
                    to: doc.data().to,
                    from: doc.data().from
                }
            )))
        })
        return () => unsubscribe();
    }, [])

    const onSend = (messages) => {
        console.log('this is message ', messages);
        if(messages){
            let messageObj = {
                chatid: chatId,
                createdAt: new Date(),
                text: messages,
                to: getReceiverId,
                from: getProfile?._id
            };
            console.log('this is message object ', messageObj);
            addDoc(collection(database, 'chats'), messageObj);
            onsendMessage('');
        }
    };

    // [class.left]="(service.userData.id) !=  msg.payload.doc.data().from"
    // [class.right]="(service.userData.id) ==  msg.payload.doc.data().from ">

    return (
        <View style={styles.chatConatiner}>
            <View style={{ marginBottom: 60 }}>
                <FlatList
                    nestedScrollEnabled
                    inverted
                    data={messages ? messages : []}
                    renderItem={({ item }) =>
                        <View style={item?.from == getProfile?._id ? styles.chatHeadsRight : styles.chatHeadsLeft}>
                            <Text style={{ color: '#fff', fontSize: 16 }}>{item?.text}</Text>
                        </View>
                    }
                />
            </View>
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    onChangeText={onsendMessage}
                    placeholder="Type your message here..."
                    value={sendMessage}
                />
                <TouchableOpacity onPress={() => console.log('send files')}>
                    <Icon
                        size={30}
                        style={{ marginRight: 15 }}
                        name="attach"
                    />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => onSend(sendMessage)}>
                    <Icon
                        size={30}
                        style={{ marginRight: 15, color: '#51a1d6' }}
                        name="send"
                    />
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    chatConatiner: {
        height: '100%'
    },
    chatHeadsLeft: {
        marginVertical: 8,
        marginHorizontal: 2,
        alignSelf: 'flex-start',
        backgroundColor: '#51a1d6',
        borderRadius: 5,
        maxWidth: 250,
        padding: 8
    },
    chatHeadsRight: {
        marginHorizontal: 2,
        marginVertical: 5,
        borderRadius: 5,
        maxWidth: 250,
        backgroundColor: '#000',
        alignSelf: 'flex-end',
        padding: 8
    },
    input: {
        height: 60,
        width: 320,
        borderColor: 'grey',
        padding: 10,
        fontSize: 16
    },
    inputContainer: {
        position: 'absolute',
        alignItems: 'center',
        bottom: 0,
        backgroundColor: '#fff',
        width: '100%',
        flexDirection: 'row'
    }
})