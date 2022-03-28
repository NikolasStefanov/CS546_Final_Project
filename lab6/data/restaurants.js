const mongoCollections = require('../config/mongoCollections');
const restaurants = mongoCollections.restaurants;
let { ObjectId } = require('mongodb');

async function create(name, location, phoneNumber, website, priceRange, cuisines, serviceOptions) {
    // Name
    if (!name) {
        throw "Error: You must provide a valid name";
    }
    if (typeof name !== 'string') {
        throw "Error: You must provide a valid name";
    }
    name = name.trim()
    if (name === "") {
        throw "Error: You must provide a valid name";
    }
    // Location
    if (!location) {
        throw "Error: You must provide a valid location";
    }
    if (typeof location !== 'string') {
        throw "Error: You must provide a valid location";
    }
    location = location.trim()
    if (location === "") {
        throw "Error: You must provide a valid location";
    }
    // Phone Number
    if (!phoneNumber) {
        throw "Error: You must provide a valid phone number"
    }
    phoneNumber = phoneNumber.trim()
    if (typeof phoneNumber !== 'string') {
        throw "Error: You must provide a valid phone number"
    }
    if (!/^\d{3}-\d{3}-\d{4}$/.test(phoneNumber)) {
        throw "Error: You must provide a valid phone number"
    }
    // Website
    if (!website) {
        throw "Error: You must provide a valid website"
    }
    website = website.trim()
    if (typeof website !== 'string') {
        throw "Error: You must provide a valid website"
    }
    website = website.trim()
    if (website === "") {
        throw "Error: You must provide a valid website"
    }
    website = website.toLowerCase()
    if (!(website.substring(0, 10) === "http://www" || website.substring(0, 11) === "https://www") && website.substring(website.length - 4) !== ".com") {
        throw "Error: You must provide a valid website"
    }

    // Price Range
    if (!priceRange) {
        throw "Error: You must provide a valid price range"
    }
    if (typeof priceRange !== 'string') {
        throw "Error: You must provide a valid price range"
    }
    let priceBool = true
    for (let i = 1; i <= 4; i++) {
        if (priceRange === "$".repeat(i)) {
            priceBool = false
        }
    }
    if (priceBool) {
        throw "Error: You must provide a valid price range"
    }

    // Cuisines
    if (!cuisines) {
        throw "Error: You must provide a valid list of cuisines"
    }
    if (!Array.isArray(cuisines)) {
        throw "Error: You must provide a valid list of cuisines"
    }
    for (let element of cuisines) {
        if (typeof element !== 'string') {
            throw "Error: You must provide a valid list of cuisines"
        }
        if (element.trim === "") {
            throw "Error: You must provide a valid list of cuisines"
        }
    }

    // Service Options
    if (!serviceOptions) {
        throw "Error: You must provide a valid object for service options"
    }
    if (typeof serviceOptions !== 'object') {
        throw "Error: You must provide a valid object for service options"
    }
    if (serviceOptions === {}) {
        throw "Error: You must provide a valid object for service options"
    }
    for (let props in serviceOptions) {
        if (props !== "dineIn" && props !== "takeOut" && props !== "delivery") {
            throw "Error: You must provide a valid object for service options"
        }
        if (typeof (serviceOptions[props]) !== 'boolean') {
            throw "Error: You must provide a valid object for service options"
        }
    }
    //Real Function
    let newRestaurant = {
        name: name,
        location: location,
        phoneNumber: phoneNumber,
        website: website,
        priceRange: priceRange,
        cuisines: cuisines,
        overallRating: 0,
        serviceOptions: serviceOptions,
        reviews: []
    };
    const restaurantCollection = await restaurants();
    const restaurantInfo = await restaurantCollection.insertOne(newRestaurant);
    if (restaurantInfo.insertedCount === 0) {
        throw 'Could not add restaurant';
    }
    const newId = restaurantInfo.insertedId;
    const restaurant = await get(newId.toString());
    return restaurant;
}

async function getAll() {
    //Real Function
    const restaurantCollection = await restaurants();

    const restaurantList = await restaurantCollection.find({}, { projection: { _id: 1, name: 1 } }).toArray();

    return restaurantList;
}

async function get(id) {
    //Error Check
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
    let parsedId = ""
    if (id.match(/^[0-9a-fA-F]{24}$/)) {
        parsedId = ObjectId(id)
    }
    else {
        res.status(400).json({ error: 'Invalid ID' });
        return;
    }
    //Real Function
    const restaurantCollection = await restaurants();
    const restaurant = await restaurantCollection.findOne({ _id: parsedId });
    if (restaurant === null) throw 'Error: No restaurant with that id';
    return restaurant;
}

