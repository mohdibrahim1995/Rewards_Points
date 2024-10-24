import React from 'react';

const TransactionsTable = ({ transactions }) => {
    return (
        <div>
            <h2>All Transactions</h2>
            <table className="table">
                <thead>
                    <tr>
                        <th>Transaction ID</th>
                        <th>Customer ID</th>
                        <th>Customer Name</th>
                        <th>Purchase Date</th>
                        <th>Product Purchased</th>
                        <th>Price</th>
                        <th>Reward Points</th>
                    </tr>
                </thead>
                <tbody>
                    {transactions.map((transaction) => (
                        <tr key={transaction.id}>
                            <td>{transaction.id}</td>
                            <td>{transaction.customerId}</td>
                            <td>{transaction.customerName}</td>
                            <td>{transaction.formattedDate}</td>
                            <td>{transaction.product}</td>
                            <td>${transaction.amount.toFixed(2)}</td>
                            <td>{transaction.points}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default React.memo(TransactionsTable);
