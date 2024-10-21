import React from 'react';
import { render, screen, waitFor, act } from '@testing-library/react'; // Correct import of act
import TotalRewards from '../TotalRewards.js';

describe('TotalRewards Component', () => {
    const mockTotalRewards = [
        { customerName: 'John Doe', totalPoints: 135 },
        { customerName: 'Jane Smith', totalPoints: 70 },
        { customerName: 'Sean Smith', totalPoints: 200 },
    ];

    test('renders total rewards table', () => {
        render(<TotalRewards totalRewards={mockTotalRewards} />);
        expect(screen.getByText('Total Rewards')).toBeInTheDocument();
        expect(screen.getByText('John Doe')).toBeInTheDocument();
        expect(screen.getByText('135')).toBeInTheDocument();
    });

    test('renders correct table headings', () => {
        render(<TotalRewards totalRewards={mockTotalRewards} />);
        expect(screen.getByText(/Customer Name/i)).toBeInTheDocument();
        expect(screen.getByText(/Total Reward Points/i)).toBeInTheDocument();
    });
});
