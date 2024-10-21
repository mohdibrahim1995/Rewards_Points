const transactionData = [
    {
        id: 1,
        customerId: 'C001',
        customerName: 'John Doe',
        date: '7/5/2024',
        amount: 120.00,
        product: 'Laptop',
        year: 2024,
    },
    {
        id: 2,
        customerId: 'C002',
        customerName: 'Jane Smith',
        date: '8/22/2024',
        amount: 75.00,
        product: 'Headphones',
        year: 2024,
    },
    {
        id: 3,
        customerId: 'C003',
        customerName: 'Sean Smith',  // Fixed name order
        date: '8/1/2024',
        amount: 175.00,
        product: 'Phone',
        year: 2024,
    },
    {
        id: 4,
        customerId: 'C002',
        customerName: 'Jane Smith',
        date: '7/14/2024',
        amount: 95.00,
        product: 'Mouse',
        year: 2024,
    },
    {
        id: 5,
        customerId: 'C001',
        customerName: 'John Doe',
        date: '9/20/2024',
        amount: 95.00,
        product: 'Charger',
        year: 2024,
    },
];

// Simulate fetching data
export const fetchTransactionData = () =>
    new Promise((resolve) => {
        setTimeout(() => {
            resolve(transactionData);
        }, 1000);
    });
