import React from 'react';
import { TouchableOpacity, Text, ActivityIndicator } from 'react-native';
import { COLORS } from '../../../constants/Colors';
import { ButtonProps } from './types';
import { styles } from './styles';

export const Button: React.FC<ButtonProps> = ({
    title,
    onPress,
    variant = 'primary',
    loading = false,
    style,
    textStyle,
    disabled,
    ...rest
}) => {

    const getBackgroundColor = () => {
        if (disabled) return COLORS.gray;
        if (variant === 'primary') return COLORS.black;
        if (variant === 'secondary') return COLORS.lightGray;
        if (variant === 'outline') return 'transparent';
        return COLORS.black;
    };

    const getTextColor = () => {
        if (disabled) return COLORS.white;
        if (variant === 'primary') return COLORS.white;
        if (variant === 'secondary') return COLORS.black;
        if (variant === 'outline') return COLORS.black;
        return COLORS.white;
    };

    return (
        <TouchableOpacity
            style={[
                styles.button,
                { backgroundColor: getBackgroundColor() },
                variant === 'outline' && styles.outlineStyle,
                style
            ]}
            onPress={onPress}
            disabled={disabled || loading}
            activeOpacity={0.8}
            {...rest}
        >
            {loading ? (
                <ActivityIndicator color={getTextColor()} size="small" />
            ) : (
                <Text style={[styles.text, { color: getTextColor() }, textStyle]}>
                    {title}
                </Text>
            )}
        </TouchableOpacity>
    );
};
