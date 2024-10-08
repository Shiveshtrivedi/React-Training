import { fetchData, url, handleError } from "./data_file.js";

const addTask = document.querySelector(".addTaskSymbol");
const addTaskPopupOverlay = document.querySelector(".popupOverlay");
const addTaskCloseButton = document.querySelector(".closeButton");
const addTaskButton = document.getElementById("addTaskButton");
const editTaskPopupOverlay = document.querySelector(".editPopupOverlay");
const editTaskInput = document.getElementById("editTaskInput");
const saveEditButton = document.getElementById("saveEditButton");
const cancelEditButton = document.getElementById("cancelEditButton");
const taskContainer = document.querySelector(".rightBox");
const errorMessage = document.getElementById("errorMessage");
const errorMessageEdit = document.getElementById("errorMessageinedit");

let allTasks = [];
let currentFilterType = "all";

addTask.addEventListener("click", () => {
  addTaskPopupOverlay.style.display = "flex";
});

addTaskCloseButton.addEventListener("click", () => {
  addTaskPopupOverlay.style.display = "none";
});

const renderTasksBasedOnFilter = (filterType) => {
  taskContainer.innerHTML = "";

  const heading = document.createElement("h4");
  heading.className = "taskHeading";
  heading.textContent =
    filterType.charAt(0).toUpperCase() + filterType.slice(1) + " Tasks";
  taskContainer.appendChild(heading);

  let tasksToDisplay;

  switch (filterType) {
    case "completed":
      tasksToDisplay = allTasks.filter((task) => task.isCompleted);
      break;
    case "incomplete":
      tasksToDisplay = allTasks.filter((task) => !task.isCompleted);
      break;
    case "favorite":
      tasksToDisplay = allTasks.filter((task) => task.isFavorite);
      break;
    default:
      tasksToDisplay = allTasks;
  }

  if (!tasksToDisplay.length) {
    const noTasksMessage = document.createElement("div");
    noTasksMessage.textContent = "No tasks available";
    noTasksMessage.className = "noTasksMessage";
    taskContainer.appendChild(noTasksMessage);
  } else {
    tasksToDisplay.forEach((task) => {
      const taskElement = createTaskElement(task);
      taskContainer.appendChild(taskElement.element);
    });
  }
};

const sortTasksByName = (ascending = true) => {
  allTasks.sort((a, b) => {
    const nameA = a.name.toLowerCase();
    const nameB = b.name.toLowerCase();
    const comparison = nameA.localeCompare(nameB);
    return ascending ? comparison : -comparison;
  });
};

const isDuplicateTaskName = (name) => {
  return allTasks.some(
    (task) => task.name.toLowerCase() === name.toLowerCase()
  );
};

const createTaskElement = (task) => {
  const taskElement = document.createElement("div");
  taskElement.classList.add("taskElement");
  taskElement.setAttribute("data-id", task.id);

  const checkBox = document.createElement("input");
  checkBox.type = "checkbox";
  checkBox.checked = task.isCompleted;

  const label = document.createElement("label");
  label.textContent = task.name;
  label.className = "textTask";
  label.style.textDecoration = task.isCompleted ? "line-through" : "none";

  const star = document.createElement("span");
  star.classList.add("star");
  star.classList.add(task.isFavorite ? "yellow" : "white");
  star.innerHTML = task.isFavorite ? "&#9733;" : "&#9734;";

  star.addEventListener("click", () => {
    task.isFavorite = !task.isFavorite;

    updateTask(task)
      .then(() => {
        star.classList.toggle("yellow", task.isFavorite);
        star.classList.toggle("white", !task.isFavorite);
        star.innerHTML = task.isFavorite ? "&#9733;" : "&#9734;";

        renderTasksBasedOnFilter(currentFilterType);
      })
      .catch((error) => {
        task.isFavorite = !task.isFavorite;
        star.classList.toggle("yellow", task.isFavorite);
        star.classList.toggle("white", !task.isFavorite);
        star.innerHTML = task.isFavorite ? "&#9733;" : "&#9734;";
        return handleError(error);
      });
  });

  const editButton = document.createElement("span");

  editButton.innerHTML = "&#128394;";
  editButton.className = "editButtonTask";
  if (task.isCompleted) {
    editButton.classList.add("disabled");
  } else {
    editButton.addEventListener("click", () => {
      currentEditingTask = task;
      editTaskInput.value = task.name;
      editTaskPopupOverlay.style.display = "flex";
    });
  }

  const removeButton = document.createElement("span");

  removeButton.innerHTML = "&#10060";
  removeButton.className = "removeButtonTask";
  removeButton.addEventListener("click", () => {
    removeTask(taskElement, task);
  });

  const actionContainer = document.createElement("div");
  actionContainer.className = "actionContainer";

  const date = document.createElement("p");
  date.className = "date";
  const now = new Date();
  const options = { year: "numeric", month: "long", day: "numeric" };
  const dateString = now.toLocaleDateString(undefined, options);
  date.textContent = `Added on: ${dateString}`;
  actionContainer.append(date, star, editButton, removeButton);

  taskElement.append(checkBox, label, actionContainer);

  checkBox.addEventListener("click", () => {
    task.isCompleted = checkBox.checked;
    label.style.textDecoration = task.isCompleted ? "line-through" : "none";
    updateTask(task);
    renderTasksBasedOnFilter(currentFilterType);
  });

  return { element: taskElement, task: task };
};

