const fs = require("fs").promises;
const path = require("path");

const contactsPath = fs.readFile("./db/contacts.json");

const function readFile(params) {
    fs.readFile('./db/contacts.json')
}
