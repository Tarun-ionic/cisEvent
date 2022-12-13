import React from 'react';
import { Button, View } from 'react-native';

export default EventDetialsScreen = (props) => {
    console.log('gettting data ',JSON.stringify(props?.props))
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Button
                // onPress={() => props.navigation.navigate('Home')}
                title="this is event details page"
            />
        </View>
    );
};

