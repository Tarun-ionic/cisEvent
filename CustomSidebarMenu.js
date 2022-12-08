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
 
const CustomSidebarMenu = (props) => {
    const navigation = useNavigation();
  return (
    <SafeAreaView style={{flex: 1}}>
      <TouchableOpacity onPress={() => { props.navigation.navigate('Setting')}}>
        <View>

      <Image
        source={require('./src/assets/launch_screen.png')}
        style={styles.sideMenuProfileIcon}
      />
       <Text
        style={{
          fontSize: 18,
          fontWeight:'800',
          marginTop: 20,
          marginBottom: 20,
          textAlign: 'center'
        }}>
        My profile
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
    backgroundColor:'red',
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
