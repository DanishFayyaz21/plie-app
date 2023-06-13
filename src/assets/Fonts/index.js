import { Platform } from 'react-native';

export default Fonts = {
    Bold: Platform.OS === 'android' ? 'roboto_bold' : 'Roboto-Bold',
    Medium: Platform.OS === 'android' ? 'roboto_medium' : 'Roboto-Medium',
    Regular: Platform.OS === 'android' ? 'roboto_regular' : 'Roboto-Regular',
    Light: Platform.OS === 'android' ? 'roboto_light' : 'Roboto-Light',
    GothicMedium: Platform.OS === 'android' ? 'gothicA1_medium' : 'GothicA1-Medium',
    GothicSemiBold: Platform.OS === 'android' ? 'gothicA1_semibold' : 'GothicA1-SemiBold',
    PoppinsMedium: Platform.OS === 'android' ? 'poppins_medium' : 'Poppins-Medium',
    PoppinsRegular: Platform.OS === 'android' ? 'poppins_regular' : 'Poppins-Regular',
}