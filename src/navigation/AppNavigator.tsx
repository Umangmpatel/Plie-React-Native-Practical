import React, { useEffect } from 'react';
import { TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import SplashScreenNative from 'react-native-splash-screen';

// Types
import { RootStackParamList, MainTabParamList } from './types';

// Screens
import { LoginScreen } from '../screens/Login';
import { EventListScreen } from '../screens/EventList';
import { EventDetailsScreen } from '../screens/EventDetails';
import { FavoritesScreen } from '../screens/Favorites';
import { SearchScreen } from '../screens/SearchScreen';
import { ProfileScreen } from '../screens/ProfileScreen';
import { useAppSelector } from '../store/hooks';

// Constants
import { COLORS } from '../constants/Colors';
import { Fonts } from '../constants/Fonts';

// Icons
import {
    SelectedEventIcon,
    SelectedFacIcon,
    SelectedProfileIcon,
    SelectedSearchIcon,
    UnSelectedEventIcon,
    UnSelectedProfileIcon,
    UnSelectedSearchIcon,
    UnFavIcon
} from '../assets/icons';

const RootStack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<MainTabParamList>();

const MainTabNavigator = () => {
    const insets = useSafeAreaInsets();

    return (
        <Tab.Navigator screenOptions={({ route }) => ({
            sceneStyle: { backgroundColor: COLORS.white },
            headerShown: true,
            headerStyle: {
                backgroundColor: COLORS.surfaceLight,
                elevation: 0,
                shadowOpacity: 0,
                height: insets.top + 40,
            },
            headerTitle: 'Plié',
            headerTitleAlign: 'center',
            headerTitleStyle: {
                color: COLORS.black,
                fontFamily: Fonts.HankenGrotesk.semiBold,
                fontSize: 25,
            },
            tabBarButton: (props) => <TouchableOpacity {...(props as any)} activeOpacity={1} />,
            tabBarIcon: ({ focused, color }) => {
                const iconSize = 18;
                if (route.name === 'SearchEvent') {
                    return focused ? <SelectedSearchIcon width={iconSize} height={iconSize} color={color} /> : <UnSelectedSearchIcon width={iconSize} height={iconSize} color={color} />;
                } else if (route.name === 'EventsList') {
                    return focused ? <SelectedEventIcon width={iconSize} height={iconSize} color={color} /> : <UnSelectedEventIcon width={iconSize} height={iconSize} color={color} />;
                } else if (route.name === 'Favorites') {
                    return focused ? <SelectedFacIcon width={iconSize} height={iconSize} color={color} /> : <UnFavIcon width={iconSize} height={iconSize} color={color} />;
                } else if (route.name === 'Profile') {
                    return focused ? <SelectedProfileIcon width={iconSize} height={iconSize} color={color} /> : <UnSelectedProfileIcon width={iconSize} height={iconSize} color={color} />;
                }
                return null;
            },
            tabBarActiveTintColor: COLORS.black,
            tabBarInactiveTintColor: COLORS.grayMedium,
            tabBarLabelStyle: {
                fontFamily: Fonts.Inter.medium,
                fontSize: 12,
                textTransform: 'uppercase',
            },
            tabBarStyle: {
                backgroundColor: COLORS.surfaceLight,
                height: 72,
                borderTopWidth: 1,
                borderTopColor: COLORS.tabBorderTop,
                shadowColor: COLORS.black,
                shadowOffset: { width: 0, height: -4 },
                shadowOpacity: 0.02,
                shadowRadius: 10,
                elevation: 4,
            },
            tabBarItemStyle: {
                justifyContent: 'center',
                alignItems: 'center',
            },
        })}>
            <Tab.Screen name="SearchEvent" component={SearchScreen} options={{ title: 'Search' }} />
            <Tab.Screen name="EventsList" component={EventListScreen} options={{ title: 'Events' }} />
            <Tab.Screen name="Favorites" component={FavoritesScreen} options={{ title: 'Favorites' }} />
            <Tab.Screen name="Profile" component={ProfileScreen} options={{ title: 'Profile' }} />
        </Tab.Navigator>
    );
};

export const AppNavigator = () => {
    const { isAuthenticated } = useAppSelector(state => state.auth);

    useEffect(() => {
        SplashScreenNative.hide();
    }, []);

    return (
        <NavigationContainer>
            <RootStack.Navigator screenOptions={{ headerShown: false }}>
                {isAuthenticated ? (
                    <>
                        <RootStack.Screen name="MainApp" component={MainTabNavigator} />
                        <RootStack.Screen name="EventDetails" component={EventDetailsScreen} />
                    </>
                ) : (
                    <RootStack.Screen name="Login" component={LoginScreen} />
                )}
            </RootStack.Navigator>
        </NavigationContainer>
    );
};
