import messaging from '@react-native-firebase/messaging';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AsyncParamsKeys } from './Constants';
export async function requestUserPermission() {
  const authStatus = await messaging().requestPermission();
  const enabled =
  authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
  authStatus === messaging.AuthorizationStatus.PROVISIONAL;
  
  if (enabled) {
    console.log('Authorization status:', authStatus);
    getFcmToken();
 }
}

const getFcmToken = async () => {
  let fcmToken = await AsyncStorage.getItem(AsyncParamsKeys.TokenFCM);
  console.log("OLD FCM TOKEN", fcmToken);

  if(!fcmToken)
  {
    try {
      const fcmToken = await messaging().getToken();
      if(fcmToken)
      {
        await AsyncStorage.setItem(AsyncParamsKeys.TokenFCM, fcmToken);
        console.log("FCM TOKEN", fcmToken);
      }
    }catch(error){
      console.log("error in FCMTOKEN", error);
    }
  }
 
}
export const notificationListener = async () =>{
    messaging().onNotificationOpenedApp(remoteMessage => {
        console.log(
          'Notification caused app to open from background state:',
          remoteMessage.notification,
        );
        console.log("background state",remoteMessage.notification);
      });
  
      // Check whether an initial notification is available
      messaging()
        .getInitialNotification()
        .then(remoteMessage => {
          if (remoteMessage) {
            console.log(
              'Notification caused app to open from quit state:',
              remoteMessage.notification,
            );
            console.log("remote message",remoteMessage.notification);
          }
          setLoading(false);
        });
}
