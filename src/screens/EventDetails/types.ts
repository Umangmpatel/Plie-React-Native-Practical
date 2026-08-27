import { RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation';

export type EventDetailsScreenRouteProp = RouteProp<RootStackParamList, 'EventDetails'>;
export type EventDetailsScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'EventDetails'>;
