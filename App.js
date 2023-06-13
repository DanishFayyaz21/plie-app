import React, { Fragment, useRef } from 'react';
import {
  View,
  StyleSheet,
  StatusBar,
  LogBox,
  Linking,
  Alert,
} from 'react-native';
import MainRouteConfig from './src/MainRouteConfig';
import { createStore, applyMiddleware } from 'redux';
import { Provider, useSelector } from 'react-redux';
import mainReducer from './src/store/MainReducer';
import ReduxThunk from 'redux-thunk';
import Loader from './src/components/Loader';
import FlashMessage from 'react-native-flash-message';
import { useEffect } from 'react';
import Navigator from './src/common/Navigator';
import AppNavKeys from './src/common/AppNavKeys';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AsyncParamsKeys } from './src/common/Constants';
import { StripeProvider } from '@stripe/stripe-react-native';

export const store = createStore(mainReducer, applyMiddleware(ReduxThunk));

// console.disableYellowBox = true;
LogBox.ignoreLogs(["Warning: ..."]);
LogBox.ignoreAllLogs();

const App = () => {
  const flashRef = useRef();


  return (

    <Provider store={store}>
      <StripeProvider
        publishableKey="pk_test_51ITftMIy2XYOJorrGz48C3F5fiBQdXxXHGrtlaC40TzQVCkvRRUj4opx6VhMHYVxIGhEFI9AkAD2ZINAHmfiPIW000SNkv2brH"
        urlScheme="your-url-scheme" // required for 3D Secure and bank redirects
        merchantIdentifier="merchant.com.{{YOUR_APP_NAME}}" // required for Apple Pay
      >
        <Fragment>
          <View style={styles.container}>
            <Loader />
            <MainRouteConfig />
            <FlashMessage
              ref={flashRef}
              duration={2500}
              statusBarHeight={StatusBar.currentHeight}
            />
          </View>
        </Fragment>
      </StripeProvider>
    </Provider>

  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
