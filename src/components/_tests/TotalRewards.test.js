import React from 'react';
import { render, screen } from '@testing-library/react';
import TotalRewards from '../TotalRewards'; // Path to your component

describe('TotalRewards Component', () => {
    const mockTotalRewards = [
        { customerName: 'John Doe', totalPoints: 135 },
        { customerName: 'Jane Smith', totalPoints: 70 },
        { customerName: 'Sean Smith', totalPoints: 200 },
    ];

    test('renders total rewards table heading', () => {
        // Render the component with mock data
        render(<TotalRewards totalRewards={mockTotalRewards} />);

        // Verify that the table heading is present
        expect(screen.getByText('Total Rewards')).toBeInTheDocument();
    });

    test('renders correct table headings', () => {
        // Render the component with mock data
        render(<TotalRewards totalRewards={mockTotalRewards} />);

        // Verify that the table headings are present
        expect(screen.getByText(/Customer Name/i)).toBeInTheDocument();
        expect(screen.getByText(/Total Reward Points/i)).toBeInTheDocument();
    });

    test('renders correct customer data and points', () => {
        // Render the component with mock data
        render(<TotalRewards totalRewards={mockTotalRewards} />);

        // Verify that customer names and points are rendered correctly
        expect(screen.getByText('John Doe')).toBeInTheDocument();
        expect(screen.getByText('135')).toBeInTheDocument();

        expect(screen.getByText('Jane Smith')).toBeInTheDocument();
        expect(screen.getByText('70')).toBeInTheDocument();

        expect(screen.getByText('Sean Smith')).toBeInTheDocument();
        expect(screen.getByText('200')).toBeInTheDocument();
    });
});
