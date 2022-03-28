const mongoCollections = require('../config/mongoCollections');
const restaurants = mongoCollections.restaurants;
let { ObjectId } = require('mongodb');

async function create(name, location, phoneNumber, website, priceRange, cuisines, overallRating, serviceOptions) {
    //Error Check

    // Name
    if (!name && name !== 0) {
        throw "Error: No Input"
    }
    if (typeof name !== 'string') {
        throw "Error: Not a string"
    }
    name = name.trim()
    if (name === "") {
        throw "Error: Whitespace"
    }

    // Location
    if (!location && location !== 0) {
        throw "Error: No Input"
    }
    if (typeof location !== 'string') {
        throw "Error: Not a string"
    }
    location = location.trim()
    if (location === "") {
        throw "Error: Whitespace"
    }

    // PhoneNumber
    if (!phoneNumber && phoneNumber !== 0) {
        throw "Error: No Input"
    }
    if (typeof phoneNumber !== 'string') {
        throw "Error: Not a string"
    }
    if (!/^\d{3}-\d{3}-\d{4}$/.test(phoneNumber)) {
        throw 'Error: Invalid Phone Number'
    }

    // Website
    if (!website && website !== 0) {
        throw "Error: No Input"
    }
    if (typeof website !== 'string') {
        throw "Error: Not a string"
    }
    website = website.trim()
    if (website === "") {
        throw "Error: Whitespace"
    }
    website = website.toLowerCase()
    if (website.substring(0, 10) !== "http://www" && website.substring(0, 11) !== "https://www") {
        throw "Error: Bad Site"
    }

    // PriceRange
    if (!priceRange && priceRange !== 0) {
        throw "Error: No Input"
    }
    if (typeof priceRange !== 'string') {
        throw "Error: Not a string"
    }
    let priceBool = true
    for (let i = 0; i <= 3; i++) {
        if (priceRange === "$".repeat(i)) {
            priceBool = false
        }
    }
    if (priceBool) throw "Error: Invalid Price Range"

    // Cuisines
    if (!cuisines && cuisines !== 0) {
        throw "Error: No Input"
    }
    if (!Array.isArray(cuisines)) {
        throw "Error: Not an Array"
    }
    for (let element of cuisines) {
        if (typeof element !== 'string') {
            throw "Error: Cuisine not string"
        }
    }

    // OverallRating
    if (!overallRating) {
        throw "Error: No Input"
    }
    if (typeof overallRating !== 'number') {
        throw 'Error: Not a Number';
    }
    if (isNaN(overallRating)) {
        throw 'Error: Not a Number';
    }
    if (overallRating > 5 || overallRating < 0) {
        throw "Error: Invalid Rating"
    }

    // ServiceOptions
    if (!serviceOptions && serviceOptions !== 0) {
        throw "Error: No Input"
    }
    if (typeof serviceOptions !== 'object') {
        throw 'Error: Not an object';
    }
    if (serviceOptions === {}) {
        throw 'Error: Empty Object Detected'
    }
    for (let props in serviceOptions) {
        if (typeof (serviceOptions[props]) !== 'boolean') {
            throw 'Error: Bad field in Object'
        }
    }

    //Check if exists
    const listofRestaurants = await getAll()
    for (let element of listofRestaurants) {
        if (element.name === name && element.phoneNumber === phoneNumber && element.location === location) {
            throw "Error: Cannot add duplicate restaurant"
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
        overallRating: overallRating,
        serviceOptions: serviceOptions
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

    const restaurantList = await restaurantCollection.find({}).toArray();

    return restaurantList;
}

async function get(id) {
    //Error Check
    if (!id && id !== 0) {
        throw "Error: No Input"
    }
    if (typeof id !== 'string') {
        throw 'Error: Not a String';
    }
    id = id.trim()
    if (id === "") {
        throw "Error: Empty id"
    }
    let parsedId = ""
    if (id.match(/^[0-9a-fA-F]{24}$/)) {
        parsedId = ObjectId(id)
    }
    else {
        throw "Error: Invalid ID"
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
        throw "Error: No Input for id"
    }
    if (typeof id !== 'string') {
        throw 'Error: Not a String';
    }
    id = id.trim()
    if (id === "") {
        throw "Error: Empty id"
    }
    let parsedId = ""
    if (id.match(/^[0-9a-fA-F]{24}$/)) {
        parsedId = ObjectId(id)
    }
    else {
        throw "Error: Invalid ID"
    }

    //Real Function
    const restaurantCollection = await restaurants();
    const deletionInfo = await restaurantCollection.deleteOne({ _id: parsedId });

    if (deletionInfo.deletedCount === 0) {
        throw `Could not delete restaurant with id of ${id}`;
    }
    return { deleted: true };
}

async function rename(id, newWebsite) {
    //Error Check
    if (!id && id !== 0) {
        throw "Error: No Input for id"
    }
    if (typeof id !== 'string') {
        throw 'Error: Not a String';
    }
    id = id.trim()
    if (id === "") {
        throw "Error: Empty id"
    }
    let parsedId = ""
    if (id.match(/^[0-9a-fA-F]{24}$/)) {
        parsedId = ObjectId(id)
    }
    else {
        throw "Error: Invalid ID"
    }
    // Website
    if (!newWebsite && newWebsite !== 0) {
        throw "Error: No Input"
    }
    if (typeof newWebsite !== 'string') {
        throw "Error: Not a string"
    }
    newWebsite = newWebsite.trim()
    if (newWebsite === "") {
        throw "Error: Whitespace"
    }
    newWebsite = newWebsite.toLowerCase()
    if (newWebsite.substring(0, 10) !== "http://www" && newWebsite.substring(0, 11) !== "https://www") {
        throw "Error: Bad Site"
    }
    //Real Function
    const curRestaurant = await get(id)
    const restaurantCollection = await restaurants();
    const updatedRestaurant = {
        name: curRestaurant.name,
        location: curRestaurant.location,
        phoneNumber: curRestaurant.phoneNumber,
        website: newWebsite,
        priceRange: curRestaurant.priceRange,
        cuisines: curRestaurant.cuisines,
        overallRating: curRestaurant.overallRating,
        serviceOptions: curRestaurant.serviceOptions
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
    rename
}
