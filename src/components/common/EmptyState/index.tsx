import React from 'react';
import { View, Text } from 'react-native';
import { EmptyStateProps } from './types';
import { styles } from './styles';

export const EmptyState: React.FC<EmptyStateProps> = ({
    message = 'No data available',
    marginTop = 40,
}) => {
    return (
        <View style={[styles.container, { marginTop }]}>
            <Text style={styles.message}>{message}</Text>
        </View>
    );
};
