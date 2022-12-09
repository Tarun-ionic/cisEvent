import React from 'react';
import { Button, View } from 'react-native';

export default MyeventScreen = (props) => {
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Button onPress={() => props.navigation.goBack()} title="Go back home" />
        </View>
    );
};