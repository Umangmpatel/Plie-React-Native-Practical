import { StyleSheet } from 'react-native';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';
import { COLORS } from '../../../constants/Colors';
import { Fonts } from '../../../constants/Fonts';

export const styles = StyleSheet.create({
    container: {
        width: '100%',
        marginVertical: verticalScale(4),
    },
    label: {
        fontSize: moderateScale(13),
        fontFamily: Fonts.Inter.medium,
        color: COLORS.black,
        marginBottom: verticalScale(4),
    },
    inputWrapper: {
        width: '100%',
        height: verticalScale(42),
        backgroundColor: COLORS.white,
        borderRadius: moderateScale(8),
        borderWidth: 1,
        borderColor: COLORS.inputBorder,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: scale(14),
    },
    inputWrapperFocused: {
        borderColor: COLORS.black,
    },
    inputWrapperError: {
        borderColor: COLORS.error,
    },
    input: {
        flex: 1,
        fontSize: moderateScale(14),
        fontFamily: Fonts.Inter.regular,
        color: COLORS.black,
        paddingVertical: 0,
    },
    iconLeft: {
        marginRight: scale(10),
    },
    iconRight: {
        marginLeft: scale(10),
    },
    errorText: {
        fontSize: moderateScale(12),
        fontFamily: Fonts.Inter.regular,
        color: COLORS.error,
        marginTop: verticalScale(4),
    },
});
