const people = require("./people");
const stocks = require("./stocks");
const util = require('util')

async function mainPeople() {
    try {
        const answer = await people.getPersonById("0e7f90f8-c817-476b-a427-1f51bee49c46")
        console.log(answer);
    } catch (e) {
        console.log(e);
    }
    try {
        const answer = await people.sameStreet("Oak", "Avenue")
        console.log(answer);
    } catch (e) {
        console.log(e);
    }
    try {
        const answer = await people.manipulateSsn()
        console.log(answer);
    } catch (e) {
        console.log(e);
    }
    try {
        const answer = await people.sameBirthday(08, 22);
        console.log(answer);
    } catch (e) {
        console.log(e);
    }
}

async function mainStocks() {
    // try {
    //     const stockdata = await stocks.listShareholders();
    //     console.log(stockdata);
    // } catch (e) {
    //     console.log(e);
    // }
    try {
        const stockdata = await stocks.topShareholder("Catalyst Pharmaceuticals, Inc.");
        console.log(stockdata);
    } catch (e) {
        console.log(e);
    }
    try {
        const stockdata = await stocks.listStocks("Hagan", "Poschel");
        console.log(stockdata);
    } catch (e) {
        console.log(e);
    }
    try {
        const stockdata = await stocks.getStockById("2fdd4550-d2ac-4d43-ab3d-b133a4727184");
        console.log(stockdata);
    } catch (e) {
        console.log(e);
    }
}

//call main
mainPeople();
mainStocks();
