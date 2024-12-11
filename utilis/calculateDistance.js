// Haversine formula to calculate the distance between two geographic points
// This function was created with the help of ChatGPT.
const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371; // Earth's radius in kilometers
    const dLat = (lat2 - lat1) * Math.PI / 180; // Difference in latitude (in radians)
    const dLon = (lon2 - lon1) * Math.PI / 180; // Difference in longitude (in radians)
    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2); // Haversine formula components
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)); // Angular distance in radians
    return R * c; // Distance in kilometers
};

module.exports = calculateDistance;