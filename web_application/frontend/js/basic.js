// Необхідні змінні
let search = "";
let divider = `<li><hr class="dropdown-divider"></li>`;

// Створення нового елемента
async function create_element() {

   let target = location.pathname.substring(1);
   target = target.substring(0, target.length - 1);

   switch (target) {

      case "executor": $("#executor_title").text("Додавання нового виконавця");
                       $("#executor_yes").text("Додати");
                       break;
      case "project":   $("#project_title").text("Додавання нового проекта");
                       $("#project_yes").text("Додати");
                       prepare_executors_for_dropdown(target);
                       break;
      case "client":  $("#client_title").text("Додавання нового клієнта");
                       $("#client_yes").text("Додати");
                       prepare_executors_for_dropdown(target);
                       break;

   }

   $(`#${target}_yes`).attr("onclick", `modal_update_${target}s(true)`);
   $(`#modal_${target}s`).modal('show');

}

// ...............................................................................................

// Редагування існуючого елемента
async function edit_element (element) {

   let item;
   let target = location.pathname.substring(1);
   target = target.substring(0, target.length - 1);

   let id = parseInt($(element).closest("tr").children().first().text());

   $(`#${target}_title`).text("Редагування даних");
   $(`#${target}_yes`).text("Оновити дані");

   switch (target) {

      case "executor": item = get_executor_by_id(id);
                       $("#executor_name").val(item.name);
                       $("#executor_email").val(item.email);
                       break;
      case "project":   item = get_project_by_id(id);
                       $("#project_client").val(item.client);
                       $("#project_name").val(item.name);
                       $("#project_executor").text(item.executor);
                       prepare_executors_for_dropdown(target);
                       break;
      case "client":  item = get_client_by_id(id);
                       $("#client_name").val(item.name);
                       prepare_executors_for_dropdown(target);
                       break;

   }

   $(`#${target}_yes`).attr("onclick", `modal_update_${target}s(false, ${id})`);
   $(`#modal_${target}s`).modal('show');

}

// ...............................................................................................

// Пошук існуючого елемента
function find_element (element) {

   let search = $(element).val();
   let target = location.pathname.substring(1);
   let search_list = [];

   switch (target) {

      case "executors":      search_list = find_executors(search);      break;
      case "projects":        search_list = find_projects(search);        break;
      case "clients":       search_list = find_clients(search);       break;
   

   }

   display_data(search_list);

}

// ...............................................................................................

// Видалення існуючого елемента
function delete_element (item) {

   let button;
   let messclient;
   let target = location.pathname.substring(1);
   let id = parseInt($(item).closest("tr").children().first().text());

   switch (target) {

      case "executors":
         messclient = "Ви дійсно хочете видалити інформацію про цього виконавця";
         button = "Видалити";
         break;

      case "projects":
         messclient = "Ви дійсно хочете видалити цей проект";
         button = "Видалити";
         break;

      case "clients":
         messclient = "Ви дійсно хочете виписати цього клієнта";
         button = "Виписати";
         break;


   }
   
   modal_confirm_create("Повідомлення",
                        `${messclient}?`,
                        `${button}`,
                        "Відміна",
                        "delete", id);

   $(`#modal_confirm`).modal('show');

}

// ...............................................................................................

// Відобразити дані у таблиці
function display_data (search_list) {

   let data;
   let additional_attr = "";
   let target = location.pathname.substring(1);

   switch (target) {

      case "executors":      data = get_executors_list();
                             break;
      case "projects":        data = get_projects_list();
                             break;
      case "clients":       data = get_clients_list();
                             additional_attr = "false, ";
                             break;
   }

   // Якщо поле пошуку не порожнє - відображаємо результат
   if (search_list) { data = search_list; }

   // Очищення таблиць
   clear_table(data.length === 0);

   // Відображення загальної кількості елементів
   $("#total_count").text(`Загальна кількість: ${data.length}`);

   // Відобразити дані конкретної таблиці
   eval(`display_${target}_data(${additional_attr}data)`);

}

// ...............................................................................................

