import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import CustomerList from '../components/CustomerList.js';
import { fetchTransactionData } from '../api/transactionData.js';

// Mock the fetchTransactionData function
jest.mock('../components/api/transactionData', () => ({
    fetchTransactionData: jest.fn(),
}));

describe('CustomerList and TransactionsTable', () => {
    it('displays transaction dates in dd/mm/yyyy format', async () => {
        // Arrange: Mock the data returned by fetchTransactionData
        fetchTransactionData.mockResolvedValueOnce([
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
                date: '8/1/2024',
                amount: 175.00,
                product: 'Phone',
                year: 2024,
            },
            {
                id: 4,
                customerId: 'C002',
                customerName: 'Jane Smith',
                date: '7/14/2024',
                amount: 95.00,
                product: 'Mouse',
                year: 2024,
            },
            {
                id: 5,
                customerId: 'C001',
                customerName: 'John Doe',
                date: '9/20/2024',
                amount: 95.00,
                product: 'Charger',
                year: 2024,
            },
        ]);

        // Act: Render the CustomerList component
        render(<CustomerList />);

        // Assert: Wait for the formatted dates to appear on the screen
        await waitFor(() => {
            expect(screen.getByText('05/07/2024')).toBeInTheDocument();
            expect(screen.getByText('22/08/2024')).toBeInTheDocument();
            expect(screen.getByText('01/08/2024')).toBeInTheDocument();
            expect(screen.getByText('14/07/2024')).toBeInTheDocument();
            expect(screen.getByText('20/09/2024')).toBeInTheDocument();
        });
    });
});
