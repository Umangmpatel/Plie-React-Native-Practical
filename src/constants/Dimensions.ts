import { Dimensions } from 'react-native';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

export const Dimension = {
    SCREEN_WIDTH,
    SCREEN_HEIGHT,

    // Spacing
    spacing: {
        xs: 4,
        sm: 8,
        md: 12,
        lg: 16,
        xl: 20,
        xxl: 24,
        xxxl: 32,
    },

    // Border radius
    radius: {
        sm: 6,
        md: 8,
        lg: 12,
        xl: 16,
        full: 9999,
    },
};
