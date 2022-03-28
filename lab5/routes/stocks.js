const express = require('express');
const router = express.Router();
const data = require('../data');
const stockData = data.stocks;

router.get('/:id', async (req, res) => {
    try {
        const stock = await stockData.getStockById(req.params.id);
        res.json(stock);
    } catch (e) {
        res.status(404).json({ message: 'Stock not found' });
    }
});

router.get('/', async (req, res) => {
    try {
        const stockList = await stockData.getAllStocks();
        res.json(stockList);
    } catch (e) {
        res.status(500).send();
    }
});


module.exports = router;