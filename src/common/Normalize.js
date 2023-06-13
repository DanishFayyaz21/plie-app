import { moderateScale } from 'react-native-size-matters'

// based on iphone 5s's scale
// const scale = SCREEN_WIDTH / 320;

export function normalize(size) {
    return moderateScale(size)
}