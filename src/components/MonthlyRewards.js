import React from 'react';
import './MonthlyRewards.css';
const MonthlyRewards = ({ monthlyData }) => {
    return (
        <div>
            <h2>User Monthly Rewards</h2>
            {monthlyData.map((monthData) => (
                <div key={monthData.monthYear}>
                    <h3>{monthData.monthYear}</h3>
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Customer ID</th>
                                <th>Customer Name</th>
                                <th>Transaction ID</th>
                                <th>Amount Spent</th>
                                <th>Transaction Date</th>
                                <th>Transaction Year</th>
                                <th>Points</th>
                            </tr>
                        </thead>
                        <tbody>
                            {monthData.transactions.map((transaction) => (
                                <React.Fragment key={transaction.id}>
                                    <tr>
                                        <td>{transaction.customerId}</td>
                                        <td>{transaction.customerName}</td>
                                        <td>{transaction.id}</td>
                                        <td>${transaction.amount.toFixed(2)}</td>
                                        <td>{transaction.formattedDate}</td>
                                        <td>{transaction.year}</td>
                                        <td>{transaction.points}</td>
                                    </tr>
                                </React.Fragment>
                            ))}
                        </tbody>
                    </table>
                </div>
            ))}
        </div>
    );
};

export default React.memo(MonthlyRewards);
