import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import CustomerList from '../CustomerList';
import { fetchTransactionData } from '../api/transactionData';

// Mock the fetchTransactionData function
jest.mock('../api/transactionData', () => ({
    fetchTransactionData: jest.fn(),
}));

// Helper: Mock transaction data
const mockTransactionData = [
    {
        id: 1,
        customerId: 'C001',
        customerName: 'John Doe',
        date: '7/5/2024',
        amount: 120.0,
        product: 'Laptop',
    },
    {
        id: 2,
        customerId: 'C002',
        customerName: 'Jane Smith',
        date: '8/22/2024',
        amount: 75.0,
        product: 'Headphones',
    },
    {
        id: 3,
        customerId: 'C003',
        customerName: 'Sean Smith',
        date: '8/1/2024',
        amount: 175.0,
        product: 'Phone',
    },
    {
        id: 4,
        customerId: 'C002',
        customerName: 'Jane Smith',
        date: '7/14/2024',
        amount: 95.0,
        product: 'Mouse',
    },
    {
        id: 5,
        customerId: 'C001',
        customerName: 'John Doe',
        date: '9/20/2024',
        amount: 95.0,
        product: 'Charger',
    },
];

describe('CustomerList Component', () => {
    it('displays transaction dates in dd/mm/yyyy format', async () => {
        // Mock the fetchTransactionData function to return mock data
        fetchTransactionData.mockResolvedValueOnce(mockTransactionData);

        // Render the CustomerList component
        render(<CustomerList />);

        // Wait for the formatted dates to appear
        await waitFor(() => {
            expect(screen.getByText('05/07/2024')).toBeInTheDocument();
            expect(screen.getByText('22/08/2024')).toBeInTheDocument();
            expect(screen.getByText('01/08/2024')).toBeInTheDocument();
            expect(screen.getByText('14/07/2024')).toBeInTheDocument();
            expect(screen.getByText('20/09/2024')).toBeInTheDocument();
        });

        // Verify customer names are displayed correctly
        await waitFor(() => {
            expect(screen.getByText('John Doe')).toBeInTheDocument();
            expect(screen.getByText('Jane Smith')).toBeInTheDocument();
            expect(screen.getByText('Sean Smith')).toBeInTheDocument();
        });
    });

    it('displays loading indicator while fetching data', async () => {
        // Mock fetchTransactionData with a delayed response
        fetchTransactionData.mockImplementation(() =>
            new Promise((resolve) => setTimeout(() => resolve(mockTransactionData), 1000))
        );

        // Render the CustomerList component
        render(<CustomerList />);

        // Check if the loading message is displayed initially
        expect(screen.getByText(/loading.../i)).toBeInTheDocument();

        // Wait for the data to load and the loading message to disappear
        await waitFor(() => {
            expect(screen.queryByText(/loading.../i)).not.toBeInTheDocument();
        });
    });

    it('handles invalid dates gracefully', async () => {
        // Mock data with an invalid date
        const invalidDateData = [
            {
                id: 1,
                customerId: 'C001',
                customerName: 'John Doe',
                date: 'invalid-date',
                amount: 120.0,
                product: 'Laptop',
            },
        ];

        // Mock fetchTransactionData to return invalid date data
        fetchTransactionData.mockResolvedValueOnce(invalidDateData);

        // Spy on console.error to check for error logging
        const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

        // Render the CustomerList component
        render(<CustomerList />);

        // Check if the 'Invalid date' message is displayed
        await waitFor(() => {
            expect(screen.getByText(/invalid date/i)).toBeInTheDocument();
        });

        // Ensure the error was logged to the console
        expect(consoleSpy).toHaveBeenCalledWith('Invalid date: invalid-date');

        // Clean up console spy
        consoleSpy.mockRestore();
    });
});
