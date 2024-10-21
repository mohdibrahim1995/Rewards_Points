// utils/calculatePoints.test.js
import { calculateRewardPoints } from './calculatePoints';

describe('calculateRewardPoints', () => {
    test('should return correct points when amount is greater than 100', () => {
        const amount = 120;
        const points = calculateRewardPoints(amount);
        expect(points).toBe(90); // (120 - 100) * 2 + 50 = 90
    });

    test('should return correct points when amount is between 50 and 100', () => {
        const amount = 75;
        const points = calculateRewardPoints(amount);
        expect(points).toBe(25); // (75 - 50) * 1 = 25
    });

    test('should return 0 points when amount is 50 or less', () => {
        const amount = 50;
        const points = calculateRewardPoints(amount);
        expect(points).toBe(0); // 50 or less gets no points
    });

    test('should return 0 points when amount is below 50', () => {
        const amount = 30;
        const points = calculateRewardPoints(amount);
        expect(points).toBe(0); // no points for amounts below 50
    });
});
