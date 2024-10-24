import React from 'react';

const TotalRewards = ({ totalRewards }) => {
    return (
        <div>
            <h2>Total Rewards</h2>
            <table className="table">
                <thead>
                    <tr>
                        <th>Customer Name</th>
                        <th>Total Reward Points</th>
                    </tr>
                </thead>
                <tbody>
                    {totalRewards.map((reward) => (
                        <tr key={reward.customerName}>
                            <td>{reward.customerName}</td>
                            <td>{reward.totalPoints}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default React.memo(TotalRewards);
