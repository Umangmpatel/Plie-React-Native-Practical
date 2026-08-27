interface ParsedDate {
    day: number;
    month: number; // 0-indexed: 0 = Jan, 11 = Dec
    year: number;  // 4-digit
}

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

function parseDateString(dateStr: string): ParsedDate | null {
    if (!dateStr || typeof dateStr !== 'string') return null;
    const str = dateStr.trim();

    // Check DD.MM.YY or DD.MM.YYYY or DD-MM-YYYY or DD/MM/YYYY
    const parts = str.split(/[\.\-\/]/);
    if (parts.length === 3) {
        let p1 = parseInt(parts[0], 10);
        let p2 = parseInt(parts[1], 10);
        let p3 = parseInt(parts[2], 10);

        if (!isNaN(p1) && !isNaN(p2) && !isNaN(p3)) {
            // YYYY-MM-DD format
            if (p1 > 1000) {
                return { day: p3, month: p2 - 1, year: p1 };
            }
            // DD-MM-YYYY or DD-MM-YY format
            let year = p3;
            if (year < 100) {
                year += 2000;
            }
            return { day: p1, month: p2 - 1, year };
        }
    }

    // Fallback to JS Date parser if format is standard string e.g. "2022-09-05"
    const parsed = new Date(str);
    if (!isNaN(parsed.getTime())) {
        return {
            day: parsed.getDate(),
            month: parsed.getMonth(),
            year: parsed.getFullYear(),
        };
    }

    return null;
}

export function formatEventDate(fromDateStr?: string, toDateStr?: string): string {
    if (!fromDateStr) return '';

    const from = parseDateString(fromDateStr);
    if (!from) return fromDateStr; // Return raw string if unparseable

    const to = toDateStr ? parseDateString(toDateStr) : null;

    if (!to || (from.day === to.day && from.month === to.month && from.year === to.year)) {
        const monthName = MONTHS[from.month] || '';
        return `${from.day} ${monthName} ${from.year}`;
    }

    const fromMonth = MONTHS[from.month] || '';
    const toMonth = MONTHS[to.month] || '';

    if (from.month === to.month && from.year === to.year) {
        return `${from.day} - ${to.day} ${fromMonth} ${from.year}`;
    }

    if (from.year === to.year) {
        return `${from.day} ${fromMonth} - ${to.day} ${toMonth} ${from.year}`;
    }

    return `${from.day} ${fromMonth} ${from.year} - ${to.day} ${toMonth} ${to.year}`;
}
