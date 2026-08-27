import { StyleSheet } from 'react-native';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';
import { COLORS } from '../../constants/Colors';
import { Fonts } from '../../constants/Fonts';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.white,
    },
    content: {
        flex: 1,
    },
    greetingSection: {
        paddingHorizontal: scale(20),
        justifyContent: 'center',
        marginTop: verticalScale(14),
        marginBottom: verticalScale(10),
    },
    greetingTitle: {
        color: COLORS.titleDark,
        fontSize: moderateScale(24),
        fontFamily: Fonts.Satoshi.bold,
        marginBottom: verticalScale(2),
    },
    greetingSub: {
        color: COLORS.subtitleDark,
        fontSize: moderateScale(15),
        fontFamily: Fonts.Inter.regular,
    },
    searchSection: {
        paddingHorizontal: scale(20),
        marginBottom: verticalScale(4),
    },
    contentContainer: {
        paddingHorizontal: scale(20),
        paddingTop: verticalScale(4),
        paddingBottom: verticalScale(40),
    },
    contentContainerEmpty: {
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    loaderContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
