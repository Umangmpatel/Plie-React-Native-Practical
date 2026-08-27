import { StyleSheet } from 'react-native';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';
import { COLORS } from '../../constants/Colors';
import { Fonts } from '../../constants/Fonts';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.white,
    },
    navHeader: {
        height: verticalScale(44),
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: scale(16),
        backgroundColor: COLORS.white,
    },
    backButton: {
        padding: moderateScale(6),
        marginLeft: scale(-6),
    },
    scrollContent: {
        paddingBottom: verticalScale(110),
    },
    heroContainer: {
        height: verticalScale(220),
        width: '100%',
        position: 'relative',
        backgroundColor: '#F3F4F6',
    },
    heroImage: {
        width: '100%',
        height: '100%',
    },
    floatingOverlay: {
        position: 'absolute',
        top: scale(8),
        right: scale(8),
        flexDirection: 'row',
        gap: scale(6),
        zIndex: 10,
    },
    iconCircle: {
        width: scale(40),
        height: scale(40),
        borderRadius: moderateScale(8),
        backgroundColor: COLORS.white,
        justifyContent: 'center',
        alignItems: 'center',
    },
    contentCard: {
        paddingHorizontal: scale(20),
        paddingTop: verticalScale(16),
    },
    tagsScroll: {
        marginBottom: verticalScale(10),
    },
    tagBadge: {
        paddingHorizontal: scale(10),
        paddingVertical: verticalScale(3),
        backgroundColor: '#F3F4F6',
        borderRadius: moderateScale(12),
        marginRight: scale(8),
    },
    tagText: {
        color: '#4B5563',
        fontSize: moderateScale(11),
        fontFamily: Fonts.Inter.medium,
    },
    title: {
        fontSize: moderateScale(22),
        fontFamily: Fonts.Satoshi.bold,
        color: '#111827',
        marginBottom: verticalScale(4),
    },
    priceText: {
        fontSize: moderateScale(18),
        fontFamily: Fonts.Satoshi.bold,
        color: '#111827',
        marginBottom: verticalScale(20),
    },
    metaSection: {
        gap: verticalScale(16),
        marginBottom: verticalScale(20),
    },
    metaBoxRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    iconSquare: {
        width: scale(40),
        height: scale(40),
        borderRadius: moderateScale(8),
        backgroundColor: '#F3F4F6',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: scale(12),
    },
    metaColumn: {
        flex: 1,
    },
    metaLabel: {
        fontSize: moderateScale(10),
        fontFamily: Fonts.Inter.medium,
        color: '#9CA3AF',
        letterSpacing: 0.5,
        textTransform: 'uppercase',
        marginBottom: verticalScale(2),
    },
    metaValue: {
        fontSize: moderateScale(14),
        fontFamily: Fonts.Inter.medium,
        color: '#1F2937',
    },
    mapPreviewContainer: {
        width: '100%',
        height: verticalScale(130),
        borderRadius: moderateScale(12),
        overflow: 'hidden',
        marginBottom: verticalScale(24),
        backgroundColor: '#E5E7EB',
        borderWidth: 1,
        borderColor: '#E5E7EB',
    },
    mapImage: {
        width: '100%',
        height: '100%',
    },
    aboutSectionTitle: {
        fontSize: moderateScale(18),
        fontFamily: Fonts.Satoshi.bold,
        color: '#111827',
        marginBottom: verticalScale(10),
    },
    description: {
        fontSize: moderateScale(14),
        color: '#4B5563',
        lineHeight: moderateScale(22),
        marginBottom: verticalScale(24),
    },
    clickableLink: {
        fontSize: moderateScale(14),
        color: '#2563EB',
        textDecorationLine: 'underline',
        lineHeight: moderateScale(22),
    },
    organizerCard: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#F9FAFB',
        borderRadius: moderateScale(12),
        padding: scale(14),
        borderWidth: 1,
        borderColor: '#F3F4F6',
    },
    organizerAvatar: {
        width: scale(48),
        height: scale(48),
        borderRadius: moderateScale(10),
        backgroundColor: COLORS.black,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: scale(14),
    },
    organizerInitial: {
        color: COLORS.white,
        fontSize: moderateScale(20),
        fontFamily: Fonts.Satoshi.bold,
    },
    organizerInfo: {
        flex: 1,
    },
    organizerLabel: {
        fontSize: moderateScale(10),
        fontFamily: Fonts.Inter.medium,
        color: '#9CA3AF',
        letterSpacing: 0.5,
        textTransform: 'uppercase',
        marginBottom: verticalScale(2),
    },
    organizerName: {
        fontSize: moderateScale(15),
        fontFamily: Fonts.Satoshi.bold,
        color: '#111827',
        marginBottom: verticalScale(2),
    },
    viewProfileLink: {
        fontSize: moderateScale(12),
        fontFamily: Fonts.Inter.medium,
        color: '#4B5563',
        textDecorationLine: 'underline',
    },
    bottomBar: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: COLORS.white,
        paddingHorizontal: scale(20),
        paddingVertical: verticalScale(12),
        borderTopWidth: 1,
        borderTopColor: '#F3F4F6',
    },
});
