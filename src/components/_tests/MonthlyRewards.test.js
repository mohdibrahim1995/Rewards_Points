import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import CustomerList from './CustomerList'; // Assuming CustomerList is the component you want to test
import { fetchTransactionData } from '../api/transactionData'; 

// Mock the fetchTransactionData function
jest.mock('../api/transactionData', () => ({
    fetchTransactionData: jest.fn(  
        () => Promise.resolve(mockTransactionData)
        ),
   
}))

const mockTransactionData = [
    { id: 1, customerId: 'C001', customerName: 'John Doe', date: '7/5/2024', amount: 120.00, year: 2024 },
    { id: 2, customerId: 'C002', customerName: 'Jane Smith', date: '8/22/2024', amount: 75.00, year: 2024 },
    { id: 3, customerId: 'C003', customerName: 'Sean Smith', date: '8/1/2024', amount: 175.00, year: 2024 },
    { id: 4, customerId: 'C002', customerName: 'Jane Smith', date: '7/14/2024', amount: 95.00, year: 2024 },
    { id: 5, customerId: 'C001', customerName: 'John Doe', date: '9/20/2024', amount: 95.00, year: 2024 },
];

test('renders user monthly rewards table grouped by month', async () => {
    // Mock the API response
    fetchTransactionData.mockResolvedValueOnce(mockTransactionData);

    // Render the CustomerList component
    render(<CustomerList />);

    // Wait for the loading message to disappear
    await waitFor(() => expect(screen.queryByText('Loading...')).not.toBeInTheDocument());

    // Check for the presence of the monthly groups (July, August, September)
    expect(screen.getByText('July 2024')).toBeInTheDocument();
    expect(screen.getByText('August 2024')).toBeInTheDocument();
    expect(screen.getByText('September 2024')).toBeInTheDocument();

    // Check the rows for each transaction in July
    expect(screen.getByText('C001')).toBeInTheDocument(); // Customer ID for John Doe
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('120.00')).toBeInTheDocument();
    expect(screen.getByText('05/07/2024')).toBeInTheDocument(); // Formatted date
    expect(screen.getByText('90')).toBeInTheDocument(); // Points for $120.00 spent

    expect(screen.getByText('C002')).toBeInTheDocument(); // Customer ID for Jane Smith
    expect(screen.getByText('Jane Smith')).toBeInTheDocument();
    expect(screen.getByText('95.00')).toBeInTheDocument();
    expect(screen.getByText('14/07/2024')).toBeInTheDocument();
    expect(screen.getByText('45')).toBeInTheDocument(); // Points for $95.00 spent

    // Check the rows for each transaction in August
    expect(screen.getByText('C002')).toBeInTheDocument();
    expect(screen.getByText('75.00')).toBeInTheDocument();
    expect(screen.getByText('22/08/2024')).toBeInTheDocument();
    expect(screen.getByText('25')).toBeInTheDocument(); // Points for $75.00 spent

    expect(screen.getByText('C003')).toBeInTheDocument();
    expect(screen.getByText('Sean Smith')).toBeInTheDocument();
    expect(screen.getByText('175.00')).toBeInTheDocument();
    expect(screen.getByText('01/08/2024')).toBeInTheDocument();
    expect(screen.getByText('200')).toBeInTheDocument(); // Points for $175.00 spent

    // Check the rows for each transaction in September
    expect(screen.getByText('C001')).toBeInTheDocument();
    expect(screen.getByText('95.00')).toBeInTheDocument();
    expect(screen.getByText('20/09/2024')).toBeInTheDocument();
    expect(screen.getByText('45')).toBeInTheDocument(); // Points for $95.00 spent
});
