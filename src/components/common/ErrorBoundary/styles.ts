import { StyleSheet } from 'react-native';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';
import { COLORS } from '../../../constants/Colors';
import { Fonts } from '../../../constants/Fonts';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.white,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: scale(24),
    },
    title: {
        fontSize: moderateScale(20),
        fontFamily: Fonts.Satoshi.bold,
        color: COLORS.black,
        marginBottom: verticalScale(8),
        textAlign: 'center',
    },
    message: {
        fontSize: moderateScale(14),
        fontFamily: Fonts.Inter.regular,
        color: COLORS.subtitleDark,
        textAlign: 'center',
        marginBottom: verticalScale(24),
    },
    button: {
        width: '60%',
    },
});
