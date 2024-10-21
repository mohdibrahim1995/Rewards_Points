import React, { useState, useEffect } from 'react';
import MonthlyRewards from './MonthlyRewards';
import TotalRewards from './TotalRewards';
import TransactionsTable from './TransactionsTable';
import { calculateRewardPoints } from '../utils/calculatePoints';
import '../../src/App.css';
import { fetchTransactionData } from '../components/api/transactionData';

// Utility function to format dates as dd/mm/yyyy
const formatDate = (dateString) => {
    const date = new Date(dateString);
    // Check if the date is valid
    if (isNaN(date)) {
        console.error(`Invalid date: ${dateString}`);
        return 'Invalid Date';
    }
    const day = String(date.getDate()).padStart(2, '0'); // Ensure two digits
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
};

const CustomerList = () => {
    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(true); // Loading state
    const [error, setError] = useState(null); // State for error handling

    useEffect(() => {
        const loadTransactions = async () => {
            try {
                const data = await fetchTransactionData();
                const enrichedData = data.map((trans) => ({
                    ...trans,
                    points: calculateRewardPoints(trans.amount),
                    formattedDate: formatDate(trans.date),
                }));
                setTransactions(enrichedData);
            } catch (err) {
                setError('Failed to load transactions'); // Set error message
            } finally {
                setLoading(false); // Set loading to false once fetching is done
            }
        };
        loadTransactions();
    }, []);

    // Handle loading state
    if (loading) {
        return <div className="loading-message">Loading...</div>; // Display loading message
    }

    // Handle error state
    if (error) {
        return <div className="error-message">{error}</div>;
    }

    const totalRewards = transactions.reduce((acc, trans) => {
        acc[trans.customerName] = (acc[trans.customerName] || 0) + trans.points;
        return acc;
    }, {});

    const totalRewardsArray = Object.entries(totalRewards).map(([customerName, totalPoints]) => ({
        customerName,
        totalPoints,
    }));

    const monthlyData = transactions.reduce((acc, trans) => {
        const transactionDate = new Date(trans.date);
        const monthYear = `${transactionDate.toLocaleString('en-GB', { month: 'long' })} ${transactionDate.getFullYear()}`;
        if (!acc[monthYear]) acc[monthYear] = { monthYear, transactions: [] };
        acc[monthYear].transactions.push(trans);
        return acc;
    }, {});

    return (
        <div className="rewards-container">
            <MonthlyRewards monthlyData={Object.values(monthlyData)} />
            <TotalRewards totalRewards={totalRewardsArray} />
            <TransactionsTable transactions={transactions} />
        </div>
    );
};

export default CustomerList;
