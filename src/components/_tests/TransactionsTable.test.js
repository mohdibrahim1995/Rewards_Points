import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import TransactionsTable from '../TransactionsTable.js';

// Mock transaction data
const mockTransactions = [
    {
        id: 1,
        customerId: 'C001',
        customerName: 'John Doe',
        formattedDate: '05/07/2024',
        amount: 120.00,
        product: 'Laptop',
        points: 90,
    },
    {
        id: 2,
        customerId: 'C002',
        customerName: 'Jane Smith',
        formattedDate: '22/08/2024',
        amount: 75.00,
        product: 'Headphones',
        points: 25,
    },
    {
        id: 3,
        customerId: 'C003',
        customerName: 'Sean Smith',
        formattedDate: '01/08/2024',
        amount: 175.00,
        product: 'Phone',
        points: 200,
    },
    {
        id: 4,
        customerId: 'C002',
        customerName: 'Jane Smith',
        formattedDate: '14/07/2024',
        amount: 95.00,
        product: 'Mouse',
        points: 45,
    },
    {
        id: 5,
        customerId: 'C001',
        customerName: 'John Doe',
        formattedDate: '20/09/2024',
        amount: 95.00,
        product: 'Charger',
        points: 45,
    },
];

describe('TransactionsTable Component', () => {

    test('renders the table with correct headers', () => {
        render(<TransactionsTable transactions={mockTransactions} />);

        // Check for table headings
        expect(screen.getByText('Transaction ID')).toBeInTheDocument();
        expect(screen.getByText('Customer ID')).toBeInTheDocument();
        expect(screen.getByText('Customer Name')).toBeInTheDocument();
        expect(screen.getByText('Purchase Date')).toBeInTheDocument();
        expect(screen.getByText('Product Purchased')).toBeInTheDocument();
        expect(screen.getByText('Price')).toBeInTheDocument();
        expect(screen.getByText('Reward Points')).toBeInTheDocument();
    });

    test('renders correct number of rows based on transactions prop', () => {
        render(<TransactionsTable transactions={mockTransactions} />);

        // Find all rows (except the header row)
        const rows = screen.getAllByRole('row');
        expect(rows.length).toBe(mockTransactions.length + 1); // +1 for header row
    });

    test('renders transaction data correctly', () => {
        render(<TransactionsTable transactions={mockTransactions} />);

        // Check if specific transaction data is displayed correctly
        mockTransactions.forEach(transaction => {
            expect(screen.getByText(transaction.id)).toBeInTheDocument();
            expect(screen.getByText(transaction.customerId)).toBeInTheDocument();
            expect(screen.getByText(transaction.customerName)).toBeInTheDocument();
            expect(screen.getByText(transaction.formattedDate)).toBeInTheDocument();
            expect(screen.getByText(transaction.product)).toBeInTheDocument();
            expect(screen.getByText(`$${transaction.amount.toFixed(2)}`)).toBeInTheDocument();
            expect(screen.getByText(transaction.points)).toBeInTheDocument();
        });
    });

    test('renders empty state correctly when there are no transactions', () => {
        render(<TransactionsTable transactions={[]} />);

        // Check that no rows are rendered except the header
        const rows = screen.getAllByRole('row');
        expect(rows.length).toBe(1); // Only header row should be present
    });
});
