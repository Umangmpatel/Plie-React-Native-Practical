import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { logout } from '../../store/slices/authSlice';
import { InfoDialog } from '../../utils/toast';
import { STRINGS } from '../../constants/Strings';
import {
    TicketIcon,
    PaymentIcon,
    NotoficationIcon,
    HelpSupportIcon,
    LogoutIcon,
    RightArrowIcon,
    EditIcon,
    UnSelectedProfileIcon,
} from '../../assets/icons';
import { styles } from './styles';

interface MenuItemProps {
    icon: React.ReactNode;
    title: string;
    onPress: () => void;
    showBorder?: boolean;
    isLogout?: boolean;
}

const MenuItem: React.FC<MenuItemProps> = ({ icon, title, onPress, showBorder = true, isLogout = false }) => (
    <TouchableOpacity
        style={[styles.menuItem, !showBorder && styles.menuItemNoBorder]}
        activeOpacity={0.7}
        onPress={onPress}
    >
        <View style={styles.menuItemLeft}>
            <View style={styles.menuIconWrapper}>{icon}</View>
            <Text style={[styles.menuItemText, isLogout && styles.menuItemTextLogout]}>{title}</Text>
        </View>
        {!isLogout && <RightArrowIcon width={14} height={14} />}
    </TouchableOpacity>
);

export const ProfileScreen = () => {
    const dispatch = useAppDispatch();
    const { user } = useAppSelector(state => state.auth);

    const handleLogout = () => {
        Alert.alert(
            STRINGS.profile.logoutTitle,
            STRINGS.profile.logoutConfirm,
            [
                { text: STRINGS.profile.cancel, style: 'cancel' },
                {
                    text: STRINGS.profile.logout,
                    style: 'destructive',
                    onPress: () => {
                        dispatch(logout());
                        InfoDialog(STRINGS.profile.logoutSuccess);
                    },
                },
            ]
        );
    };

    const fullName = user
        ? `${user.usr_fname || ''} ${user.usr_lname || ''}`.trim()
        : '';
    const email = user?.usr_email || '';

    return (
        <View style={styles.container}>
            <ScrollView
                style={styles.scrollView}
                contentContainerStyle={styles.scrollViewContent}
                showsVerticalScrollIndicator={false}
            >
                {/* Avatar Section */}
                <View style={styles.profileImageContainer}>
                    <View style={styles.avatarPlaceholder}>
                        <UnSelectedProfileIcon width={44} height={44} />
                    </View>
                    <TouchableOpacity style={styles.editIconBadge} activeOpacity={0.8}>
                        <EditIcon width={14} height={14} />
                    </TouchableOpacity>
                </View>

                {/* User Info */}
                {!!fullName && <Text style={styles.nameText}>{fullName}</Text>}
                {!!email && <Text style={styles.emailText}>{email}</Text>}

                {/* Menu List */}
                <View style={styles.menuContainer}>
                    <MenuItem
                        icon={<TicketIcon width={20} height={20} />}
                        title="My Tickets"
                        onPress={() => { }}
                    />
                    <MenuItem
                        icon={<PaymentIcon width={20} height={20} />}
                        title="Payment Methods"
                        onPress={() => { }}
                    />
                    <MenuItem
                        icon={<NotoficationIcon width={20} height={20} />}
                        title="Notification Settings"
                        onPress={() => { }}
                    />
                    <MenuItem
                        icon={<HelpSupportIcon width={20} height={20} />}
                        title="Help & Support"
                        onPress={() => { }}
                    />
                    <MenuItem
                        icon={<LogoutIcon width={20} height={20} />}
                        title="Logout"
                        onPress={handleLogout}
                        showBorder={false}
                        isLogout
                    />
                </View>
            </ScrollView>
        </View>
    );
};
