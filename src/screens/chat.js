import React, { useState, useCallback, useEffect, useLayoutEffect } from 'react'
import { collection,where, addDoc, orderBy, query, onSnapshot, doc } from 'firebase/firestore';
import { GiftedChat } from 'react-native-gifted-chat'
import { auth, database } from '../services/firebase';
import { useSelector } from 'react-redux';

export default Chat = (props)=> {
  let getReceiverId = props?.route.params.recieverId;
  let chatId = props?.route.params.chatthread;

  console.log('getReceiverId', chatId)

  const [messages, setMessages] = useState([]);
  const getProfile = useSelector(state => state.user?.data?.data);
  console.log('getProfile', getProfile)

  useLayoutEffect(() => {
    const collectionRef = collection(database, 'chats');
    const queryRef = query(collectionRef, where('_id' ,'==' ,getReceiverId), orderBy('createdAt', 'desc'))
    const unsubscribe = onSnapshot(queryRef, snapshot => {
      console.log('snapshot',snapshot.docs);
      setMessages(snapshot.docs.map(doc => (
        {
        _id: doc.id,
        createdAt: doc.data().createdAt.toDate(),
        text: doc.data().text,
        user: doc.data().user
      }
      )))
    })
    return () => unsubscribe();
  }, [])


  const onSend = useCallback((messages = []) => {
    messages[0]._id = getReceiverId;
    const { _id, createdAt, text, user, } = messages[0];
    let messageObj = { _id, createdAt,  text, user };
    addDoc(collection(database, 'chats'), messageObj);
  }, []);

  return (
    <GiftedChat
      messages={messages}
      onSend={messages => onSend(messages)}
      user={{
        _id: getProfile?._id,
      }}
    />
  )
}