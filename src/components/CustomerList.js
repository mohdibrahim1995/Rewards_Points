import React, { useState, useEffect } from 'react';
import MonthlyRewards from './MonthlyRewards';
import TotalRewards from './TotalRewards';
import TransactionsTable from './TransactionsTable';
import { calculateRewardPoints } from '../utils/calculatePoints';
import { logger } from '../utils/logger'; // Importing the logger
import '../../src/App.css';
import { fetchTransactionData } from './api/transactionData';

// Utility function to format dates as dd/mm/yyyy
const formatDate = (dateString) => {
    const date = new Date(dateString);
    if (isNaN(date)) {
        logger.error(`Invalid date encountered: ${dateString}`);
        return 'Invalid Date';
    }
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
};

const CustomerList = () => {
    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [pollInterval, setPollInterval] = useState(5000);

    useEffect(() => {
        const fetchDatabaseLoad = async () => {
            try {
                const response = await fetch('/api/db-load');
                if (!response.ok) {
                    throw new Error('Failed to fetch DB load');
                }
                
                const { load } = await response.json();
                logger.info('Database load fetched successfully.', { load });

                if (load < 30) {
                    setPollInterval(5000);
                } else if (load < 70) {
                    setPollInterval(10000);
                } else {
                    setPollInterval(20000);
                }
            } catch (error) {
                logger.error('Failed to fetch DB load:', error);
                setPollInterval(15000);
            }
        };

        const loadTransactions = async () => {
            try {
                const data = await fetchTransactionData();
                const enrichedData = data.map((trans) => ({
                    ...trans,
                    points: calculateRewardPoints(trans.amount),
                    formattedDate: formatDate(trans.date),
                }));
                logger.info('Transactions loaded and enriched.', { enrichedData });
                setTransactions(enrichedData);
            } catch (err) {
                logger.error('Error loading transactions:', err);
                setError('Failed to load transactions');
            } finally {
                setLoading(false);
            }
        };

        const intervalId = setInterval(() => {
            fetchDatabaseLoad();
            loadTransactions();
        }, pollInterval);

        return () => clearInterval(intervalId); // Cleanup interval on component unmount
    }, [pollInterval]);

    if (loading) {
        return <div className="loading-message">Loading...</div>;
    }

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

    logger.info('Monthly data prepared.', { monthlyData });

    return (
        <div className="rewards-container">
            <MonthlyRewards monthlyData={Object.values(monthlyData)} />
            <TotalRewards totalRewards={totalRewardsArray} />
            <TransactionsTable transactions={transactions} />
        </div>
    );
};

export default React.memo(CustomerList);
