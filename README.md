# Getting Started with Create React App
# Redme Instrsuction from this line


# Customer Rewards Program (Frontend)

A retailer offers a rewards program to its customers, awarding points based on each recorded purchase.  

## Project Description

A customer receives : 2 points for every dollar spent over $100 in each transaction, plus 1 point for every dollar spent between $50 and $100 in each transaction. 
(e.g. a $120 purchase = 2x$20 + 1x$50 = 90 points). 
  
Given a record of every transaction during a three month period, calculate the reward points earned for each customer per month and total. 


## Tech Stack

- **Frontend:** React JS
- **Testing:** Jest & React Testing Library

## Getting Started

### Prerequisites

- Node.js and npm installed

### Setup

1. **Clone the repository:**    
https://github.com/sushmita30jan/reward-calculator/

2. **Install dependencies:**
   npm install

3. **Start the React application:**
   npm start

4. **Test Case Run**
    npm run test

### Usage

The frontend application will be available at `http://localhost:3000`.

### Mock Data

The application uses mock data to simulate the rewards calculation. The mock data is defined in `public/customerTransactionsData.json`.

## Features

- Calculate Reward points earned for each customer per month and total
- Show data based on latest consecutive N month period of time
  - Transaction data can be with in the same year or spans different years

* Data is grouped based on years if it spans different years
* Multiple transactions within the month are sumed up together
* Rounded up rewards

* Loading screen and Error handling is implemented
* Test cases for all of the above scenarios are added
* Transaction data is logged



### Running Appilcation Screenshots
https://github.com/mohdibrahim1995/Rewards_Points/blob/main/Full_Table.PNG

Tests 
https://github.com/mohdibrahim1995/Rewards_Points/blob/main/Test_Cases.PNG

Error - 
https://github.com/mohdibrahim1995/Rewards_Points/blob/main/Error.png

Loading - 
https://github.com/mohdibrahim1995/Rewards_Points/blob/main/Loading_Screen.PNG




### File Structure

reward-calculator/
├── public/
│   └── customerTransactionsData.json
├── src/
│   ├── __tests__/
│   │   ├── CustomerList.test.js
│   │   ├── MonthlyRewards.test.js
│   │   ├── TotalRewards.test.js
│   │   ├── TransactionsTable.test.js
│   │   └── calculatePoints.test.js
│   ├── components/
│   │   ├── api/
│   │   │   ├── transactionData.js
│   │   │   └── transactionData.test.js
│   │   ├── MonthlyRewards/
│   │   │   ├── MonthlyRewards.js
│   │   │   └── MonthlyRewards.css
│   │   ├── TotalRewards/
│   │   │   ├── TotalRewards.js
│   │   │   └── TotalRewards.css
│   │   ├── TransactionsTable/
│   │   │   ├── TransactionsTable.js
│   │   │   └── TransactionsTable.css
│   │   └── CustomerList/
│   │       ├── CustomerList.js
│   │       └── CustomerList.css
│   ├── utils/
│   │   ├── calculatePoints.js
│   │   └── _tests/
│   │       └── calculatePoints.test.js
│   ├── App.css
│   ├── App.js
│   ├── App.test.js
│   ├── index.css
│   ├── index.js
│   ├── logo.svg
│   ├── reportWebVitals.js
│   └── setupTests.js
├── .gitignore
├── package.json
└── ...
