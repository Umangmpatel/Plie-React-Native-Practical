import { StyleSheet } from 'react-native';
import { verticalScale, moderateScale } from 'react-native-size-matters';
import { COLORS } from '../../../constants/Colors';
import { Fonts } from '../../../constants/Fonts';

export const styles = StyleSheet.create({
    button: {
        width: '100%',
        height: verticalScale(48),
        borderRadius: moderateScale(8),
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
    },
    outlineStyle: {
        borderWidth: 1,
        borderColor: COLORS.black,
    },
    text: {
        fontSize: moderateScale(16),
        fontFamily: Fonts.Inter.regular,
    },
});
