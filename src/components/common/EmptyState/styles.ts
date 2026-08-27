import { StyleSheet } from 'react-native';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';
import { COLORS } from '../../../constants/Colors';
import { Fonts } from '../../../constants/Fonts';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: scale(20),
    },
    message: {
        fontSize: moderateScale(14),
        fontFamily: Fonts.Inter.regular,
        color: COLORS.grayMedium,
        textAlign: 'center',
        marginTop: verticalScale(12),
    },
});
