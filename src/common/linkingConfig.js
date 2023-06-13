import { LinkingOptions } from '@react-navigation/native';

const config = {
    prefixes: ['plie://'], // Replace 'yourapp' with your app's custom URL scheme
    screens: {
        ScreenName: 'UpdateProfile', // Replace 'ScreenName' with your actual screen component name and 'screen' with the desired URL path
    },
};

export default config;
