var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import axios from "https://cdn.jsdelivr.net/npm/axios@1.6.7/+esm";
const tasksDOM = document.querySelector(".tasks");
const loadingDOM = document.querySelector(".loading-text");
const formDOM = document.querySelector(".task-form");
const taskInputDOM = document.querySelector(".task-input");
const formAlertDOM = document.querySelector(".form-alert");
// Load tasks from /api/tasks
const showTasks = () => __awaiter(void 0, void 0, void 0, function* () {
    loadingDOM.style.visibility = "visible";
    try {
        const { data: { tasks }, } = yield axios.get("/api/v1/tasks");
        if (tasks.length < 1) {
            tasksDOM.innerHTML = '<h5 class="empty-list">No tasks in your list</h5>';
            loadingDOM.style.visibility = "hidden";
            return;
        }
        const allTasks = tasks
            .map((task) => {
            const { completed, _id: taskID, name } = task;
            console.log(typeof taskID);
            return `
          <div class="single-task ${completed && "task-completed"}">
            <h5><span><i class="far fa-check-circle"></i></span>${name}</h5>
            <div class="task-links">
              <!-- edit link -->
              <a href="task.html?id=${taskID}"  class="edit-link">
                <i class="fas fa-edit"></i>
              </a>
              <!-- delete btn -->
              <button type="button" class="delete-btn" data-id="${taskID}">
                <i class="fas fa-trash"></i>
              </button>
            </div>
          </div>
        `;
        })
            .join("");
        tasksDOM.innerHTML = allTasks;
    }
    catch (error) {
        tasksDOM.innerHTML = '<h5 class="empty-list">There was an error, please try later....</h5>';
    }
    loadingDOM.style.visibility = "hidden";
});
showTasks();
// delete task /api/tasks/:id
tasksDOM.addEventListener("click", (event) => __awaiter(void 0, void 0, void 0, function* () {
    /* The type of event.target is EventTarget | null. But you know you're targeting
    an `<i>` element. However, there's no type for this element. As a workaround, cast
    it to a generic HTMLElement */
    const el = event.target;
    /* Now, the `parentElement` is of type HTMLElement | null, but you know that it
    is a `<button>` element. You can use cast again to tell tsc it. */
    if (el.parentElement.classList.contains("delete-btn")) {
        loadingDOM.style.visibility = "visible";
        const id = el.parentElement.dataset.id;
        try {
            yield axios.delete(`/api/v1/tasks/${id}`);
            showTasks();
        }
        catch (error) {
            console.log(error);
        }
    }
    loadingDOM.style.visibility = "hidden";
}));
// form
// Note that, instead of adding an event listener to the submit button to listen for
// a click, the author decided to listen for the submit event (when the form is
// submitted) on the form.
formDOM.addEventListener("submit", (e) => __awaiter(void 0, void 0, void 0, function* () {
    e.preventDefault();
    const name = taskInputDOM.value;
    try {
        yield axios.post("/api/v1/tasks", { name });
        showTasks();
        taskInputDOM.value = "";
        formAlertDOM.style.display = "block";
        formAlertDOM.textContent = `success, task added`;
        formAlertDOM.classList.add("text-success");
    }
    catch (error) {
        formAlertDOM.style.display = "block";
        formAlertDOM.innerHTML = `error, please try again`;
    }
    setTimeout(() => {
        formAlertDOM.style.display = "none";
        formAlertDOM.classList.remove("text-success");
    }, 3000);
}));
