// Необхідні змінні
let last_client_id = 0;
let clients_list = new Array();

// Клас - клієнт
class Client {

    // Конструктор класу
    constructor (name, id) {
    
        this.id = id;
        this.name = name;
      
        if (id === "" ||
            typeof id       === 'undefined') { this.id       = ++last_client_id;   }
        if (name === "" ||
            typeof name     === 'undefined') { this.name     = "Невідомий клієнт"; }
    }
}

// ...............................................................................................

// Додавання нового клієнта
function add_client (name, id) {

    let client = new Client(name, id);
    clients_list.push(client);

    return client;

}


// Видалити клієнта з колекції
function remove_client (id) {

    for (let z = 0; z < clients_list.length; z++) {

        let client = clients_list[z];
        if (client.id === id) {  clients_list.splice(z, 1);
                                 return 1; }

    }

    return -1;

}



// ...............................................................................................

// Повертаємо список усіх клієнтів
function get_clients_list () {

   return clients_list; 
}

// Задаємо список усіх клієнтів
function set_clients_list (data) 
    {

    if (!data || data.length < 1) { return; }

    for (let element of data) 
        {
            add_client(element.name,
                        element.id);
        }
    }


// Повертає клієнта по його id
function get_client_by_id (id) {

    let list =  clients_list;

    for (let z = 0; z < list.length; z++) {

        let client = list[z];
        if (client.id === id) { return client; }

    }

    return -1;

}

// ...............................................................................................

// Редагувати клієнта в колекції
function edit_client (id, new_name) {

    for (let z = 0; z < clients_list.length; z++) {

        let client = clients_list[z];

        if (client.id === id) {
                                client.name = new_name;
                                 return 1; }

    }

    return -1;

}

// ...............................................................................................

// Знайти клієнта в колекції
function find_clients (search) {

    let result = [];
    let list = clients_list;

    search = search.toLowerCase();

    for (let client of list) {

        let attributes = [ client.name,];

        for (let attr of attributes) {

            if (attr.toLowerCase().includes(search)) { result.push(client);
                                                       break;
            }
        }
    }

    return result;

}

// ...............................................................................................

// Вивести в консоль список клієнтів
function print_clients_list () {

    let type = "";
    let list = clients_list;

    console.log("\n" + "Список усіх " + type + "клієнтів:");

    for (let z = 0; z < list.length; z++) {

        let item = list[z];
        console.log("\t" + "П.І.Б. клієнта: " + item.name);
        console.log("\t" + "ID: "              + item.id);

    }
}