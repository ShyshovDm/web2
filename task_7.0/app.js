const {Database} = require("./database");
const {Client} = require('./client')
const {Executor} = require("./executor");

const db = new Database();

console.log("**************************************");

db.addClient(new Client(1, "Vlad"));
db.addClient(new Client(2, "Igor"));
db.addClient(new Client(3, "Den"));

db.addExecutor(new Executor(15, "Oksa"));
db.addExecutor(new Executor(23, "Nata"));

console.log("**************************************");

db.updateClient(1, "VladySlave");
db.updateExecutor(23, "Natalon");
db.deleteClient(2);

console.log("**************************************");

db.addProject(443, "Starwars Merch", 1, 15);
db.addProject(443, "LOTR Merch", 3, 15);
db.addProject(555, "Square wheel", 1, 23);

db.updateProject(555, "Circle wheel");

console.log("**************************************");

console.log(db.getExecutorProjects(15));
console.log(db.getClientProjects(1));

console.log("**************************************");

db.deleteProject(555);
