import React, { useState, useEffect } from 'react';
import '../styles/LiveFeed.css';

// Generate random buyer names (example: "ABCD.EF" or "ABCDE.GH")
function getRandomBuyer() {
    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    // Generate either 4 or 5 letters randomly
    const randomLength = Math.floor(Math.random() * 2) + 4; // 4 or 5 letters
    const randomLetters = (n) =>
        Array.from({ length: n }, () =>
            letters.charAt(Math.floor(Math.random() * letters.length))
        ).join('');
    return randomLetters(randomLength) + '......' + randomLetters(3);
}

// Generate random SOL amounts (between 0 and 10 SOL)
function getRandomAmount() {
    return (Math.random() * 10).toFixed(2);
}

// Generate an individual transaction
function generateTransaction() {
    const solAmount = getRandomAmount();
    return {
        buyer: getRandomBuyer(),
        amount: solAmount,
        received: (parseFloat(solAmount) * 1000).toFixed(2) // 1000x conversion
    };
}

// Generate an initial feed with a few transactions
function generateInitialFeed(count = 8) {
    const items = [];
    for (let i = 0; i < count; i++) {
        items.push(generateTransaction());
    }
    return items;
}

function LiveFeed() {
    const [feed, setFeed] = useState(generateInitialFeed());
    const [pageIndex, setPageIndex] = useState(0);
    const ITEMS_PER_PAGE = 8;

    // Add a new transaction periodically and insert it at a random position
    useEffect(() => {
        const addTransactionInterval = setInterval(() => {
            setFeed((prevFeed) => {
                const newTx = generateTransaction();
                const newFeed = [...prevFeed];
                // Insert at a random index to jumble the order
                const randomIndex = Math.floor(Math.random() * (newFeed.length + 1));
                newFeed.splice(randomIndex, 0, newTx);
                return newFeed;
            });
        }, 4000); // Every 4 seconds
        return () => clearInterval(addTransactionInterval);
    }, []);

    // Update the page index based on the current feed length
    useEffect(() => {
        if (feed.length === 0) return;
        const pageCycleInterval = setInterval(() => {
            const totalPages = Math.ceil(feed.length / ITEMS_PER_PAGE);
            setPageIndex((prev) => (prev + 1) % totalPages);
        }, 4000);
        return () => clearInterval(pageCycleInterval);
    }, [feed]);

    const start = pageIndex * ITEMS_PER_PAGE;
    const end = start + ITEMS_PER_PAGE;
    const currentItems = feed.slice(start, end);

    return (
        <div className="live-feed">
            <h2>Recent Purchases</h2>
            <div className="feed-table-container">
                <table className="feed-table">
                    <thead>
                        <tr>
                            <th>Buyer</th>
                            <th>Amount (SOL)</th>
                            <th>$UTOPIA RECEIVED</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentItems.map((tx, index) => (
                            <tr key={index}>
                                <td>{tx.buyer}</td>
                                <td>{tx.amount}</td>
                                <td>{tx.received}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default LiveFeed;
