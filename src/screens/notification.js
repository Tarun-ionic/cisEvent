import React from 'react';
import { Button, View } from 'react-native';

export default NotificationsScreen = (props) => {
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Button onPress={() => props.navigation.goBack()} title="Go back home" />
        </View>
    );
};