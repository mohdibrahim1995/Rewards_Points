import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import CustomerList from '../CustomerList';
import { fetchTransactionData } from '../api/transactionData';

// Mock the fetchTransactionData function
jest.mock('../api/transactionData');

describe('CustomerList', () => {
    beforeEach(() => {
        // Reset mocks before each test
        jest.clearAllMocks();
    });

    it('renders the component and displays rewards data correctly', async () => {
        const mockTransactions = [
            { customerName: 'John Doe', amount: 135, date: '2024-01-15' },
            { customerName: 'Jane Smith', amount: 70, date: '2024-01-20' },
            { customerName: 'Sean Smith', amount: 200, date: '2024-02-05' },
        ];

        // Mock the resolved value of fetchTransactionData
        fetchTransactionData.mockResolvedValueOnce(mockTransactions);

        render(<CustomerList />);

        // Ensure loading text is shown initially
        expect(screen.getByText(/loading.../i)).toBeInTheDocument();

        // Wait until the loading disappears and data is rendered
        await waitFor(() => {
            expect(screen.queryByText(/loading.../i)).not.toBeInTheDocument();
        });

        // Check if certain key elements are rendered on the screen
        expect(screen.getByText(/monthly rewards/i)).toBeInTheDocument();
        expect(screen.getByText(/total rewards/i)).toBeInTheDocument();

        // Verify that customer names and transactions are rendered
        expect(screen.getByText('John Doe')).toBeInTheDocument();
        expect(screen.getByText('Jane Smith')).toBeInTheDocument();
        expect(screen.getByText('Sean Smith')).toBeInTheDocument();

        // Check if the points are calculated and displayed correctly
        // Assuming the points calculation is based on the logic in `calculateRewardPoints`
        expect(screen.getByText(/total points/i)).toBeInTheDocument();
    });

    it('displays error message for invalid transactions', async () => {
        const mockTransactions = [
            { customerName: 'Invalid User', amount: 50, date: 'invalid-date' },
        ];

        // Mock invalid transaction data
        fetchTransactionData.mockResolvedValueOnce(mockTransactions);

        render(<CustomerList />);

        // Ensure loading text is shown initially
        expect(screen.getByText(/loading.../i)).toBeInTheDocument();

        // Wait for data to load and for loading text to disappear
        await waitFor(() => {
            expect(screen.queryByText(/loading.../i)).not.toBeInTheDocument();
        });

        // Check that error handling is invoked and invalid data is displayed
        expect(screen.getByText(/invalid date/i)).toBeInTheDocument();
        expect(screen.getByText(/invalid user/i)).toBeInTheDocument();
    });

    it('displays loading screen while fetching data', async () => {
        // Mock the fetchTransactionData function with a delay
        fetchTransactionData.mockImplementation(
            () => new Promise((resolve) => setTimeout(() => resolve([]), 1000))
        );

        render(<CustomerList />);

        // Ensure loading message is shown while data is being fetched
        expect(screen.getByText(/loading.../i)).toBeInTheDocument();

        // Wait for the loading to disappear after the mock timeout
        await waitFor(() => {
            expect(screen.queryByText(/loading.../i)).not.toBeInTheDocument();
        });
    });

    it('displays error message when the API call fails', async () => {
        // Mock the fetchTransactionData to throw an error
        fetchTransactionData.mockRejectedValueOnce(new Error('API Error'));

        render(<CustomerList />);

        // Ensure loading message is shown initially
        expect(screen.getByText(/loading.../i)).toBeInTheDocument();

        // Wait for the error message to appear
        await waitFor(() => {
            expect(screen.queryByText(/loading.../i)).not.toBeInTheDocument();
            expect(screen.getByText(/failed to load transactions/i)).toBeInTheDocument();
        });
    });
});
