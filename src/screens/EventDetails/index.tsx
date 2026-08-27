import React from 'react';
import { View, Text, ScrollView, Image, TouchableOpacity, Share, Linking } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRoute, useNavigation } from '@react-navigation/native';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { toggleFavorite } from '../../store/slices/favoritesSlice';
import { Button } from '../../components/common';
import { AlertDialog } from '../../utils/toast';
import { LeftArrowIcon, ShareIcon, RedFavIcon, BlackUnfavIcon, LocationIcon, BlackCalenderIcon } from '../../assets/icons';
import { formatEventDate } from '../../utils/dateFormatter';
import { EventDetailsScreenRouteProp, EventDetailsScreenNavigationProp } from './types';
import { styles } from './styles';

export const EventDetailsScreen = () => {
    const insets = useSafeAreaInsets();
    const route = useRoute<EventDetailsScreenRouteProp>();
    const navigation = useNavigation<EventDetailsScreenNavigationProp>();
    const dispatch = useAppDispatch();

    const { eventId } = route.params;
    const numericId = Number(eventId);

    const { events } = useAppSelector(state => state.events);
    const { favoriteIds } = useAppSelector(state => state.favorites);

    const event = events?.find(e => (e.event_date_id || e.event_id) === numericId);
    const formattedDate = formatEventDate(event?.readable_from_date, event?.readable_to_date);
    const isFavorite = favoriteIds.includes(numericId);

    const handleToggleFavorite = () => {
        dispatch(toggleFavorite(numericId));
    };

    const handleShare = () => {
        // No-op
    };

    const handleOpenLink = async (url?: string) => {
        const targetUrl = url || event?.event_url;
        if (!targetUrl) {
            AlertDialog('No ticket or event link available for this event.');
            return;
        }

        const formattedUrl = targetUrl.startsWith('http://') || targetUrl.startsWith('https://')
            ? targetUrl
            : `https://${targetUrl}`;

        try {
            const canOpen = await Linking.canOpenURL(formattedUrl);
            if (canOpen) {
                await Linking.openURL(formattedUrl);
            } else {
                await Linking.openURL(formattedUrl);
            }
        } catch (error) {
            AlertDialog('Unable to open link');
        }
    };

    if (!event) {
        return (
            <View style={[styles.container, { paddingTop: insets.top }]}>
                <View style={styles.navHeader}>
                    <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                        <LeftArrowIcon width={20} height={20} />
                    </TouchableOpacity>
                </View>
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={styles.description}>Event not found</Text>
                </View>
            </View>
        );
    }

    const priceText = event.event_price_from === 0 && event.event_price_to === 0
        ? 'Free'
        : `€${event.event_price_from} — €${event.event_price_to}`;

    const rawOrganizer = (event as any)?.organizer || (event as any)?.organizer_name;
    const organizerName = rawOrganizer ? String(rawOrganizer).trim() : '-';
    const organizerInitial = organizerName !== '-' ? organizerName.charAt(0).toUpperCase() : '-';
    const sanitizeText = (str: string): string => {
        if (!str) return '';
        let result = '';
        for (let i = 0; i < str.length; i++) {
            const code = str.charCodeAt(i);
            if (code >= 0xD800 && code <= 0xDBFF) {
                if (i + 1 < str.length) {
                    const nextCode = str.charCodeAt(i + 1);
                    if (nextCode >= 0xDC00 && nextCode <= 0xDFFF) {
                        result += str[i] + str[i + 1];
                        i++;
                        continue;
                    }
                }
                continue;
            }
            if (code >= 0xDC00 && code <= 0xDFFF) {
                continue;
            }
            if (code === 0xFFFD || code === 0xFFFC || (code < 32 && code !== 10 && code !== 13)) {
                continue;
            }
            result += str[i];
        }
        return result.replace(/\r\n/g, '\n');
    };

    const renderFormattedDescription = (text: string) => {
        if (!text) return null;

        const cleanedText = sanitizeText(text);
        const urlRegex = /(https?:\/\/[^\s]+|www\.[^\s]+)/gi;
        const parts = cleanedText.split(urlRegex);

        return (
            <Text style={styles.description}>
                {parts.map((part, index) => {
                    if (urlRegex.test(part)) {
                        urlRegex.lastIndex = 0;
                        const targetUrl = part.startsWith('http') ? part : `https://${part}`;
                        return (
                            <Text
                                key={index}
                                style={styles.clickableLink}
                                onPress={() => handleOpenLink(targetUrl)}
                            >
                                {part}
                            </Text>
                        );
                    }
                    urlRegex.lastIndex = 0;
                    return part;
                })}
            </Text>
        );
    };

    return (
        <View style={[styles.container, { paddingTop: insets.top }]}>
            {/* Top Navigation Header: Minimal back arrow only */}
            <View style={styles.navHeader}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton} activeOpacity={0.7}>
                    <LeftArrowIcon width={20} height={20} />
                </TouchableOpacity>
            </View>

            <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
                {/* Hero Banner Section */}
                <View style={styles.heroContainer}>
                    <Image
                        source={event.event_profile_img ? { uri: event.event_profile_img } : require('../../assets/images/loginBgImage.png')}
                        style={styles.heroImage}
                        resizeMode="cover"
                    />

                    {/* Floating Top Right Action Buttons */}
                    <View style={styles.floatingOverlay}>
                        <TouchableOpacity style={styles.iconCircle} activeOpacity={0.8} onPress={handleShare}>
                            <ShareIcon />
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.iconCircle} activeOpacity={0.8} onPress={handleToggleFavorite}>
                            {isFavorite ? (
                                <RedFavIcon />
                            ) : (
                                <BlackUnfavIcon />
                            )}
                        </TouchableOpacity>
                    </View>
                </View>

                {/* Content Card Container */}
                <View style={styles.contentCard}>
                    {/* Dance Styles / Tags */}
                    {event.danceStyles && event.danceStyles.length > 0 && (
                        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.tagsScroll}>
                            {event.danceStyles.map((tag: any, idx: number) => (
                                <View key={idx} style={styles.tagBadge}>
                                    <Text style={styles.tagText}>{tag.ds_name}</Text>
                                </View>
                            ))}
                        </ScrollView>
                    )}

                    {/* Title & Price Range */}
                    <Text style={styles.title}>{event.event_name}</Text>
                    <Text style={styles.priceText}>{priceText}</Text>

                    {/* Metadata Section (Date & Location Boxes) */}
                    <View style={styles.metaSection}>
                        {/* Date & Time Box */}
                        <View style={styles.metaBoxRow}>
                            <View style={styles.iconSquare}>
                                <BlackCalenderIcon width={18} height={18} />
                            </View>
                            <View style={styles.metaColumn}>
                                <Text style={styles.metaLabel}>DATE & TIME</Text>
                                <Text style={styles.metaValue}>
                                    {formattedDate ? `${formattedDate}, 21:00 onwards` : 'Dates announced soon'}
                                </Text>
                            </View>
                        </View>

                        {/* Location Box */}
                        <View style={styles.metaBoxRow}>
                            <View style={styles.iconSquare}>
                                <LocationIcon width={18} height={18} />
                            </View>
                            <View style={styles.metaColumn}>
                                <Text style={styles.metaLabel}>LOCATION</Text>
                                <Text style={styles.metaValue}>{event.city || 'Location'}, {event.country || ''}</Text>
                            </View>
                        </View>
                    </View>

                    {/* Map Preview Container */}
                    <View style={styles.mapPreviewContainer}>
                        <Image
                            source={{ uri: 'https://maps.googleapis.com/maps/api/staticmap?center=Berlin,Germany&zoom=11&size=600x300&sensor=false' }}
                            style={styles.mapImage}
                            resizeMode="cover"
                            defaultSource={require('../../assets/images/loginBgImage.png')}
                        />
                    </View>

                    {/* About the Event Section */}
                    {event.description ? (
                        <>
                            <Text style={styles.aboutSectionTitle}>About the Event</Text>
                            {renderFormattedDescription(event.description)}
                        </>
                    ) : null}

                    {/* Organized By Card */}
                    <View style={styles.organizerCard}>
                        <View style={styles.organizerAvatar}>
                            <Text style={styles.organizerInitial}>{organizerInitial}</Text>
                        </View>
                        <View style={styles.organizerInfo}>
                            <Text style={styles.organizerLabel}>ORGANIZED BY</Text>
                            <Text style={styles.organizerName}>{organizerName}</Text>
                            <TouchableOpacity activeOpacity={1} onPress={() => {}}>
                                <Text style={styles.viewProfileLink}>View Profile</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </ScrollView>

            {/* Bottom Action Button */}
            <View style={styles.bottomBar}>
                <Button title="Share tickets" onPress={() => {}} />
            </View>
        </View>
    );
};
