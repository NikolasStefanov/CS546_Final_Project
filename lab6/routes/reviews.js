const express = require('express');
const router = express.Router();
const data = require('../data');
const reviewData = data.reviews;
let { ObjectId } = require('mongodb');

router.get('/:id', async (req, res) => {
    let id = req.params.id
    if (!id && id !== 0) {
        res.status(400).json({ error: 'No Input' });
        return;
    }
    if (typeof id !== 'string') {
        res.status(400).json({ error: 'Not a string' });
        return;
    }
    id = id.trim()
    if (id === "") {
        res.status(400).json({ error: 'Whitespace' });
        return;
    }
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
        res.status(400).json({ error: 'Invalid ID' });
        return;
    }
    try {
        const reviewList = await reviewData.getRestaurant(id);
        res.json(reviewList);
    } catch (e) {
        res.status(404).json({ message: e });
    }
});

router.post('/:id', async (req, res) => {
    let info = req.body

    //id
    let id = req.params.id
    if (!id && id !== 0) {
        res.status(400).json({ error: 'No Input' });
        return;
    }
    if (typeof id !== 'string') {
        res.status(400).json({ error: 'Not a string' });
        return;
    }
    id = id.trim()
    if (id === "") {
        res.status(400).json({ error: 'Whitespace' });
        return;
    }
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
        res.status(400).json({ error: 'Invalid ID' });
        return;
    }

    // Title
    if (!info.title) {
        res.status(400).json({ error: 'You must provide a valid title' });
        return;
    }
    if (typeof info.title !== 'string') {
        res.status(400).json({ error: 'You must provide a valid title' });
        return;
    }
    let title = info.title.trim()
    if (title === "") {
        res.status(400).json({ error: 'You must provide a valid title' });
        return;
    }

    // Reviewer
    if (!info.reviewer) {
        res.status(400).json({ error: 'You must provide a valid reviewer' });
        return;
    }
    if (typeof info.reviewer !== 'string') {
        res.status(400).json({ error: 'You must provide a valid reviewer' });
        return;
    }
    let reviewer = info.reviewer.trim()
    if (reviewer === "") {
        res.status(400).json({ error: 'You must provide a valid reviewer' });
        return;
    }

    // Reviewer
    if (!info.rating) {
        res.status(400).json({ error: 'You must provide a valid rating' });
        return;
    }
    if (typeof info.rating !== 'number') {
        res.status(400).json({ error: 'You must provide a valid rating' });
        return;
    }
    let rating = info.rating
    if (rating > 5 || rating < 0) {
        res.status(400).json({ error: 'You must provide a valid rating' });
        return;
    }

    // Date
    if (!info.dateOfReview) {
        res.status(400).json({ error: 'You must provide a valid date' });
        return;
    }
    if (typeof info.dateOfReview !== 'string') {
        res.status(400).json({ error: 'You must provide a valid date' });
        return;
    }
    let dateOfReview = info.dateOfReview.trim()
    if (dateOfReview === "") {
        res.status(400).json({ error: 'You must provide a valid date' });
        return;
    }
    if (!/^\d{2}\/\d{2}\/\d{4}$/.test(dateOfReview)) {
        res.status(400).json({ error: 'You must provide a valid date2' });
        return;
    }

    // Review
    if (!info.review) {
        res.status(400).json({ error: 'You must provide a valid review' });
        return;
    }
    if (typeof info.review !== 'string') {
        res.status(400).json({ error: 'You must provide a valid review' });
        return;
    }
    let review1 = info.review.trim()
    if (review1 === "") {
        res.status(400).json({ error: 'You must provide a valid review' });
        return;
    }

    try {
        const review = await reviewData.create(id, title, reviewer, rating, dateOfReview, review1);
        res.json(review);
    } catch (e) {
        res.status(500)
    }
});

router.get('/review/:id', async (req, res) => {
    let id = req.params.id
    if (!id) {
        res.status(400).json({ error: 'You must provide a valid id' });
        return;
    }
    if (typeof id !== 'string') {
        res.status(400).json({ error: 'Not a string' });
        return;
    }
    id = id.trim()
    if (id === "") {
        res.status(400).json({ error: 'Whitespace' });
        return;
    }
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
        res.status(400).json({ error: 'Invalid ID' });
        return;
    }
    try {
        const review = await reviewData.getReview(id);
        res.json(review);
    } catch (e) {
        res.status(404).json({ message: 'Review not found' });
    }
});

router.delete('/:id', async (req, res) => {
    let id = req.params.id
    if (!id && id !== 0) {
        res.status(400).json({ error: 'No Input' });
        return;
    }
    if (typeof id !== 'string') {
        res.status(400).json({ error: 'Not a string' });
        return;
    }
    id = id.trim()
    if (id === "") {
        res.status(400).json({ error: 'Whitespace' });
        return;
    }
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
        res.status(400).json({ error: 'Bad ID' });
        return;
    }
    try {
        const review = await reviewData.remove(id);
        res.json(review);
    } catch (e) {
        res.status(404).json({ message: 'Review not found' });
    }
});

module.exports = router;