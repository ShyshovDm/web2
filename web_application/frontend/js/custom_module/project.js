// Необхідні змінні
let last_project_id = 0;
let projects_list = new Array();

// Клас - проект
class Project {

    constructor (name, client, executor, id) {
    
        this.id = id;
        this.name = name;
        this.executor = executor;
        this.executor = client;
        if (id === "" ||
            typeof id       === 'undefined') { this.id       = ++last_project_id;  }
        if (name === "" ||
            typeof name     === 'undefined') { this.name     = "Невідомий проект"; }
        if (executor === "" ||
            typeof executor     === 'undefined') { this.executor     = "Невідомий виконавець"; }
        if (client === "" ||
            typeof client     === 'undefined') { this.client     = "Невідомий клієнт"; }

    
    }
}

// ...............................................................................................

// Додавання нового проекта
function add_project (name, client, executor, id) {

    let project = new Project(name, client, executor, id);
    projects_list.push(project);

    return project;

}

// Видалити проект з колекції
function remove_project (id) {

    for (let z = 0; z < projects_list.length; z++) {

        let project = projects_list[z];
        if (project.id === id) { projects_list.splice(z, 1);
                                return 1; }

    }

    return -1;

}

// ...............................................................................................

// Повертаємо список усіх проектів
function get_projects_list()
    { return projects_list; }

// Задаємо список усіх проектів
function set_projects_list (data) {

    if (!data || data.length < 1) { return; }

    for (let element of data) {
        add_project(element.name,
                    element.client,
                    element.executor,
                    element.id);
    }
}

// Повертає проект по його id
function get_project_by_id (id) {

    for (let z = 0; z < projects_list.length; z++) {

        let project = projects_list[z];
        if (project.id === id) { return project; }

    }

    return -1;

}

// ...............................................................................................

// Редагувати проекта в колекції
function edit_project (id, new_name, new_client, new_executor) {

    for (let z = 0; z < projects_list.length; z++) {

        let project = projects_list[z];

        if (project.id === id) {  project.name = new_name;
                                    project.client = new_client;
                                    project.executor = new_executor;
                                return 1; }

    }

    return -1;

}

// ...............................................................................................

// Знайти проекта в колекції
function find_projects (search) {

    let result = [];
    search = search.toLowerCase();

    for (let project of projects_list) {

        let attributes = [ project.name,
                            project.executor ];

        for (let attr of attributes) {

            if (attr.toLowerCase().includes(search)) { result.push(project);
                                                       break;
            }
        }
    }
    return result;
}

// ...............................................................................................

// Вивести в консоль список проектів
function print_projects_list() {

    console.log("\n" + "Список усіх проектів:");

    for (let z = 0; z < projects_list.length; z++) {

        let project = projects_list[z];
        console.log("\t" + "Назва проекта: " + project.name);
        console.log("\t" + "Клієнт: " + project.client);
        console.log("\t" + "Виконавець: " + project.executor);
        console.log("\t" + "ID: "            + project.id);

    }
}