addTaskButton.addEventListener("click", () => {
  const taskInput = document.getElementById("taskInput");
  let taskName = taskInput.value.trim();

  if (taskName) {
    if (isDuplicateTaskName(taskName)) {
      errorMessage.textContent = "A task with this name already exists.";
      errorMessage.classList.remove("hidden");
      return;
    }

    let task = {
      name: taskName,
      isCompleted: false,
      isFavorite: false,
    };

    errorMessage.classList.add("hidden");

    const option = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(task),
    };

    fetchData(url, option)
      .then((createdTask) => {
        allTasks.push(createdTask);

        sortTasksByName(true);
        renderTasksBasedOnFilter(currentFilterType);

        taskInput.value = "";
        addTaskPopupOverlay.style.display = "none";
      })
      .catch((error) => handleError(error));
  } else {
    errorMessage.classList.remove("hidden");
  }
});

const removeTask = (taskElement, task) => {
  const deleteOption = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  };

  fetchData(`${url}/${task.id}`, deleteOption)
    .then(() => {
      taskElement.remove();
      allTasks = allTasks.filter((t) => t.id !== task.id);
      if (!allTasks.length) {
        renderTasksBasedOnFilter(currentFilterType);
      } else {
        renderTasksBasedOnFilter(currentFilterType);
      }
    })
    .catch((error) => handleError(error));
};

const updateTask = (task) => {
  const updateOption = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(task),
  };
  return fetchData(`${url}/${task.id}`, updateOption)
    .then((updatedTask) => {
      const index = allTasks.findIndex((t) => t.id === task.id);
      if (index !== -1) {
        allTasks[index] = updatedTask;
      }
    })
    .catch((error) => handleError(error));
};

let currentEditingTask = null;
saveEditButton.addEventListener("click", () => {
  if (currentEditingTask) {
    const newTaskName = editTaskInput.value.trim();

    if (!newTaskName) {
      errorMessageEdit.textContent = "Task name cannot be empty.";
      errorMessageEdit.classList.remove("hidden");
      return;
    }

    if (
      isDuplicateTaskName(newTaskName) &&
      newTaskName !== currentEditingTask.name
    ) {
      errorMessageEdit.textContent = "A task with this name already exists.";
      errorMessageEdit.classList.remove("hidden");
      return;
    }

    currentEditingTask.name = newTaskName;
    errorMessageEdit.classList.add("hidden");

    updateTask(currentEditingTask)
      .then(() => {
        sortTasksByName(true);

        taskContainer.innerHTML = "";
        renderTasksBasedOnFilter(currentFilterType);

        editTaskPopupOverlay.style.display = "none";
      })
      .catch((error) => {
        handleError(error);
      });
  }
});

cancelEditButton.addEventListener("click", () => {
  editTaskPopupOverlay.style.display = "none";
});

const getOption = {
  method: "GET",
  headers: { "content-type": "application/json" },
};

const loadTask = () => {
  fetchData(url, getOption)
    .then((data) => {
      if (!data.length) {
        allTasks = [];
        renderTasksBasedOnFilter(currentFilterType);
      } else {
        allTasks = data;
        sortTasksByName(true);
        renderTasksBasedOnFilter(currentFilterType);
      }
    })
    .catch((error) => handleError(error));
};

const allTaskButton = document.querySelector(".allTask");
allTaskButton.addEventListener("click", () => {
  currentFilterType = "all";
  loadTask();
});

const completeTaskButton = document.querySelector(".completeTask");
completeTaskButton.addEventListener("click", () => {
  currentFilterType = "completed";
  renderTasksBasedOnFilter(currentFilterType);
});

const incompleteTaskButton = document.querySelector(".incompleteTask");
incompleteTaskButton.addEventListener("click", () => {
  currentFilterType = "incomplete";
  renderTasksBasedOnFilter(currentFilterType);
});

const favoriteButton = document.querySelector(".favoriteTask");
favoriteButton.addEventListener("click", () => {
  currentFilterType = "favorite";
  renderTasksBasedOnFilter(currentFilterType);
});

loadTask();
