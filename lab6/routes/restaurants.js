const express = require('express');
const router = express.Router();
const data = require('../data');
const restaurantData = data.restaurants;
let { ObjectId } = require('mongodb');

router.get('/', async (req, res) => {
    try {
        const restaurantList = await restaurantData.getAll();
        res.json(restaurantList);
    } catch (e) {
        res.status(500).send();
    }
});

router.post('/', async (req, res) => {
    //Error Checking
    let info = req.body;

    if (!info) {
        res.status(400).json({ error: 'You must provide data to create a restaurant' });
        return;
    }

    // Name
    if (!info.name) {
        res.status(400).json({ error: 'You must provide a valid name' });
        return;
    }
    if (typeof info.name !== 'string') {
        res.status(400).json({ error: 'You must provide a valid name' });
        return;
    }
    let name = info.name.trim()
    if (name === "") {
        res.status(400).json({ error: 'You must provide a valid name' });
        return;
    }

    // Location
    if (!info.location) {
        res.status(400).json({ error: 'You must provide a valid location' });
        return;
    }
    if (typeof info.location !== 'string') {
        res.status(400).json({ error: 'You must provide a valid location' });
        return;
    }
    let location = info.location.trim()
    if (location === "") {
        res.status(400).json({ error: 'You must provide a valid location' });
        return;
    }

    // Phone Number
    if (!info.phoneNumber) {
        res.status(400).json({ error: 'You must provide a valid phone number' });
        return;
    }
    let phoneNumber = info.phoneNumber
    if (typeof phoneNumber !== 'string') {
        res.status(400).json({ error: 'You must provide a valid phone number' });
        return;
    }
    if (!/^\d{3}-\d{3}-\d{4}$/.test(phoneNumber)) {
        res.status(400).json({ error: 'You must provide a valid phone number' });
        return;
    }

    // Website
    if (!info.website) {
        res.status(400).json({ error: 'You must provide a valid website' });
        return;
    }
    let website = info.website
    if (typeof website !== 'string') {
        res.status(400).json({ error: 'You must provide a valid website' });
        return;
    }
    website = website.trim()
    if (website === "") {
        res.status(400).json({ error: 'You must provide a valid website' });
        return;
    }
    website = website.toLowerCase()
    if (!(website.substring(0, 10) === "http://www" || website.substring(0, 11) === "https://www") && website.substring(website.length - 4) !== ".com") {
        res.status(400).json({ error: 'You must provide a valid website' });
        return;
    }

    // Price Range
    if (!info.priceRange) {
        res.status(400).json({ error: 'You must provide a valid price range' });
        return;
    }
    let priceRange = info.priceRange
    if (typeof priceRange !== 'string') {
        res.status(400).json({ error: 'You must provide a valid price range' });
        return;
    }
    let priceBool = true
    for (let i = 1; i <= 4; i++) {
        if (priceRange === "$".repeat(i)) {
            priceBool = false
        }
    }
    if (priceBool) {
        res.status(400).json({ error: 'You must provide a valid price range' });
        return;
    }

    // Cuisines
    if (!info.cuisines) {
        res.status(400).json({ error: 'You must provide a valid list of cuisines' });
        return;
    }
    let cuisines = info.cuisines
    if (!Array.isArray(cuisines)) {
        res.status(400).json({ error: 'You must provide a valid list of cuisines' });
        return;
    }
    for (let element of cuisines) {
        if (typeof element !== 'string') {
            res.status(400).json({ error: 'You must provide a valid list of cuisines' });
            return;
        }
        if (element.trim === "") {
            res.status(400).json({ error: 'You must provide a valid list of cuisines' });
            return;
        }
    }

    // Service Options
    if (!info.serviceOptions) {
        res.status(400).json({ error: 'You must provide a valid object for service options' });
        return;
    }
    let serviceOptions = info.serviceOptions
    if (typeof serviceOptions !== 'object') {
        res.status(400).json({ error: 'You must provide a valid object for service options1' });
        return;
    }
    if (serviceOptions === {}) {
        res.status(400).json({ error: 'You must provide a valid object for service options2' });
        return;
    }
    for (let props in serviceOptions) {
        if (props !== "dineIn" && props !== "takeOut" && props !== "delivery") {
            res.status(400).json({ error: 'You must provide a valid object for service options3' });
            return;
        }
        if (typeof (serviceOptions[props]) !== 'boolean') {
            res.status(400).json({ error: 'You must provide a valid object for service options4' });
            return;
        }
    }

    //Real Function
    try {
        const restaurant = await restaurantData.create(name, location, phoneNumber,
            website, priceRange, cuisines, serviceOptions);
        res.json(restaurant);
        return
    } catch (e) {
        res.sendStatus(500)
    }
});

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
        const restaurant = await restaurantData.get(id);
        res.json(restaurant);
    } catch (e) {
        res.status(404).json({ message: e });
    }
});

