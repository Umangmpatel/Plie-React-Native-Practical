import React from 'react';
import { View } from 'react-native';

interface SpacerProps {
    height?: number;
    width?: number;
}

export const Spacer: React.FC<SpacerProps> = ({ height = 10, width }) => {
    return <View style={{ height: width ? 0 : height, width: width ? width : 0 }} />;
};
