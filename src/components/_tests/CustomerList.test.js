import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import CustomerList from './CustomerList';
import { fetchTransactionData } from '../components/api/transactionData';

// Mock the fetchTransactionData function
jest.mock('../components/api/transactionData');

describe('CustomerList', () => {
    beforeEach(() => {
        // Reset mocks before each test
        jest.clearAllMocks();
    });

    it('renders the component and displays rewards data correctly', async () => {
        // Arrange: Create mock data
        const mockTransactions = [
            { customerName: 'John Doe', amount: 135, date: '2024-01-15' },
            { customerName: 'Jane Smith', amount: 70, date: '2024-01-20' },
            { customerName: 'Sean Smith', amount: 200, date: '2024-02-05' },
        ];

        // Mock implementation of fetchTransactionData to return mock data
        fetchTransactionData.mockResolvedValue(mockTransactions);

        // Act: Render the component
        render(<CustomerList />);

        // Assert: Verify that the component renders the monthly and total rewards after loading data
        await waitFor(() => {
            expect(screen.getByText(/monthly rewards/i)).toBeInTheDocument();
            expect(screen.getByText(/total rewards/i)).toBeInTheDocument();
            expect(screen.getByText('John Doe')).toBeInTheDocument();
            expect(screen.getByText('Jane Smith')).toBeInTheDocument();
            expect(screen.getByText('Sean Smith')).toBeInTheDocument();
        });

        // Further assertions can be added to check specific points calculations
        expect(screen.getByText('Total Points: 360')).toBeInTheDocument(); // Example assertion, adjust based on actual rendering
    });

    it('displays error message for invalid transactions', async () => {
        // Arrange: Create mock data with invalid date
        const mockTransactions = [
            { customerName: 'Invalid User', amount: 50, date: 'invalid-date' },
        ];

        // Mock implementation of fetchTransactionData to return mock data
        fetchTransactionData.mockResolvedValue(mockTransactions);

        // Act: Render the component
        render(<CustomerList />);

        // Assert: Check if error message is displayed
        await waitFor(() => {
            expect(screen.getByText(/invalid date/i)).toBeInTheDocument();
        });
    });

    it('displays loading screen while fetching data', async () => {
        // Arrange: Mock fetchTransactionData to delay the response
        fetchTransactionData.mockImplementation(() => new Promise((resolve) => setTimeout(() => resolve([]), 1000)));

        // Act: Render the component
        render(<CustomerList />);

        // Assert: Check if the loading message is displayed
        expect(screen.getByText(/loading.../i)).toBeInTheDocument();

        // Wait for the data to load (after the mock delay)
        await waitFor(() => {
            expect(screen.queryByText(/loading.../i)).not.toBeInTheDocument(); // Ensure loading message is gone
        });
    });
});
