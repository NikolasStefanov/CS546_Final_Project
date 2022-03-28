const restaurants = require("./data/restaurants");
const connection = require('./config/mongoConnection');
let { ObjectId } = require('mongodb');

async function main() {
    // Create a restaurant of your choice.
    const bigHouse = await restaurants.create(
        "The Big House", "NYC, New York", "555-424-2424", "http://www.thebighouse.com", "$$$",
        ["Italian"], 5, { dineIn: true, takeOut: false, delivery: false });

    console.log(await restaurants.get(bigHouse._id.toString())); // Log the newly created restaurant. (Just that restaurant, not all restaurants)

    // Create another restaurant of your choice.
    const fusionRoom = await restaurants.create(
        "The Fusion Room", "Chicago, Illinois", "555-123-8950",
        "http://www.fusionroom.com", "$", ["Cuban", "American", "Asian", "Italian"], 2,
        { dineIn: true, takeOut: true, delivery: false });

    // Query all restaurants, and log them all
    const listofRestaurants = await restaurants.getAll()
    console.log(listofRestaurants)

    // Create the 3rd restaurant of your choice.
    const pizzaPalace = await restaurants.create(
        "The Pizza Palace", "Brooklyn, New York", "800-222-4196",
        "http://www.zazapalace.com", "$$", ["Pizza"], 4,
        { dineIn: true, takeOut: true, delivery: true });

    console.log(await restaurants.get(pizzaPalace._id.toString())) // Log the newly created 3rd restaurant. (Just that restaurant, not all restaurants)

    await restaurants.rename(bigHouse._id.toString(), "https://www.hoot.com") // Rename the first restaurant website

    console.log(await restaurants.get(bigHouse._id.toString())) // Log the first restaurant with the updated website. 

    // Remove the second restaurant you created.
    await restaurants.remove(fusionRoom._id.toString())

    //Query all restaurants, and log them all
    const listofRestaurants2 = await restaurants.getAll()
    console.log(listofRestaurants2)

    // Try to create a restaurant with bad input parameters to make sure it throws errors.
    try {
        const badLounge = await restaurants.create(
            "Top Thai", "NYC, New York", "555-424-2424", "thebighouse.com", "$$$",
            [42, 82], 7, { dineIn: true, takeOut: false, delivery: false });
        console.log(badLounge)
    }
    catch (e) {
        console.log(e)
    }

    // Try to remove a restaurant that does not exist to make sure it throws errors.
    try {
        const badLounge2 = await restaurants.remove(ObjectId().toString())
        console.log(badLounge2)
    }
    catch (e) {
        console.log(e)
    }

    // Try to rename a restaurant that does not exist to make sure it throws errors.
    try {
        const badCall = await restaurants.rename(ObjectId().toString(), "https://www.back.com")
        console.log(badCall)
    }
    catch (e) {
        console.log(e)
    }

    // Try to rename a restaurant passing in invalid data for the parameter to make sure it throws errors.
    try {
        const badCall2 = await restaurants.rename(bigHouse._id.toString(), 42)
        console.log(badCall2)
    }
    catch (e) {
        console.log(e)
    }

    // Try getting a restaurant by ID that does not exist to make sure it throws errors. 
    try {
        const badCall3 = await restaurants.get(ObjectId().toString())
        console.log(badCall3)
    }
    catch (e) {
        console.log(e)
    }

    // Close the connection
    const db = await connection();
    await db.serverConfig.close();
}

main().catch(
    async (error) => {
        console.log(error);
        const db = await connection();
        await db.serverConfig.close();
    });
