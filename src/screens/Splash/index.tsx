import React, { useEffect } from 'react';
import { View, StyleSheet, ImageBackground, StatusBar } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../../navigation';
import { useAppSelector } from '../../store/hooks';
import { SplashScreenImage } from '../../assets/images';

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'Splash'>;

export const SplashScreen = () => {
    const navigation = useNavigation<NavigationProp>();
    const { isAuthenticated } = useAppSelector(state => state.auth);

    useEffect(() => {
        const timer = setTimeout(() => {
            if (isAuthenticated) {
                navigation.replace('MainApp', { screen: 'SearchEvent' });
            } else {
                navigation.replace('Login');
            }
        }, 2500);

        return () => clearTimeout(timer);
    }, [navigation, isAuthenticated]);

    return (
        <View style={styles.container}>
            <StatusBar translucent backgroundColor="transparent" barStyle="dark-content" />
            <ImageBackground
                source={SplashScreenImage}
                style={{ flex: 1 }}
                resizeMode="cover"
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1 },
});
