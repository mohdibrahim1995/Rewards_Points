import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import CustomerList from 'src/components/CustomerList.js';
import { fetchTransactionData } from 'src/component/api/transactionData.js';

// Mock the fetchTransactionData function
jest.mock('src/components/api/transactionData', () => ({
    fetchTransactionData: jest.fn(),
}));

describe('CustomerList and TransactionsTable', () => {
    const mockTransactionData = [
        {
            id: 1,
            customerId: 'C001',
            customerName: 'John Doe',
            date: '7/5/2024', // mm/dd/yyyy format from mock data
            amount: 120.0,
            product: 'Laptop',
        },
        {
            id: 2,
            customerId: 'C002',
            customerName: 'Jane Smith',
            date: '8/22/2024', // mm/dd/yyyy format from mock data
            amount: 75.0,
            product: 'Headphones',
        },
        {
            id: 3,
            customerId: 'C003',
            customerName: 'Sean Smith',  // Fixed name order
            date: '8/1/2024', // mm/dd/yyyy format from mock data
            amount: 175.00,
            product: 'Phone',
        },
        {
            id: 4,
            customerId: 'C002',
            customerName: 'Jane Smith',
            date: '7/14/2024', // mm/dd/yyyy format from mock data
            amount: 95.00,
            product: 'Mouse',
        },
        {
            id: 5,
            customerId: 'C001',
            customerName: 'John Doe',
            date: '9/20/2024', // mm/dd/yyyy format from mock data
            amount: 95.00,
            product: 'Charger',
        },
    ];

    it('displays transaction dates in dd/mm/yyyy format', async () => {
        // Arrange: Mock the data returned by fetchTransactionData
        fetchTransactionData.mockResolvedValueOnce(mockTransactionData);

        // Act: Render the CustomerList component
        render(<CustomerList />);

        // Assert: Wait for the formatted dates to appear on the screen
        await waitFor(() => {
            // Check for each transaction's formatted date
            expect(screen.getByText('05/07/2024')).toBeInTheDocument();
            expect(screen.getByText('22/08/2024')).toBeInTheDocument();
            expect(screen.getByText('01/08/2024')).toBeInTheDocument();
            expect(screen.getByText('14/07/2024')).toBeInTheDocument();
            expect(screen.getByText('20/09/2024')).toBeInTheDocument();
        });

        // Assert additional transaction details if necessary (e.g., customerName)
        await waitFor(() => {
            expect(screen.getByText('John Doe')).toBeInTheDocument();
            expect(screen.getByText('Jane Smith')).toBeInTheDocument();
            expect(screen.getByText('Sean Smith')).toBeInTheDocument();
        });
    });

    it('displays loading indicator while fetching data', async () => {
        // Arrange: Mock fetchTransactionData to delay the response
        fetchTransactionData.mockImplementation(() => new Promise((resolve) => setTimeout(() => resolve(mockTransactionData), 1000)));

        // Act: Render the CustomerList component
        render(<CustomerList />);

        // Assert: Check if the loading message is displayed
        expect(screen.getByText(/loading.../i)).toBeInTheDocument();

        // Wait for the data to load and the loading message to disappear
        await waitFor(() => {
            expect(screen.queryByText(/loading.../i)).not.toBeInTheDocument();
        });
    });

    it('handles invalid dates gracefully', async () => {
        // Arrange: Mock data with an invalid date
        fetchTransactionData.mockResolvedValueOnce([
            {
                id: 1,
                customerId: 'C001',
                customerName: 'John Doe',
                date: 'invalid-date',
                amount: 120.0,
                product: 'Laptop',
            }
        ]);

        // Spy on console.error to check for error logging
        const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

        // Act: Render the CustomerList component
        render(<CustomerList />);

        // Assert: Check if the invalid date message appears
        await waitFor(() => {
            expect(screen.getByText(/invalid date/i)).toBeInTheDocument();
        });

        // Assert: Ensure the error is logged to the console
        expect(consoleSpy).toHaveBeenCalledWith('Invalid date: invalid-date');

        // Cleanup
        consoleSpy.mockRestore();
    });
});
