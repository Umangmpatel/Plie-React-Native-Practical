import { NavigatorScreenParams } from '@react-navigation/native';

export type MainTabParamList = {
    SearchEvent: undefined;
    EventsList: undefined;
    Favorites: undefined;
    Profile: undefined;
};

export type RootStackParamList = {
    Splash: undefined;
    Login: undefined;
    MainApp: NavigatorScreenParams<MainTabParamList>;
    EventDetails: { eventId: string };
};
