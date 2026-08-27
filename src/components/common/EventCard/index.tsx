import React from 'react';
import { View, Text, Image, TouchableOpacity, Share, ScrollView } from 'react-native';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { toggleFavorite } from '../../../store/slices/favoritesSlice';
import { LocationIcon, BlackCalenderIcon, RedFavIcon, BlackUnfavIcon, ShareIcon } from '../../../assets/icons';
import { EventCardProps } from './types';
import { styles } from './styles';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../navigation';

import { formatEventDate } from '../../../utils/dateFormatter';

export const EventCard = ({ eventId, imageSrc, tags, title, location, date, toDate, price }: EventCardProps) => {
    const dispatch = useAppDispatch();
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
    const { favoriteIds } = useAppSelector(state => state.favorites);

    const isFavorite = favoriteIds.includes(eventId);
    const formattedDate = formatEventDate(date, toDate);

    const handleToggleFavorite = () => {
        dispatch(toggleFavorite(eventId));
    };

    const handleShare = () => {
        // No-op
    };

    const handleCardPress = () => {
        navigation.navigate('EventDetails', { eventId: String(eventId) });
    };

    return (
        <View style={styles.cardContainer}>
            {/* Left Image Section with Overlaid Action Icons */}
            <TouchableOpacity style={styles.imageWrapper} activeOpacity={0.9} onPress={handleCardPress}>
                <Image
                    source={imageSrc ? { uri: imageSrc } : require('../../../assets/images/loginBgImage.png')}
                    style={styles.image}
                    resizeMode="cover"
                />

                <View style={styles.floatingActionRow}>
                    <TouchableOpacity style={styles.floatingIconButton} activeOpacity={0.8} onPress={handleShare}>
                        <ShareIcon />
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.floatingIconButton} activeOpacity={0.8} onPress={handleToggleFavorite}>
                        {isFavorite ? (
                            <RedFavIcon />
                        ) : (
                            <BlackUnfavIcon />
                        )}
                    </TouchableOpacity>
                </View>
            </TouchableOpacity>

            {/* Right Content Details */}
            <View style={styles.contentContainer}>
                {/* Top Tags Row */}
                {tags && tags.length > 0 && (
                    <ScrollView
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        style={styles.tagsScrollView}
                        contentContainerStyle={styles.tagsContainer}
                    >
                        {tags.map((tag, index) => (
                            <View key={index} style={styles.tagBadge}>
                                <Text style={styles.tagText}>{tag}</Text>
                            </View>
                        ))}
                    </ScrollView>
                )}

                {/* Details Touch Area */}
                <TouchableOpacity style={styles.detailsTouchArea} activeOpacity={0.9} onPress={handleCardPress}>
                    {/* Event Title */}
                    <Text style={styles.title} numberOfLines={1}>
                        {title}
                    </Text>

                    {/* Location Row */}
                    <View style={styles.metaRow}>
                        <LocationIcon />
                        <Text style={styles.locationText} numberOfLines={1}>
                            {location}
                        </Text>
                    </View>

                    {/* Bottom Row: Date | Price */}
                    <View style={styles.bottomRow}>
                        <View style={styles.dateContainer}>
                            <BlackCalenderIcon />
                            <Text style={styles.dateText} numberOfLines={1}>{formattedDate}</Text>
                        </View>

                        <View style={styles.verticalDivider} />

                        <Text style={styles.priceText}>{price}</Text>
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    );
};
