
function Client(id, name) {
    this.id = id;
    this.name = name;
    this.projects = [];
}

Client.prototype.getProjects = function () {
    return this.projects;
}

Client.prototype.addProject = function (project) {
    this.projects.push(project);
}

module.exports = {
    Client,
}