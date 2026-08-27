import { StyleSheet } from 'react-native';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';
import { COLORS } from '../../../constants/Colors';
import { Fonts } from '../../../constants/Fonts';

export const styles = StyleSheet.create({
    cardContainer: {
        width: '100%',
        height: verticalScale(114),
        backgroundColor: COLORS.white,
        borderRadius: moderateScale(12),
        flexDirection: 'row',
        marginVertical: verticalScale(6),
        borderWidth: 1,
        borderColor: '#E5E7EB',
        overflow: 'hidden',
    },
    imageWrapper: {
        width: scale(115),
        height: '100%',
        position: 'relative',
        backgroundColor: '#F3F4F6',
    },
    image: {
        width: '100%',
        height: '100%',
    },
    floatingActionRow: {
        position: 'absolute',
        top: scale(6),
        right: scale(6),
        flexDirection: 'row',
        gap: scale(4),
    },
    floatingIconButton: {
        width: scale(24),
        height: scale(24),
        borderRadius: moderateScale(6),
        backgroundColor: COLORS.white,
        justifyContent: 'center',
        alignItems: 'center',
    },
    contentContainer: {
        flex: 1,
        paddingHorizontal: scale(11),
        paddingVertical: verticalScale(8),
        justifyContent: 'space-between',
    },
    tagsScrollView: {
        flexGrow: 0,
        marginHorizontal: -scale(11),
    },
    tagsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: scale(11),
        gap: scale(6),
    },
    detailsTouchArea: {
        flex: 1,
        justifyContent: 'space-between',
        marginTop: verticalScale(4),
    },
    tagBadge: {
        backgroundColor: '#F9FAFB',
        borderWidth: 1,
        borderColor: '#E5E7EB',
        paddingHorizontal: scale(9),
        paddingVertical: verticalScale(2),
        borderRadius: moderateScale(14),
    },
    tagText: {
        color: '#4B5563',
        fontSize: moderateScale(11),
        fontFamily: Fonts.Inter.medium,
    },
    title: {
        fontSize: moderateScale(14),
        fontFamily: Fonts.Satoshi.bold,
        color: '#111827',
    },
    metaRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    locationText: {
        fontSize: moderateScale(12),
        fontFamily: Fonts.Inter.regular,
        color: '#6B7280',
        marginLeft: scale(5),
    },
    bottomRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    dateContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    dateText: {
        fontSize: moderateScale(12),
        fontFamily: Fonts.Inter.regular,
        color: '#6B7280',
        marginLeft: scale(5),
    },
    verticalDivider: {
        width: 1,
        height: verticalScale(12),
        backgroundColor: '#D1D5DB',
        marginHorizontal: scale(8),
    },
    priceText: {
        fontSize: moderateScale(13),
        fontFamily: Fonts.Satoshi.bold,
        color: '#111827',
    },
});
