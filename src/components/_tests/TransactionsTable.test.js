import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import TransactionsTable from '../TransactionsTable';
import { fetchTransactionData } from '../api/transactionData';

// Mock the fetchTransactionData function
jest.mock('../api/transactionData', () => ({
    fetchTransactionData: jest.fn(),
}));

const mockTransactions = [
    { id: 1, customerId: 'C001', customerName: 'John Doe', formattedDate: '7/5/2024', product: 'Laptop', amount: 120.00, points: 12 },
    { id: 2, customerId: 'C002', customerName: 'Jane Smith', formattedDate: '8/22/2024', product: 'Headphones', amount: 75.00, points: 7 },
    { id: 3, customerId: 'C003', customerName: 'Sean Smith', formattedDate: '8/1/2024', product: 'Phone', amount: 175.00, points: 17 },
    { id: 4, customerId: 'C002', customerName: 'Jane Smith', formattedDate: '7/14/2024', product: 'Mouse', amount: 95.00, points: 9 },
    { id: 5, customerId: 'C001', customerName: 'John Doe', formattedDate: '9/20/2024', product: 'Charger', amount: 95.00, points: 9 },
];





describe('TransactionsTable Component', () => {
    it('renders transaction data correctly', async () => {
        // Mock the API call
        fetchTransactionData.mockResolvedValueOnce(mockTransactions);

        // Render the component with the fetched transactions
        render(<TransactionsTable transactions={mockTransactions} />);

        // Wait for the table to populate
        await waitFor(() => {
            mockTransactions.forEach(transaction => {
                expect(screen.getByText(transaction.id.toString())).toBeInTheDocument();
                expect(screen.getByText(transaction.customerName)).toBeInTheDocument();
                expect(screen.getByText(transaction.product)).toBeInTheDocument();
                expect(screen.getByText(transaction.formattedDate)).toBeInTheDocument();
                expect(screen.getByText(`$${transaction.amount.toFixed(2)}`)).toBeInTheDocument();
                expect(screen.getByText(transaction.points.toString())).toBeInTheDocument();
            });
        });

        // Use `getAllByText` to handle duplicate customer IDs
        expect(screen.getAllByText('C001')).toHaveLength(2); // Appears twice
        expect(screen.getAllByText('C002')).toHaveLength(2); // Appears twice
        expect(screen.getByText('C003')).toBeInTheDocument(); // Appears once
    });
});
