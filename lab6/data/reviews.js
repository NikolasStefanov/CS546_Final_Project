const mongoCollections = require('../config/mongoCollections');
const restaurants = mongoCollections.restaurants;
let { ObjectId } = require('mongodb');

async function create(id, title, reviewer, rating, dateOfReview, review) {
    //id
    if (!id && id !== 0) {
        throw "Error: No Input"
    }
    if (typeof id !== 'string') {
        throw "Error: Bad ID"
    }
    id = id.trim()
    if (id === "") {
        throw "Error: Bad ID"
    }
    let parsedId = ""
    if (id.match(/^[0-9a-fA-F]{24}$/)) {
        parsedId = ObjectId(id)
    }
    else {
        throw "Error: Bad ID"
    }
    // Title
    if (!title) {
        throw "Error: Bad Title"
    }
    if (typeof title !== 'string') {
        throw "Error: Bad Title"
    }
    title = title.trim()
    if (title === "") {
        throw "Error: Bad Title"
    }
    // Reviewer
    if (!reviewer) {
        throw "Error: Bad Reviewer"
    }
    if (typeof reviewer !== 'string') {
        throw "Error: Bad Reviewer"
    }
    reviewer = reviewer.trim()
    if (reviewer === "") {
        throw "Error: Bad Reviewer"
    }
    // Rating
    if (!rating) {
        throw "Error: Bad Rating"
    }
    if (typeof rating !== 'number') {
        throw "Error: Bad Rating"
    }
    if (rating > 5 || rating < 0) {
        throw "Error: Bad Rating"
    }
    // Date
    if (!dateOfReview) {
        throw "Error: Bad dateOfReview"
    }
    if (typeof dateOfReview !== 'string') {
        throw "Error: Bad dateOfReview"
    }
    dateOfReview = dateOfReview.trim()
    if (dateOfReview === "") {
        throw "Error: Bad dateOfReview"
    }
    if (!/^\d{2}\/\d{2}\/\d{4}$/.test(dateOfReview)) {
        throw "Error: Bad dateOfReview"
    }
    // Review
    if (!review) {
        throw "Error: Bad review"
    }
    if (typeof review !== 'string') {
        throw "Error: Bad review"
    }
    let review1 = review.trim()
    if (review1 === "") {
        throw "Error: Bad review"
    }
    const restaurantCollection = await restaurants();
    const curRestaurant = await restaurantCollection.findOne({ _id: parsedId });
    if (curRestaurant === null) throw 'Error: No restaurant with that id';

    let newID = new ObjectId;

    let newReview = {
        _id: newID,
        title: title,
        reviewer: reviewer,
        rating: rating,
        dateOfReview: dateOfReview,
        review: review1
    }

    let reviewArr = curRestaurant.reviews
    reviewArr.push(newReview)
    let total = 0
    for (let rev of reviewArr) {
        total = total + rev.rating
    }
    let average = total / (reviewArr.length)
    if (average % 1 !== 0) {
        average = parseFloat((Math.round(average * 100) / 100).toFixed(2));
    }

    const updatedRestaurant = {
        name: curRestaurant.name,
        location: curRestaurant.location,
        phoneNumber: curRestaurant.phoneNumber,
        website: curRestaurant.website,
        priceRange: curRestaurant.priceRange,
        cuisines: curRestaurant.cuisines,
        overallRating: average,
        serviceOptions: curRestaurant.serviceOptions,
        reviews: reviewArr
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

async function getRestaurant(id) {
    if (!id && id !== 0) {
        throw "Error: Invalid ID"
    }
    if (typeof id !== 'string') {
        throw "Error: Invalid ID"
    }
    id = id.trim()
    if (id === "") {
        throw "Error: Invalid ID"
    }
    let parsedId = ""
    if (id.match(/^[0-9a-fA-F]{24}$/)) {
        parsedId = ObjectId(id)
    }
    else {
        throw "Error: Invalid ID"
    }
    const restaurantCollection = await restaurants();
    const restaurant = await restaurantCollection.findOne({ _id: parsedId });
    if (restaurant === null) throw 'Error: No restaurant with that id';
    return restaurant.reviews
}

async function getReview(id) {
    if (!id) {
        throw "Error: Invalid ID";
    }
    if (typeof id !== 'string') {
        throw "Error: Invalid ID"
    }
    id = id.trim()
    if (id === "") {
        throw "Error: Invalid ID"
    }
    let parsedId = ""
    if (id.match(/^[0-9a-fA-F]{24}$/)) {
        parsedId = ObjectId(id)
    }
    else {
        throw "Error: Invalid ID"
    }
    const restaurantCollection = await restaurants();
    let bool = false
    let retReview = {}
    const restaurantList = await restaurantCollection.find({}).toArray()
    for (let restaurant of restaurantList) {
        for (let review of restaurant.reviews) {
            if (review._id.toString() === parsedId.toString()) {
                retReview = review
                bool = true
            }
        }
    }
    if (!bool) {
        throw "Error: Not found"
    }
    return retReview
}

async function remove(id) {
    if (!id && id !== 0) {
        throw "Error: Invalid ID"
    }
    if (typeof id !== 'string') {
        throw "Error: Invalid ID"
    }
    id = id.trim()
    if (id === "") {
        throw "Error: Invalid ID"
    }
    let reviewId = ""
    if (id.match(/^[0-9a-fA-F]{24}$/)) {
        reviewId = ObjectId(id)
    }
    else {
        throw "Error: Invalid ID"
    }

    const restaurantCollection = await restaurants();
    let bool = false
    let retRestaurant = 0
    const restaurantList = await restaurantCollection.find({}).toArray()
    for (let restaurant of restaurantList) {
        for (let review of restaurant.reviews) {
            if (review._id.toString() === reviewId.toString()) {
                bool = true
                retRestaurant = restaurant
            }
        }
    }
    if (!bool) {
        throw "Error: Not found"
    }
    const theRestaurant = await restaurantCollection.findOne({ _id: retRestaurant._id });
    let reviewArr = theRestaurant.reviews
    let count = 0
    for (let element of reviewArr) {
        if (element._id.toString() === reviewId.toString()) {
            break
        }
        count = count + 1
    }
    reviewArr.splice(count, 1);
    let total = 0
    for (let rev of reviewArr) {
        total = total + rev.rating
    }
    let average = total / (reviewArr.length)
    if (average % 1 !== 0) {
        average = parseFloat((Math.round(average * 100) / 100).toFixed(2));
    }
    const updatedRestaurant = {
        name: theRestaurant.name,
        location: theRestaurant.location,
        phoneNumber: theRestaurant.phoneNumber,
        website: theRestaurant.website,
        priceRange: theRestaurant.priceRange,
        cuisines: theRestaurant.cuisines,
        overallRating: average,
        serviceOptions: theRestaurant.serviceOptions,
        reviews: reviewArr
    };
    const updatedInfo = await restaurantCollection.replaceOne(
        { _id: retRestaurant._id },
        updatedRestaurant
    );
    if (updatedInfo.modifiedCount === 0) {
        throw 'Error: Could not update restraurant successfully';
    }
    return { "reviewId": reviewId, "deleted": true }
}

module.exports = {
    create,
    getRestaurant,
    getReview,
    remove
}