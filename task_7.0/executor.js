
function Executor(id, name) {
    this.id = id;
    this.name = name;
    this.projects = [];
}

Executor.prototype.getProjects = function () {
    return this.projects;
}

Executor.prototype.addProject = function (project) {
    this.projects.push(project);
}

module.exports = {
    Executor,
}