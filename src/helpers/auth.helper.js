import AsyncStorage from '@react-native-async-storage/async-storage';
export function jsonAuthHeader() {
    let user = AsyncStorage.getItem("user");
  
    if (user && user.token) {
      return {
        "Content-Type": "application/json",
        Authorization: "Bearer " + user.token,
      };
    } else {
      return {};
    }
  }
  
  export function formAuthHeader() {
    let user = AsyncStorage.getItem("user");
  
    if (user && user.token) {
      return {
        "Content-Type": "multipart/form-data",
        Authorization: "Bearer " + user.token,
      };
    } else {
      return {};
    }
  }
  