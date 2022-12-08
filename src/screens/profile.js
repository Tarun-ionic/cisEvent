import React from 'react';
import { Button, View } from 'react-native';

export default ProfileScreen = (props) => {

    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Button
                onPress={() => props.navigation.navigate('Notifications')}
                title="Go to notifications"
            />
        </View>
    );
};

