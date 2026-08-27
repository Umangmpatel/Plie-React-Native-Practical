import React, { useMemo } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { useAppSelector } from '../../store/hooks';
import { EventCard, EmptyState, Spacer } from '../../components/common';
import { STRINGS } from '../../constants/Strings';
import { styles } from './styles';

export const FavoritesScreen = () => {
    const { events } = useAppSelector(state => state.events);
    const { favoriteIds } = useAppSelector(state => state.favorites);

    const favoritedEventsList = useMemo(() => {
        if (!events || events.length === 0 || !favoriteIds || favoriteIds.length === 0) return [];
        return events.filter(e => favoriteIds.includes(e.event_date_id || e.event_id));
    }, [events, favoriteIds]);

    const isEmpty = favoritedEventsList.length === 0;

    return (
        <View style={styles.container}>
            <View style={styles.greetingSection}>
                <Text style={styles.greetingTitle}>{STRINGS.favorites.title}</Text>
                <Spacer height={6} />
                <Text style={styles.greetingSub}>{STRINGS.favorites.subtitle}</Text>
            </View>

            <ScrollView
                style={{ flex: 1 }}
                contentContainerStyle={[styles.contentContainer, isEmpty && { flexGrow: 1, justifyContent: 'center' }]}
                showsVerticalScrollIndicator={false}
            >
                {isEmpty ? (
                    <EmptyState message={STRINGS.favorites.emptyState} marginTop={0} />
                ) : (
                    favoritedEventsList.map((event, index) => {
                        const tags = event.danceStyles?.map((ds: any) => ds.ds_name) || [];
                        const location = `${event.city || ''}, ${event.country || ''}`;
                        const price = event.event_price_from === 0 && event.event_price_to === 0
                            ? 'Free'
                            : `€${event.event_price_from} - €${event.event_price_to}`;
                        return (
                            <EventCard
                                eventId={event.event_date_id || event.event_id}
                                key={event.event_date_id || event.event_id || index}
                                imageSrc={event.event_profile_img}
                                tags={tags}
                                title={event.event_name}
                                location={location}
                                date={event.readable_from_date || ''}
                                toDate={event.readable_to_date || ''}
                                price={price}
                            />
                        );
                    })
                )}
            </ScrollView>
        </View>
    );
};
