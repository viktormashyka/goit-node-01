const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
} = require("./contacts");

// TODO: рефакторить
const { Command } = require("commander");
const program = new Command();
program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone")
  .option("-l, --limit <limit>");

program.parse(process.argv);

const argv = program.opts();

// TODO: рефакторить
async function invokeAction({ action, id, name, email, phone, limit }) {
  switch (action) {
    case "list":
      console.log("invoke list");
      const contacts = await listContacts({ limit });
      console.table(contacts);
      break;

    case "get":
      console.log("invoke get");
      await getContactById(id);
      break;

    case "add":
      console.log("invoke add", name, email, phone);
      await addContact(name, email, phone);
      break;

    case "remove":
      console.log("invoke remove");
      await removeContact(id);
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(argv);

// # Отримуємо і виводимо весь список контактів у вигляді таблиці (console.table)
// node index.js --action="list"

// # Отримуємо контакт по id
// node index.js --action="get" --id=5

// # Додаємо контакт
// node index.js --action="add" --name="Mango" --email="mango@gmail.com" --phone="322-22-22"

// # Видаляємо контакт
// node index.js --action="remove" --id=3
