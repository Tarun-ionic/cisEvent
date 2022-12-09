import AsyncStorage from '@react-native-async-storage/async-storage';
export async function jsonAuthHeader() {
    let userToken = await AsyncStorage.getItem("accessToken");
    console.log('token', userToken)
    if (userToken) {
      return {
        "Content-Type": "application/json",
        Authorization: "Bearer " + userToken,
      };
    } else {
      return {};
    }
  }
  
  export function formAuthHeader() {
    let userToken = AsyncStorage.getItem("accessToken");
    if (userToken) {
      return {
        "Content-Type": "multipart/form-data",
        Authorization: "Bearer " + userToken,
      };
    } else {
      return {};
    }
  }
  