router.put('/:id', async (req, res) => {
    let info = req.body;
    let id = req.params.id
    if (!info) {
        res.status(400).json({ error: 'You must provide data to create a restaurant' });
        return;
    }
    // ID
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

    // Name
    if (!info.name) {
        res.status(400).json({ error: 'You must provide a valid name' });
        return;
    }
    if (typeof info.name !== 'string') {
        res.status(400).json({ error: 'You must provide a valid name' });
        return;
    }
    let name = info.name.trim()
    if (name === "") {
        res.status(400).json({ error: 'You must provide a valid name' });
        return;
    }

    // Location
    if (!info.location) {
        res.status(400).json({ error: 'You must provide a valid location' });
        return;
    }
    if (typeof info.location !== 'string') {
        res.status(400).json({ error: 'You must provide a valid location' });
        return;
    }
    let location = info.location.trim()
    if (location === "") {
        res.status(400).json({ error: 'You must provide a valid location' });
        return;
    }

    // Phone Number
    if (!info.phoneNumber) {
        res.status(400).json({ error: 'You must provide a valid phone number' });
        return;
    }
    let phoneNumber = info.phoneNumber
    if (typeof phoneNumber !== 'string') {
        res.status(400).json({ error: 'You must provide a valid phone number' });
        return;
    }
    if (!/^\d{3}-\d{3}-\d{4}$/.test(phoneNumber)) {
        res.status(400).json({ error: 'You must provide a valid phone number' });
        return;
    }

    // Website
    if (!info.website) {
        res.status(400).json({ error: 'You must provide a valid website' });
        return;
    }
    let website = info.website
    if (typeof website !== 'string') {
        res.status(400).json({ error: 'You must provide a valid website' });
        return;
    }
    website = website.trim()
    if (website === "") {
        res.status(400).json({ error: 'You must provide a valid website' });
        return;
    }
    website = website.toLowerCase()
    if (!(website.substring(0, 10) === "http://www" || website.substring(0, 11) === "https://www") && website.substring(website.length - 4) !== ".com") {
        res.status(400).json({ error: 'You must provide a valid website' });
        return;
    }

    // Price Range
    if (!info.priceRange) {
        res.status(400).json({ error: 'You must provide a valid price range' });
        return;
    }
    let priceRange = info.priceRange
    if (typeof priceRange !== 'string') {
        res.status(400).json({ error: 'You must provide a valid price range' });
        return;
    }
    let priceBool = true
    for (let i = 1; i <= 4; i++) {
        if (priceRange === "$".repeat(i)) {
            priceBool = false
        }
    }
    if (priceBool) {
        res.status(400).json({ error: 'You must provide a valid price range' });
        return;
    }

    // Cuisines
    if (!info.cuisines) {
        res.status(400).json({ error: 'You must provide a valid list of cuisines' });
        return;
    }
    let cuisines = info.cuisines
    if (!Array.isArray(cuisines)) {
        res.status(400).json({ error: 'You must provide a valid list of cuisines' });
        return;
    }
    for (let element of cuisines) {
        if (typeof element !== 'string') {
            res.status(400).json({ error: 'You must provide a valid list of cuisines' });
            return;
        }
        if (element.trim === "") {
            res.status(400).json({ error: 'You must provide a valid list of cuisines' });
            return;
        }
    }

    // Service Options
    if (!info.serviceOptions) {
        res.status(400).json({ error: 'You must provide a valid object for service options' });
        return;
    }
    let serviceOptions = info.serviceOptions
    if (typeof serviceOptions !== 'object') {
        res.status(400).json({ error: 'You must provide a valid object for service options' });
        return;
    }
    if (serviceOptions === {}) {
        res.status(400).json({ error: 'You must provide a valid object for service options' });
        return;
    }
    for (let props in serviceOptions) {
        if (props !== "dineIn" && props !== "takeOut" && props !== "delivery") {
            res.status(400).json({ error: 'You must provide a valid object for service options' });
            return;
        }
        if (typeof (serviceOptions[props]) !== 'boolean') {
            res.status(400).json({ error: 'You must provide a valid object for service options' });
            return;
        }
    }
    try {
        await restaurantData.get(id);
    } catch (e) {
        res.status(404).json({ error: 'Restaurant not found' });
        return;
    }
    try {
        const restaurant = await restaurantData.update(id, name, location, phoneNumber, website, priceRange, cuisines, serviceOptions);
        res.json(restaurant);
    } catch (e) {
        res.sendStatus(500);
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
        res.status(400).json({ error: 'Invalid ID' });
        return;
    }
    try {
        await restaurantData.get(id);
    } catch (e) {
        res.status(404).json({ error: 'Restaurant not found' });
        return;
    }

    try {
        await restaurantData.remove(id);
        res.sendStatus(200);
        return { "restaurantId": "507f1f77bcf86cd799439011", "deleted": true }
    } catch (e) {
        res.sendStatus(500);
    }
});

module.exports = router;
