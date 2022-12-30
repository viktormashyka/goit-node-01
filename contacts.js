const fs = require("fs/promises");
const path = require("path");
const { nanoid } = require("nanoid");

// Розкоментуйте і запиши значення
// const contactsPath = path.resolve(__dirname, "contacts.json");
const contactsPath = path.resolve("./db/contacts.json");

// TODO: задокументувати кожну функцію

async function readContacts() {
  const contactsRaw = await fs.readFile(contactsPath, { encoding: "utf8" });
  const contacts = JSON.parse(contactsRaw);
  //   console.log("contacts: ", contacts);
  return contacts;
}

async function writeContacts(contacts) {
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
}

async function listContacts({ limit }) {
  const contacts = await readContacts();
  return contacts.slice(-limit || 0);
}

async function getContactById(id) {
  const contacts = await readContacts();
  const contactById = contacts.find((contact) => contact.id === id);
  return contactById;
}

async function removeContact(id) {
  const contacts = await readContacts();
  const updateContacts = contacts.filter((contact) => contact.id !== id);
  await writeContacts(updateContacts);
}

async function addContact(name, email, phone) {
  const id = nanoid();
  const newContact = { id, name, email, phone };
  const contacts = await readContacts();
  contacts.push(newContact);

  await writeContacts(contacts);
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