// Відобразити дані про усі виконавця
function display_executors_data (data) {

   for (let element of data) {
   
      let block = 
     `<tr>
         <td> <span class="m-2">${element.id}</span> </td>
         <td>${element.name}</td>
         <td>${element.email}</td>
         <td>${get_icon_code()}</td>
      </tr>`;

      $("#table").append(block);

   }
}

// Відобразити дані про усіх лікарів
function display_projects_data (data) {

   for (let element of data) {
      
      let block =
     `<tr>
         <td> <span class="m-2">${element.id}</span> </td>
         <td>${element.name}</td>
         <td class="fit"> <span class="m-2">${element.client}</span> </td>
         <td>${element.executor}</td>
         <td>${get_icon_code()}</td>
      </tr>`;

      $("#table").append(block);

   }
}

// Відобразити дані про усіх клієнтів
function display_clients_data (data) {

   for (let element of data) {
      
      let block =
     `<tr>
         <td> <span class="m-2">${element.id}</span> </td>
         <td>${element.name}</td>
         <td>${get_icon_code()}</td>
      </tr>`;

      $("#table").append(block);

   }
}

// ...............................................................................................

// Вибрана позитивна відповідь у модальному вікні
function modal_confirm() {

   let pclient = location.pathname.substring(1);

   let target = $("#modal_confirm").attr("target");
   let src = $("#modal_confirm").attr("src");

   switch (target) {

      // Видалення даних
      case "delete":
         let id = parseInt(src);
         pclient = pclient.substr(0, pclient.length - 1);
         eval(`remove_${pclient}(${id})`);
         display_data();
         save_data();
         break;
   }
}

// Задання елементів модального вікна підтвердження
function modal_confirm_create (title, messclient, yes, no, target, src) {

   $(`#modal_confirm_title`).text(title);
   $(`#modal_confirm_messclient`).text(messclient);
   $(`#modal_confirm_yes`).text(yes);
   $(`#modal_confirm_no`).text(no);
   $("#modal_confirm").attr("target", target);
   $("#modal_confirm").attr("src", src);
}

// ...............................................................................................

// Додавання нового виконавця або редагування існуючої
function modal_update_executors (added_new, id) {

   let name    = $("#executor_name").val();
   let email = $("#executor_email").val();

   if (added_new) { add_executor(name, email);      }
   else           { edit_executor(id, name, email); }

   display_data();
   clear_input();
   save_data();

}

// Додавання нового проекта або редагування існуючого
function modal_update_projects (added_new, id) {

   let name     = $("#project_name").val();
   let client      = $("#project_client").val();
   let executor = $("#project_executor").text();
   client = client === "Виберіть клієнта" ? "Не встановлено" : client;
   executor = executor === "Виберіть виконавця" ? "Не встановлено" : executor;

   if (added_new) { add_project(name, client, executor);      }
   else           { edit_project(id, name, client, executor); }

   display_data();
   clear_input();
   save_data();

}

// Додавання нового клієнта або редагування існуючого
function modal_update_clients (added_new, id) {

   let name     = $("#client_name").val();

   if (added_new) { add_client(name);      }
   else           { edit_client(id, name); }
   display_data();
   clear_input();
   save_data();
}

// ...............................................................................................

// ...............................................................................................

// Вибір виконавця у випадаючому списку
function set_executor (element) {

   let executor = $(element).text();
   let target = location.pathname.substring(1);

   executor = executor === ". . ." ? "Виберіть виконавця" : executor;

   if (target === "projects") { $("#project_executor").text(executor);  }
   else                      { $("#client_executor").text(executor);
                               prepare_projects_for_dropdown();        }

}

// Вибір проекта у випадаючому списку
function set_project (element) {

   let project = $(element).text();

   project = project === ". . ." ? "Виберіть проект" : project;

   $("#client_project").text(project);

}

// ...............................................................................................

