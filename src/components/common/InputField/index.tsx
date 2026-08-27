import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { InputFieldProps } from './types';
import { styles } from './styles';
import { COLORS } from '../../../constants/Colors';
import { PassVisibleIcon, EyeCloseIcon } from '../../../assets/icons';

export const InputField: React.FC<InputFieldProps> = ({
    label,
    error,
    leftIcon,
    rightIcon,
    onRightIconPress,
    containerStyle,
    inputContainerStyle,
    inputStyle,
    isPassword,
    secureTextEntry,
    onFocus,
    onBlur,
    inputRef,
    ...rest
}) => {
    const [isFocused, setIsFocused] = useState(false);
    const [passwordVisible, setPasswordVisible] = useState(false);

    const handleFocus = (e: any) => {
        setIsFocused(true);
        if (onFocus) onFocus(e);
    };

    const handleBlur = (e: any) => {
        setIsFocused(false);
        if (onBlur) onBlur(e);
    };

    const isSecure = isPassword ? !passwordVisible : secureTextEntry;

    return (
        <View style={[styles.container, containerStyle]}>
            {label && <Text style={styles.label}>{label}</Text>}
            <View
                style={[
                    styles.inputWrapper,
                    isFocused && styles.inputWrapperFocused,
                    !!error && styles.inputWrapperError,
                    inputContainerStyle,
                ]}
            >
                {leftIcon && <View style={styles.iconLeft}>{leftIcon}</View>}
                <TextInput
                    ref={inputRef}
                    style={[styles.input, inputStyle]}
                    placeholderTextColor={COLORS.gray}
                    secureTextEntry={isSecure}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    {...rest}
                />
                {isPassword ? (
                    <TouchableOpacity
                        onPress={() => setPasswordVisible(!passwordVisible)}
                        style={styles.iconRight}
                        hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                    >
                        {passwordVisible ? (
                            <PassVisibleIcon width={20} height={14} color="#605E5A" />
                        ) : (
                            <EyeCloseIcon width={20} height={14} color="#605E5A" />
                        )}
                    </TouchableOpacity>
                ) : (
                    rightIcon && (
                        <TouchableOpacity
                            onPress={onRightIconPress}
                            disabled={!onRightIconPress}
                            style={styles.iconRight}
                            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                        >
                            {rightIcon}
                        </TouchableOpacity>
                    )
                )}
            </View>
            {error ? <Text style={styles.errorText}>{error}</Text> : null}
        </View>
    );
};
