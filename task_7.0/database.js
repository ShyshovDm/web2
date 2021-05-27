const {Project} = require("./project");

function Database() {
    this.clientsArray = [];
    this.executorsArray = [];
    this.projectsArray = [];
}

Database.prototype.getExecutorProjects = function (executorId) {
    if (!executorId) return;
    const found = findInArrayById(executorId, this.executorsArray);
    if (!found) {
        console.log("No executors with such id!");
    } else {
        return found.getProjects();
    }
}

Database.prototype.getClientProjects = function (clientId) {
    if (!clientId) return;
    const found = findInArrayById(clientId, this.clientsArray);
    if (!found) {
        console.log("No clients with such id!");
    } else {
        return found.getProjects();
    }
}

//----------------------------------------------------------------------

Database.prototype.addClient = function (client) {
    if (!client) return;
    addObjectToArray(client, this.clientsArray);
    console.log("Client was added successfully");
    console.log(client);
}

Database.prototype.addExecutor = function (executor) {
    if (!executor) return;
    addObjectToArray(executor, this.executorsArray);
    console.log("Executor was added successfully");
    console.log(executor);
}

Database.prototype.addProject = function (id, name, clientId, executorId) {
    if (!name || !clientId || !executorId) return;

    const executor = findInArrayById(executorId, this.executorsArray);
    const client = findInArrayById(clientId, this.clientsArray);
    if (!executor || !client) return;

    const project = new Project(id, name);
    executor.addProject(project);
    client.addProject(project);

    addObjectToArray(project, this.projectsArray);
    console.log("Project was added successfully");
    console.log(project);
}

//----------------------------------------------------------------------

Database.prototype.updateClient = function (id, name) {
    if (typeof id !== "number" || id <= 0) return;

    const found = findInArrayById(id, this.clientsArray)

    if (!found) {
        console.log("No clients with such id!");
    } else {
        found.name = name;
        console.log("Client was updated!");
        console.log(found);
    }
}

Database.prototype.updateExecutor = function (id, name) {
    if (typeof id !== "number" || id <= 0) return;

    const found = findInArrayById(id, this.executorsArray)

    if (!found) {
        console.log("No executors with such id!");
    } else {
        found.name = name;
        console.log("Executor was updated!");
        console.log(found);
    }
}

Database.prototype.updateProject = function (id, name) {
    if (typeof id !== "number" || id <= 0) return;

    const found = findInArrayById(id, this.projectsArray)

    if (!found) {
        console.log("No projects with such id!");
    } else {
        found.name = name;
        console.log("Project was updated!");
        console.log(found);
    }
}

//----------------------------------------------------------------------

Database.prototype.deleteClient = function (id) {
    if (typeof id !== "number" || id <= 0) return;

    const deleted = deleteFromArrayById(id, this.clientsArray);

    if (deleted) {
        console.log("Client was deleted");
        console.log(deleted);
    } else {
        console.log("No clients with such id!");
    }
}

Database.prototype.deleteExecutor = function (id) {
    if (typeof id !== "number" || id <= 0) return;

    const deleted = deleteFromArrayById(id, this.executorsArray);

    if (deleted) {
        console.log("Executor was deleted");
        console.log(deleted);
    } else {
        console.log("No executors with such id!");
    }
}

Database.prototype.deleteProject = function (id) {
    if (typeof id !== "number" || id <= 0) return;

    const deleted = deleteFromArrayById(id, this.projectsArray);
    deleted.client = null;
    deleted.executor = null;

    if (deleted) {
        console.log("Project was deleted");
        console.log(deleted);
    } else {
        console.log("No projects with such id!");
    }
}

//----------------------------------------------------------------------

// private helper methods
function addObjectToArray(object, array) {
    let found = array.find(value => value.id === object.id);
    if (found)
        array[array.indexOf(object)] = object;
    else
        array.push(object);
}

function deleteFromArrayById(id, array) {
    const objectToDelete = array.find(value => value.id === id);

    if (objectToDelete) {
        array.splice(array.indexOf(objectToDelete), 1);
    }

    return objectToDelete;
}

function findInArrayById(id, array) {
    return array.find(value => value.id === id);
}

//----------------------------------------------------------------------

module.exports = {
    Database,
}