// Підготовуємо список доступних виконавців у випадаючому меню
function prepare_executors_for_dropdown (target) {

   let list = $(`#${target}_executors_list`);

   // Отримуємо інформацію про усіх виконавців
   get_data("executors").then((result) => {

      if (result.length != 0) {
         
         list.find("li:not(:first)").remove();
         list.append(divider);

         for (let item of result) {
            list.append(`<li><span class="dropdown-item" ` +
                        `onclick="set_executor(this)">${item.name}</span></li>`);
         }
      }

   });
}

// Підготовуємо список доступних проектів у випадаючому меню
function prepare_projects_for_dropdown() {

   $("#client_project").text("Виберіть проекта");

   let list = $("#client_projects_list");
   let executor = $("#client_executor").text();
   let divider_is_added = false;

   // Отримуємо інформацію про усіх проектів
   get_data("projects").then((result) => {

      if (result.length != 0) {
         
         list.find("li:not(:first)").remove();

         for (let item of result) {

            if (item.executor === executor) {

               if (!divider_is_added) { list.append(divider);
                                        divider_is_added = true; }

               list.append(`<li><span class="dropdown-item" ` +
                           `onclick="set_project(this)">${item.name}</span></li>`);
            }
         }
      }

   });
}

// ...............................................................................................

// Видалення усіх даних з таблиці 
// Додавання інформаційного повідомлення, якщо таблиця пуста
function clear_table (table_is_empty) {

   let target = location.pathname.substring(1);
   let span = (target === "executors") ? 4 :
              (target === "projects") ? 5 : 6;

   $("#table tbody").empty();

   let block =
  `<tr class="text-center text-secondary" id="table_empty">
      <td colspan="${span}"> <span class="mx-5 fs-4">Немає даних для відображення</span> </td>
   </tr>`;

   if (table_is_empty) { $("#table tbody").append(block); }
   else                { $("#table_empty").remove();      }

}

// Очищення полів вводу
function clear_input() {

   let target = location.pathname.substring(1);

   switch (target) {
      
      case "executors": $("#executor_name").val("");
                        $("#executor_email").val("");
                        break;
      case "projects":   $("#project_name").val("");
                        $("#project_client").val("");
                        $("#project_executor").text("Виберіть виконавця");
                        $("#project_executors_list").find("li:not(:first)").remove();
                        break;
      case "clients":  $("#client_name").val("");
                        $("#client_client").val("");
                        $("#client_project").text("Виберіть проекта");
                        $("#client_executor").text("Виберіть виконавця");
                        $(`#client_projects_list`).find("li:not(:first)").remove();
                        $(`#client_executors_list`).find("li:not(:first)").remove();
                        break;
   }
}

// ...............................................................................................

// Метод повертає html код елементів керування таблицею
function get_icon_code (only_delete) {

   // Іконка редагування елемента
   const icon_edit = 
  `<svg xmlns="http://www.w3.org/2000/svg" width="1.2em" height="1.2em" fill="currentColor" class="bi bi-pencil-square btn-control mx-1" viewBox="0 0 16 16" onclick="edit_element(this)">
     <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
     <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
   </svg>`;

   // Іконка видалення елемента
   const icon_delete = 
  `<svg xmlns="http://www.w3.org/2000/svg" width="1.2em" height="1.2em" fill="currentColor" class="bi bi-trash btn-control mx-1" viewBox="0 0 16 16" onclick="delete_element(this)">
     <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
     <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
   </svg>`;

   // Блок з іконками
   const icons =
  `<span class="d-flex mx-2">
      ${!only_delete ? icon_edit : ""}${icon_delete}
   </span>`;

   return icons;

}

// ...............................................................................................

// Обмеження вводу для поля "вік"
function set_client (element) {

   let value = $(element).val();
   value = value.substring(0, 3);
   value = (value > 120) ? 120 : value;
   $(element).val(value);

}

// Метод дозволяє реалізувати затримку
function delay (time) {
   return new Promise((resolve, reject) => {
      setTimeout(() => {
         resolve();
      }, time);
   });
}

// ...............................................................................................

// Очищення даних після закриття модальних вікон
$(document).on("hidden.bs.modal", () => { clear_input(); });

// Виконання коду після завантаження сторінки
jQuery(async () => {

   await load_data();
   display_data();

});