async function remove(id) {
    //Error Check
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
    let parsedId = ""
    if (id.match(/^[0-9a-fA-F]{24}$/)) {
        parsedId = ObjectId(id)
    }
    else {
        res.status(400).json({ error: 'Invalid ID' });
        return;
    }

    //Real Function
    const restaurantCollection = await restaurants();
    const deletionInfo = await restaurantCollection.deleteOne({ _id: parsedId });

    if (deletionInfo.deletedCount === 0) {
        throw `Could not delete restaurant with id of ${parsedId}`;
    }
    return { deleted: true };
}

async function update(id, name, location, phoneNumber, website, priceRange, cuisines, serviceOptions) {

    //id
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
    let parsedId = ""
    if (id.match(/^[0-9a-fA-F]{24}$/)) {
        parsedId = ObjectId(id)
    }
    else {
        res.status(400).json({ error: 'Invalid ID' });
        return;
    }

    // Name
    if (!name) {
        throw "Error: You must provide a valid name";
    }
    if (typeof name !== 'string') {
        throw "Error: You must provide a valid name";
    }
    name = name.trim()
    if (name === "") {
        throw "Error: You must provide a valid name";
    }

    // Location
    if (!location) {
        throw "Error: You must provide a valid location";
    }
    if (typeof location !== 'string') {
        throw "Error: You must provide a valid location";
    }
    location = location.trim()
    if (location === "") {
        throw "Error: You must provide a valid location";
    }

    // Phone Number
    if (!phoneNumber) {
        throw "Error: You must provide a valid phone number"
    }
    phoneNumber = phoneNumber.trim()
    if (typeof phoneNumber !== 'string') {
        throw "Error: You must provide a valid phone number"
    }
    if (!/^\d{3}-\d{3}-\d{4}$/.test(phoneNumber)) {
        throw "Error: You must provide a valid phone number"
    }

    // Website
    if (!website) {
        throw "Error: You must provide a valid website"
    }
    website = website.trim()
    if (typeof website !== 'string') {
        throw "Error: You must provide a valid website"
    }
    website = website.trim()
    if (website === "") {
        throw "Error: You must provide a valid website"
    }
    website = website.toLowerCase()
    if (!(website.substring(0, 10) === "http://www" || website.substring(0, 11) === "https://www") && website.substring(website.length - 4) !== ".com") {
        throw "Error: You must provide a valid website"
    }

    // Price Range
    if (!priceRange) {
        throw "Error: You must provide a valid price range"
    }
    if (typeof priceRange !== 'string') {
        throw "Error: You must provide a valid price range"
    }
    let priceBool = true
    for (let i = 1; i <= 4; i++) {
        if (priceRange === "$".repeat(i)) {
            priceBool = false
        }
    }
    if (priceBool) {
        throw "Error: You must provide a valid price range"
    }

    // Cuisines
    if (!cuisines) {
        throw "Error: You must provide a valid list of cuisines"
    }
    if (!Array.isArray(cuisines)) {
        throw "Error: You must provide a valid list of cuisines"
    }
    for (let element of cuisines) {
        if (typeof element !== 'string') {
            throw "Error: You must provide a valid list of cuisines"
        }
        if (element.trim === "") {
            throw "Error: You must provide a valid list of cuisines"
        }
    }

    // Service Options
    if (!serviceOptions) {
        throw "Error: You must provide a valid object for service options"
    }
    if (typeof serviceOptions !== 'object') {
        throw "Error: You must provide a valid object for service options"
    }
    if (serviceOptions === {}) {
        throw "Error: You must provide a valid object for service options"
    }
    for (let props in serviceOptions) {
        if (props !== "dineIn" && props !== "takeOut" && props !== "delivery") {
            throw "Error: You must provide a valid object for service options"
        }
        if (typeof (serviceOptions[props]) !== 'boolean') {
            throw "Error: You must provide a valid object for service options"
        }
    }

    //Real Function
    const restaurantCollection = await restaurants();
    const restaurant = await restaurantCollection.findOne({ _id: parsedId });
    if (restaurant === null) throw 'Error: No restaurant with that id';
    const updatedRestaurant = {
        _id: parsedId,
        name: name,
        location: location,
        phoneNumber: phoneNumber,
        website: website,
        priceRange: priceRange,
        cuisines: cuisines,
        overallRating: restaurant.overallRating,
        serviceOptions: serviceOptions,
        reviews: restaurant.reviews
    };
    const updatedInfo = await restaurantCollection.replaceOne(
        { _id: parsedId },
        updatedRestaurant
    );
    if (updatedInfo.modifiedCount === 0) {
        throw 'Error: Could not update restraurant successfully';
    }
    return updatedRestaurant
}

module.exports = {
    create,
    getAll,
    get,
    remove,
    update
}

