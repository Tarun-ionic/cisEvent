// Custom Navigation Drawer / Sidebar with Image and Icon in Menu Options
// https://aboutreact.com/custom-navigation-drawer-sidebar-with-image-and-icon-in-menu-options/

import React from 'react';
import { useNavigation } from '@react-navigation/native';
import {
  SafeAreaView,
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  Text,
  Linking,
} from 'react-native';

import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';
import { useSelector } from 'react-redux';
const apiUrl = "https://pdng1.elb.cisinlive.com/";


const CustomSidebarMenu = (props) => {
  const getProfileData = useSelector(state => state.user.data?.data);

  const navigation = useNavigation();
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <TouchableOpacity onPress={() => { props.navigation.navigate('Setting') }}>
        <View>
          {getProfileData?.image ? <Image
            source={{ uri: apiUrl + getProfileData?.image }}
            style={styles.sideMenuProfileIcon}
          /> : <Image
            source={require('./src/assets/launch_screen.png')}
            style={styles.sideMenuProfileIcon}
          />}

          <Text
            style={{
              fontSize: 18,
              fontWeight: '800',
              marginTop: 20,
              textAlign: 'center'
            }}>
            {getProfileData?.name? getProfileData?.name : 'User Profile'}
          </Text>
        </View>
      </TouchableOpacity>
      <DrawerContentScrollView {...props}>
        <DrawerItemList {...props} />
      </DrawerContentScrollView>
      <Text
        style={{
          fontSize: 16,
          textAlign: 'center',
          color: 'grey'
        }}>
        www.aboutreact.com
      </Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  sideMenuProfileIcon: {
    resizeMode: 'center',
    width: 100,
    height: 100,
    borderRadius: 100 / 2,
    alignSelf: 'center',
  },
  iconStyle: {
    width: 15,
    height: 15,
    marginHorizontal: 5,
  },
  customItem: {
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default CustomSidebarMenu;
