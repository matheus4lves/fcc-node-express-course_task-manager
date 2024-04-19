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
const taskIDDOM = document.querySelector(".task-edit-id");
const taskNameDOM = document.querySelector(".task-edit-name");
const taskCompletedDOM = document.querySelector(".task-edit-completed");
const editFormDOM = document.querySelector(".single-task-form");
const editBtnDOM = document.querySelector(".task-edit-btn");
const formAlertDOM = document.querySelector(".form-alert");
const params = window.location.search;
const id = new URLSearchParams(params).get("id");
let tempName;
const showTask = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { data: { task }, } = yield axios.get(`/api/v1/tasks/${id}`);
        const { _id: taskID, completed, name } = task;
        taskIDDOM.textContent = taskID;
        taskNameDOM.value = name;
        tempName = name;
        if (completed) {
            taskCompletedDOM.checked = true;
        }
    }
    catch (error) {
        console.log(error);
    }
});
showTask();
editFormDOM.addEventListener("submit", (e) => __awaiter(void 0, void 0, void 0, function* () {
    editBtnDOM.textContent = "Loading...";
    e.preventDefault();
    try {
        const taskName = taskNameDOM.value;
        const taskCompleted = taskCompletedDOM.checked;
        const { data: { task }, } = yield axios.patch(`/api/v1/tasks/${id}`, {
            name: taskName,
            completed: taskCompleted,
        });
        const { _id: taskID, completed, name } = task;
        taskIDDOM.textContent = taskID;
        taskNameDOM.value = name;
        tempName = name;
        if (completed) {
            taskCompletedDOM.checked = true;
        }
        formAlertDOM.style.display = "block";
        formAlertDOM.textContent = `success, edited task`;
        formAlertDOM.classList.add("text-success");
    }
    catch (error) {
        console.error(error);
        taskNameDOM.value = tempName;
        formAlertDOM.style.display = "block";
        formAlertDOM.innerHTML = `error, please try again`;
    }
    editBtnDOM.textContent = "Edit";
    setTimeout(() => {
        formAlertDOM.style.display = "none";
        formAlertDOM.classList.remove("text-success");
    }, 3000);
}));
