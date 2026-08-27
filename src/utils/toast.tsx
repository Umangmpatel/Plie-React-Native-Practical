import React from 'react';
import Toast, { BaseToast, ErrorToast, ToastConfig } from 'react-native-toast-message';

const toastTextStyle = {
    fontSize: 13,
    fontWeight: '500' as const,
    textAlign: 'left' as const,
    flexShrink: 1,
};

const toastContainerStyle = {
    paddingHorizontal: 12,
    alignItems: 'flex-start' as const,
    justifyContent: 'center' as const,
};

export const toastConfig: ToastConfig = {
    success: (props: any) => (
        <BaseToast
            {...props}
            style={{ borderLeftColor: '#4CAF50', borderLeftWidth: 5, borderTopWidth: 0, minHeight: 48 }}
            contentContainerStyle={toastContainerStyle}
            text1Style={toastTextStyle}
            text1NumberOfLines={2}
            renderLeadingIcon={() => null}
            renderTrailingIcon={() => null}
        />
    ),
    error: (props: any) => (
        <ErrorToast
            {...props}
            style={{ borderLeftColor: '#E53935', borderLeftWidth: 5, borderTopWidth: 0, minHeight: 48 }}
            contentContainerStyle={toastContainerStyle}
            text1Style={toastTextStyle}
            text1NumberOfLines={2}
            renderLeadingIcon={() => null}
            renderTrailingIcon={() => null}
        />
    ),
    info: (props: any) => (
        <BaseToast
            {...props}
            style={{ borderLeftColor: '#2196F3', borderLeftWidth: 5, borderTopWidth: 0, minHeight: 48 }}
            contentContainerStyle={toastContainerStyle}
            text1Style={toastTextStyle}
            text1NumberOfLines={2}
            renderLeadingIcon={() => null}
            renderTrailingIcon={() => null}
        />
    ),
};

export const AlertDialog = (title: string) => {
    Toast.hide();
    Toast.show({
        type: 'error',
        text1: title,
        position: 'top',
        topOffset: 55,
        swipeable: false,
        visibilityTime: 3000,
    });
};

export const InfoDialog = (title: string) => {
    Toast.hide();
    Toast.show({
        type: 'info',
        text1: title,
        position: 'top',
        topOffset: 55,
        swipeable: false,
        visibilityTime: 3000,
    });
};

export const SuccessDialog = (title: string) => {
    Toast.hide();
    Toast.show({
        type: 'success',
        text1: title,
        position: 'top',
        topOffset: 55,
        swipeable: false,
        visibilityTime: 3000,
    });
};
