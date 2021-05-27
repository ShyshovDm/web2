// Необхідні константи
const use_db = is_db_used();
const server_port = get_server_port();
const server_url = `http://localhost:${server_port}`;

// Перевірка, чи використовувати базу даних
// Якщо ні, то буде використовуватися localStorage
function is_db_used()
   { return $("head").attr("use_db"); }

// Метод повертає порт, який використовується для запуску сервера
function get_server_port()
   { return $("head").attr("server_port"); }

// ...............................................................................................

// Отримання даних із сервера
async function server_GET (req) {

   try {
      
   const res = await fetch(server_url + req,
                           { method: "GET",
                             headers: { "Accept": "application/json" } });

   if (res.ok) { return res.json(); }
   else { throw new Error(); }

   }

   catch (error) {
      
      if (error instanceof TypeError) {

         modal_confirm_create(
            "Помилка",
            "Не вдалося підключитися до сервера за адресою: " + server_url,
            "Зрозуміло",
            "Відміна"
         );

         $(`#modal_confirm`).modal('show');
         console.log(error);

      }

      else {

         modal_confirm_create(
            "Помилка",
            "Не вдалося отримати інформацію з бази даних",
            "Зрозуміло",
            "Відміна"
         );

         $(`#modal_confirm`).modal('show');
         console.log(error);

      }
   }
}

// Оновлення даних на сервері
async function server_PUT (req, array) {

   try {
   
   let collection;

   switch (req) {
      case "/set_executors":      collection = 1; break;
      case "/set_projects":        collection = 2; break;
      case "/set_clients":       collection = 3; break;
      case "/set_identificators": collection = 5; break;
   }
   
   const res = await fetch(server_url + req,
                           { method: "PUT",
                             headers: { "Accept": "application/json",
                                        "Content-Type": "application/json" },
                             body: JSON.stringify({ array: array,
                                                    collection: collection }) }
                             );
   
   if (res.ok) { return res.json(); }
   else { throw new Error(); }
   
   }

   catch (error) {
      
      if (error instanceof TypeError) {

         modal_confirm_create(
            "Помилка",
            "Не вдалося підключитися до сервера за адресою: " + server_url,
            "Зрозуміло",
            "Відміна"
         );

         $(`#modal_confirm`).modal('show');
         console.log(error);

      }

      else {

         modal_confirm_create(
            "Помилка",
            "Не вдалося оновити інформацію у базі даних",
            "Зрозуміло",
            "Відміна"
         );

         $(`#modal_confirm`).modal('show');
         console.log(error);

      }
   }
}

// ...............................................................................................

// Зберігання даних
function save_data() {

   if (use_db === "true") { save_data_in_data_base();     }
   else                   { save_data_in_local_storage(); }

}

// Зберігання даних у localStorage
function save_data_in_local_storage() {

   let target = location.pathname.substring(1);

   switch (target) {

      case "executors":
         localStorage.setItem('executors', JSON.stringify(get_executors_list()));
         break;

      case "projects":
         localStorage.setItem('projects', JSON.stringify(get_projects_list()));
         break;

      case "clients":
         localStorage.setItem('clients', JSON.stringify(get_clients_list()));
         break;

   }

   let identificators = [{ "name":"last_executor_id","value":last_executor_id },
                         { "name":"last_project_id",  "value":last_project_id   },
                         { "name":"last_client_id", "value":last_client_id  }];

   localStorage.setItem('identificators', JSON.stringify(identificators));

}

// Зберігання даних у базу даних
function save_data_in_data_base() {

   let target = location.pathname.substring(1);

   switch (target) {

      case "executors":
         server_PUT("/set_executors", get_executors_list());
         break;

      case "projects":
         server_PUT("/set_projects", get_projects_list());
         break;

      case "clients":
         server_PUT("/set_clients", get_clients_list());
         break;
   }

   let identificators = [{ "name":"last_executor_id","value":last_executor_id },
                         { "name":"last_project_id",  "value":last_project_id   },
                         { "name":"last_client_id", "value":last_client_id  }];

   server_PUT("/set_identificators", identificators);

}

// ...............................................................................................

// Завантаження даних
async function load_data() {

   if (use_db === "true") { await load_data_from_data_base();     }
   else                   { await load_data_from_local_storage(); }

}

// Завантаження даних з localStorage
async function load_data_from_local_storage() {

   let item;
   let target = location.pathname.substring(1);

   switch (target) {

      case "executors":
         item = JSON.parse(localStorage.getItem("executors"));
         set_executors_list(item ? item : []);
         break;

      case "projects":
         item = JSON.parse(localStorage.getItem("projects"));
         set_projects_list(item ? item : []);
         break;

      case "clients":
         item = JSON.parse(localStorage.getItem("clients"));
         set_clients_list(item ? item : []);
         break;
   }

   let identificators = JSON.parse(localStorage.getItem("identificators"));
   if (!identificators) { identificators = []; }

   for (let item of identificators) {
      if (item.name === "last_executor_id") { last_executor_id = item.value; }
      if (item.name === "last_project_id")   { last_project_id   = item.value; }
      if (item.name === "last_client_id")  { last_client_id  = item.value; }
   }
}

// Завантаження даних з бази даних
async function load_data_from_data_base() {

   let target = location.pathname.substring(1);

   switch (target) {

      case "executors":
         await server_GET("/get_executors").then((res) =>
            { set_executors_list(res); });
         break;

      case "projects":
         await server_GET("/get_projects").then((res) =>
            { set_projects_list(res); });
         break;

      case "clients":
         await server_GET("/get_clients").then((res) =>
            { set_clients_list(res); });
         break;
   }

   await server_GET("/get_last_executor_id").then((res) =>
      { if (res && res.length > 0) { last_executor_id = res[0].value; }});

   await server_GET("/get_last_project_id").then((res) =>
      { if (res && res.length > 0) { last_project_id = res[0].value; }});

   await server_GET("/get_last_client_id").then((res) =>
      { if (res && res.length > 0) { last_client_id = res[0].value; }});

}

// Отримання даних
async function get_data (data) {

   if (use_db === "true") { return await get_data_from_data_base(data);     }
   else                   { return await get_data_from_local_storage(data); }

}

// Отримання даних з localStorage
async function get_data_from_local_storage (data) {
   
   try           { return JSON.parse(localStorage.getItem(data)); }
   catch (error) { return [];                                     }

}


// Отримання даних з бази даних
async function get_data_from_data_base (data) {

   try           { return await server_GET(`/get_${data}`); }
   catch (error) { return [];                               }

}