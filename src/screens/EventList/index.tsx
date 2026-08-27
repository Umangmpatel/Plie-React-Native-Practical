import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, RefreshControl, ActivityIndicator } from 'react-native';
import { EventCard, EmptyState, InputField, Spacer } from '../../components/common';
import { SearchIcon } from '../../assets/icons';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { fetchEvents } from '../../store/slices/eventsSlice';
import { useDebounce } from '../../hooks/useDebounce';
import { COLORS, STRINGS } from '../../constants';
import { styles } from './styles';

export const EventListScreen = () => {
    const dispatch = useAppDispatch();
    const { events, loading } = useAppSelector(state => state.events);
    const { user } = useAppSelector(state => state.auth);

    const greetingName = user?.usr_fname || 'Guest';

    const [searchQuery, setSearchQuery] = useState('');
    const [isRefreshing, setIsRefreshing] = useState(false);
    const debouncedSearchQuery = useDebounce(searchQuery, 400);

    useEffect(() => {
        dispatch(fetchEvents());
    }, [dispatch]);

    const filteredEvents = events?.filter(event => {
        if (!debouncedSearchQuery) return true;
        const query = debouncedSearchQuery.toLowerCase();
        const titleMatch = event.event_name?.toLowerCase().includes(query);
        const locationMatch = `${event.city || ''} ${event.country || ''}`.toLowerCase().includes(query);
        return titleMatch || locationMatch;
    }) || [];

    const handleRefresh = async () => {
        setIsRefreshing(true);
        setSearchQuery('');
        await dispatch(fetchEvents());
        setIsRefreshing(false);
    };

    const isInitialLoading = loading && events.length === 0 && !isRefreshing;

    return (
        <View style={styles.container}>
            <View style={styles.content}>
                <View style={styles.greetingSection}>
                    <Text style={styles.greetingTitle}>{`${STRINGS.search.greetingTitle} ${greetingName}`}</Text>
                    <Spacer height={6} />
                    <Text style={styles.greetingSub}>{STRINGS.search.greetingSub}</Text>
                </View>

                <View style={styles.searchSection}>
                    <InputField
                        placeholder={STRINGS.search.searchPlaceholder}
                        value={searchQuery}
                        onChangeText={setSearchQuery}
                        leftIcon={<SearchIcon />}
                        clearButtonMode="while-editing"
                    />
                </View>

                {isInitialLoading ? (
                    <View style={styles.loaderContainer}>
                        <ActivityIndicator size="large" color={COLORS.black} />
                    </View>
                ) : (
                    <FlatList
                        data={filteredEvents}
                        keyExtractor={(item) => (item.event_date_id || item.event_id).toString()}
                        renderItem={({ item }) => {
                            const eventId = item.event_date_id || item.event_id;
                            const tags = item.danceStyles?.map((ds: any) => ds.ds_name) || [];
                            const location = `${item.city || ''}, ${item.country || ''}`;
                            const price = item.event_price_from === 0 && item.event_price_to === 0
                                ? 'Free'
                                : `€${item.event_price_from} - €${item.event_price_to}`;

                            return (
                                <EventCard
                                    eventId={eventId}
                                    title={item.event_name}
                                    imageSrc={item.event_profile_img}
                                    tags={tags}
                                    location={location}
                                    date={item.readable_from_date}
                                    toDate={item.readable_to_date}
                                    price={price}
                                />
                            );
                        }}
                        contentContainerStyle={[
                            styles.contentContainer,
                            filteredEvents.length === 0 && styles.contentContainerEmpty,
                        ]}
                        showsVerticalScrollIndicator={false}
                        refreshControl={
                            <RefreshControl
                                refreshing={isRefreshing}
                                onRefresh={handleRefresh}
                                tintColor={COLORS.black}
                                colors={[COLORS.black]}
                                progressBackgroundColor={COLORS.white}
                            />
                        }
                        ListEmptyComponent={
                            !loading ? (
                                <EmptyState message={STRINGS.search.noEventsFound} />
                            ) : null
                        }
                    />
                )}
            </View>
        </View>
    );
};
