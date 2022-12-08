import React from 'react';
import { Button, View } from 'react-native';

export default SettingScreen = () => {

    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Button
                // onPress={() => props.navigation.navigate('Home')}
                title="this is setting page"
            />
        </View>
    );
};

