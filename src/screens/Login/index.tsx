import React, { useState, useRef } from 'react';
import { View, Text, ImageBackground, TouchableOpacity, TextInput } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { KeyboardAwareScrollView } from 'react-native-keyboard-controller';
import { useNavigation } from '@react-navigation/native';

import { InputField, Button } from '../../components/common';
import { LoginBgImage } from '../../assets/images';
import { GoogleIcon, AppleIcon, FaceBookIcon } from '../../assets/icons';

import { isValidEmail, isValidPassword } from '../../utils/validators';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { loginUser } from '../../store/slices/authSlice';
import { AlertDialog, SuccessDialog } from '../../utils/toast';

import { LoginNavigationProp } from './types';
import { styles } from './styles';

export const LoginScreen = () => {
    const insets = useSafeAreaInsets();
    const navigation = useNavigation<LoginNavigationProp>();
    const dispatch = useAppDispatch();
    const { loading } = useAppSelector((state) => state.auth);

    const passwordInputRef = useRef<TextInput>(null);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');

    const handleLogin = async () => {
        let isValid = true;

        if (!isValidEmail(email)) {
            setEmailError('Please enter a valid email address');
            isValid = false;
        } else {
            setEmailError('');
        }

        if (!isValidPassword(password)) {
            setPasswordError('Password must be at least 6 characters');
            isValid = false;
        } else {
            setPasswordError('');
        }

        if (isValid) {
            try {
                const resultAction = await dispatch(loginUser({ email, password }));
                if (loginUser.fulfilled.match(resultAction)) {
                    SuccessDialog('Logged in successfully!');
                } else {
                    const errorMsg = (resultAction.payload as string) || 'Login failed. Please check your credentials.';
                    AlertDialog(errorMsg);
                }
            } catch (err: any) {
                AlertDialog('An unexpected error occurred.');
            }
        }
    };

    const handleGuestEnter = () => {
        navigation.navigate('MainApp', { screen: 'SearchEvent' });
    };

    return (
        <View style={styles.container}>
            <ImageBackground source={LoginBgImage} style={styles.background} resizeMode="cover">
                {/* Fixed Non-Scrolling Top Logo & Subtitle Area */}
                <View style={[styles.logoContainer, { paddingTop: insets.top + 25 }]}>
                    <Text style={styles.logoText}>Plié</Text>
                    <Text style={styles.logoSubtitle}>ELEVATE THE MOVEMENT</Text>
                </View>

                {/* Keyboard Aware Scrollable Form Area */}
                <KeyboardAwareScrollView
                    style={{ flex: 1 }}
                    contentContainerStyle={styles.scrollContent}
                    bottomOffset={20}
                    keyboardShouldPersistTaps="handled"
                    showsVerticalScrollIndicator={false}
                >
                    {/* Floating White Form Card */}
                    <View style={styles.cardContainer}>
                        <View style={styles.formSection}>
                            <InputField
                                label="Email"
                                placeholder="email@example.com"
                                value={email}
                                onChangeText={(text) => {
                                    setEmail(text);
                                    if (emailError) setEmailError('');
                                }}
                                keyboardType="email-address"
                                autoCapitalize="none"
                                returnKeyType="next"
                                onSubmitEditing={() => passwordInputRef.current?.focus()}
                                blurOnSubmit={false}
                                error={emailError}
                                containerStyle={styles.inputSpacing}
                            />

                            <InputField
                                inputRef={passwordInputRef}
                                label="Password"
                                placeholder="Enter your password"
                                value={password}
                                onChangeText={(text) => {
                                    setPassword(text);
                                    if (passwordError) setPasswordError('');
                                }}
                                isPassword
                                returnKeyType="done"
                                onSubmitEditing={handleLogin}
                                error={passwordError}
                                containerStyle={styles.inputSpacing}
                            />

                            <TouchableOpacity style={styles.forgotContainer} activeOpacity={0.7}>
                                <Text style={styles.forgotText}>Forgot Password?</Text>
                            </TouchableOpacity>

                            <Button
                                title="Sign In"
                                onPress={handleLogin}
                                loading={loading}
                                style={styles.signinButton}
                            />
                        </View>

                        <View style={styles.signupContainer}>
                            <Text style={styles.signupText}>Not a member? </Text>
                            <TouchableOpacity activeOpacity={0.7}>
                                <Text style={styles.signupLink}>Sign Up Here</Text>
                            </TouchableOpacity>
                        </View>

                        <View style={styles.dividerContainer}>
                            <View style={styles.dividerLine} />
                            <Text style={styles.dividerText}>or Sign In with</Text>
                            <View style={styles.dividerLine} />
                        </View>

                        <View style={styles.socialContainer}>
                            <TouchableOpacity style={styles.socialIconBtn} activeOpacity={0.8}>
                                <GoogleIcon width={22} height={22} />
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.socialIconBtn} activeOpacity={0.8}>
                                <AppleIcon width={22} height={22} />
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.socialIconBtn} activeOpacity={0.8}>
                                <FaceBookIcon width={22} height={22} />
                            </TouchableOpacity>
                        </View>

                        <TouchableOpacity style={styles.guestButton} activeOpacity={0.8} onPress={handleGuestEnter}>
                            <Text style={styles.guestText}>Enter as Guest</Text>
                        </TouchableOpacity>
                    </View>
                </KeyboardAwareScrollView>
            </ImageBackground>
        </View>
    );
};
