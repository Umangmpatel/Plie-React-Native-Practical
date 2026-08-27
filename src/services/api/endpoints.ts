/**
 * Centralized API endpoint constants.
 * All API routes are defined here to avoid hardcoded strings scattered across the codebase.
 */
export const ENDPOINTS = {
    auth: {
        login: 'login',
    },
    events: {
        listing: 'events-listing',
    },
} as const;
