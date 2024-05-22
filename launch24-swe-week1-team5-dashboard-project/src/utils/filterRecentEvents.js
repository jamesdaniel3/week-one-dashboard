function parseLocalDate(dateString) {
    const parts = dateString.split('-');
    const year = parseInt(parts[0]);
    const month = parseInt(parts[1]) - 1; // Months are zero-indexed
    const day = parseInt(parts[2]);
    return new Date(year, month, day);
}

function sortEvents(events) {
    const processedEvents = events.map(event => {
        let eventDate;
        if (event.start) {
            eventDate = parseLocalDate(event.start.split('T')[0]);
        } else if (event.date) {
            eventDate = parseLocalDate(event.date);
        }

        return {
            title: event.title,
            date: eventDate
        };
    });

    const today = new Date();
    const filteredEvents = processedEvents.filter(event => event.date >= today);

    filteredEvents.sort((a, b) => a.date - b.date);

    return filteredEvents.slice(0, 5);
}

export default sortEvents;