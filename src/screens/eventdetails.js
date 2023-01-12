import React from 'react';
import {
    Button,
    View,
    SafeAreaView,
    StyleSheet,
    ScrollView,
    Image,
    Text,
    FlatList,
    TouchableOpacity,
} from 'react-native';
import Video from 'react-native-video';

const apiUrl = "https://pdng1.elb.cisinlive.com/";

export default EventDetialsScreen = (props) => {
    let getEventDetaisl = props?.props.route.params.detailsItem;
    return (
        <View style={{ flex: 1, alignItems: 'center', marginTop: 32 }}>
            {getEventDetaisl.file_type == 'image' && <Image style={styles.imageView} source={{ uri: apiUrl + getEventDetaisl?.file }} />}
            {getEventDetaisl.file_type == 'video' && <Video source={{ uri: apiUrl + getEventDetaisl?.file }}   resizeMode='cover'
                    repeat={true}
                    playWhenInactive={true}
                    style={{
                        width:'100%',
                        height:225
                    }}  />}

            <View style={{ marginTop: 16 }}><Text style={styles.titleText}>{getEventDetaisl.title}</Text></View>
            <View style={styles.descView}><Text style={styles.descText}>{getEventDetaisl.description}</Text></View>

        </View>
    );
};

const styles = StyleSheet.create({
    imageView: {
        height: 250,
        width: '90%'
    },
    backgroundVideo: {
        height:150,
        width:150
    },
    titleText: {
        fontWeight: '800',
        fontSize: 25
    },
    descView: {
        padding: 16
    },
    descText: {
        fontSize: 16
    }
})

