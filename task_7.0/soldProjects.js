
function SoldProjects() {
    this.soldProjectsArray = [];
}

SoldProjects.prototype.addProject = function (project) {
    this.soldProjectsArray.push(project);
}

module.exports = {
    SoldProjects,
}