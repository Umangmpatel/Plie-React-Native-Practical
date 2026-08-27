import { ReactNode } from 'react';
import { TextInputProps, StyleProp, ViewStyle, TextStyle } from 'react-native';

export interface InputFieldProps extends TextInputProps {
    label?: string;
    error?: string;
    leftIcon?: ReactNode;
    rightIcon?: ReactNode;
    onRightIconPress?: () => void;
    containerStyle?: StyleProp<ViewStyle>;
    inputContainerStyle?: StyleProp<ViewStyle>;
    inputStyle?: StyleProp<TextStyle>;
    isPassword?: boolean;
    inputRef?: any;
}
