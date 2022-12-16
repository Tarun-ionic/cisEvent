import React from 'react';
import { View, Button} from 'react-native';

export default NotificationsScreen = (props) => {

    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Button
            // onPress={() => props.navigation.navigate('Home')}
            title="this is notification page"
        />
    </View>
    );
};
