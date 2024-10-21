import React from 'react';
import { render, screen } from '@testing-library/react';
import MonthlyRewards from './MonthlyRewards.js';

describe('MonthlyRewards Component', () => {
    const mockData = [
        {
            monthYear: 'July 2024',
            transactions: [
                {
                    id: '1',
                    customerId: 'C001',
                    customerName: 'John Doe',
                    amount: 120.00,
                    formattedDate: '2024-07-05',
                    year: '2024',
                    points: 90,
                },
                {
                    id: '2',
                    customerId: 'C002',
                    customerName: 'Jane Smith',
                    amount: 95,
                    formattedDate: '2024-07-14',
                    year: '2024',
                    points: 45,
                },
            ],
        },
        {
            monthYear: 'August  2024',
            transactions: [
                {
                    id: '3',
                    customerId: 'C003',
                    customerName: 'Jane Smith',
                    amount: 75.00,
                    formattedDate: '2024-08-22',
                    year: '2024',
                    points: 25,
                },
                {
                    id: '4',
                    customerId: 'C003',
                    customerName: 'Sean Smith',
                    amount: 175.00,
                    formattedDate: '2024-08-01',
                    year: '2024',
                    points: 200,
                },
            ],
        },
        {
            monthYear: 'September  2024',
            transactions: [
                {
                    id: '5',
                    customerId: 'C001',
                    customerName: 'John Doe',
                    amount: 95.00,
                    formattedDate: '2024-09-20',
                    year: '2024',
                    points: 45,
                },
            ],
        },
    ];

    test('renders User Monthly Rewards heading', () => {
        render(<MonthlyRewards monthlyData={[]} />);
        const headingElement = screen.getByText(/User Monthly Rewards/i);
        expect(headingElement).toBeInTheDocument();
    });

    test('renders correct monthly data', () => {
        render(<MonthlyRewards monthlyData={mockData} />);

        // Check for month headers
        expect(screen.getByText(/July  2024/i)).toBeInTheDocument();
        expect(screen.getByText(/August  2024/i)).toBeInTheDocument();
        expect(screen.getByText(/September  2024/i)).toBeInTheDocument();

        // Check for transactions in July
        expect(screen.getByText(/John Doe/i)).toBeInTheDocument();
        expect(screen.getByText(/\$120.00/i)).toBeInTheDocument();
        expect(screen.getByText(/Jane Smith/i)).toBeInTheDocument();
        expect(screen.getByText(/\$95.50/i)).toBeInTheDocument();

        // Check for transactions in August
        expect(screen.getByText(/Jane Smith/i)).toBeInTheDocument();
        expect(screen.getByText(/\$75.00/i)).toBeInTheDocument();
        expect(screen.getByText(/Sean Smith/i)).toBeInTheDocument();
        expect(screen.getByText(/\$175.00/i)).toBeInTheDocument();

        // Check for transactions in September 
        expect(screen.getByText(/John Doe/i)).toBeInTheDocument();
        expect(screen.getByText(/\$95.00/i)).toBeInTheDocument();
    });

    test('renders empty state when no monthly data is provided', () => {
        render(<MonthlyRewards monthlyData={[]} />);
        const monthHeaders = screen.queryAllByRole('heading', { level: 3 });
        expect(monthHeaders.length).toBe(0); // No month headers should be present
    });
});
