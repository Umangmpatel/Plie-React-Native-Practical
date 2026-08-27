export interface EventCardProps {
    eventId: number;
    imageSrc?: string;
    tags?: string[];
    title?: string;
    location?: string;
    date?: string;
    toDate?: string;
    price?: string;
    isFavorite?: boolean;
}
