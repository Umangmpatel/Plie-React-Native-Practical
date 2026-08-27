import { StyleSheet } from 'react-native';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';
import { COLORS } from '../../constants/Colors';
import { Fonts } from '../../constants/Fonts';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    background: {
        flex: 1,
        width: '100%',
        height: '100%',
    },
    scrollContent: {
        flexGrow: 1,
        justifyContent: 'center',
        paddingBottom: verticalScale(30),
    },
    logoContainer: {
        alignItems: 'center',
        marginBottom: verticalScale(20),
    },
    logoText: {
        color: COLORS.black,
        fontSize: moderateScale(34),
        fontFamily: Fonts.Satoshi.bold,
        textAlign: 'center',
    },
    logoSubtitle: {
        color: '#7C7C7C',
        fontSize: moderateScale(11),
        fontFamily: Fonts.Inter.medium,
        letterSpacing: scale(1.5),
        marginTop: verticalScale(4),
    },
    cardContainer: {
        backgroundColor: COLORS.white,
        borderRadius: moderateScale(16),
        marginHorizontal: scale(20),
        paddingHorizontal: scale(20),
        paddingVertical: verticalScale(24),
        shadowColor: COLORS.black,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.08,
        shadowRadius: 12,
        elevation: 4,
    },
    formSection: {
        width: '100%',
    },
    inputSpacing: {
        marginBottom: verticalScale(14),
    },
    forgotContainer: {
        alignSelf: 'flex-end',
        marginTop: verticalScale(2),
        marginBottom: verticalScale(18),
    },
    forgotText: {
        color: '#6B7280',
        fontSize: moderateScale(13),
        fontFamily: Fonts.Inter.medium,
    },
    signinButton: {
        width: '100%',
        height: verticalScale(46),
        backgroundColor: COLORS.black,
        borderRadius: moderateScale(8),
        marginTop: verticalScale(4),
        marginBottom: verticalScale(16),
    },
    signupContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginBottom: verticalScale(20),
    },
    signupText: {
        color: '#6B7280',
        fontSize: moderateScale(13),
        fontFamily: Fonts.Inter.regular,
    },
    signupLink: {
        color: COLORS.black,
        fontSize: moderateScale(13),
        fontFamily: Fonts.Inter.semiBold,
        textDecorationLine: 'underline',
    },
    dividerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: verticalScale(20),
    },
    dividerLine: {
        flex: 1,
        height: 1,
        backgroundColor: '#E5E7EB',
    },
    dividerText: {
        marginHorizontal: scale(12),
        color: '#6B7280',
        fontSize: moderateScale(12),
        fontFamily: Fonts.Inter.regular,
    },
    socialContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        gap: scale(16),
        marginBottom: verticalScale(24),
    },
    socialIconBtn: {
        width: scale(48),
        height: scale(48),
        borderRadius: moderateScale(10),
        backgroundColor: COLORS.white,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#F3F4F6',
        elevation: 1,
        shadowColor: COLORS.black,
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 2,
    },
    guestButton: {
        width: '100%',
        height: verticalScale(42),
        borderRadius: moderateScale(21),
        backgroundColor: '#F9FAFB',
        borderWidth: 1,
        borderColor: '#E5E7EB',
        justifyContent: 'center',
        alignItems: 'center',
    },
    guestText: {
        color: '#4B5563',
        fontSize: moderateScale(13),
        fontFamily: Fonts.Inter.medium,
    },
});
