export const getDateRange = (obj:any) => {
    const { start, end } = obj;

    // Create Date objects
    const startDate = new Date(start.year, start.month - 1, start.day); // month is 0-indexed
    const endDate = new Date(end.year, end.month - 1, end.day);

    // Format as ISO strings
    return {
        startDateISO: startDate.toISOString(),
        endDateISO: endDate.toISOString()
    };
};