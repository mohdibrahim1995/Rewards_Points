export function calculateRewardPoints(amount) {
    let points = 0;
    if (amount > 100) {
        points += (amount - 100) * 2 + 50; // 2 points for dollars above 100, 1 point for each between 50-100
    } else if (amount > 50) {
        points += (amount - 50) * 1; // 1 point for each dollar between 50-100
    }
    return Math.floor(points); // Use Math.floor to round down the total points
}
