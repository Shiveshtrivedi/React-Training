import { InterfaceAllTasks, InterfaceTask } from '../src/interfaces';
import { fetchData, handleError } from './data_file.js';

const addTask = document.querySelector('.addTaskSymbol') as HTMLDivElement;
const addTaskPopupOverlay = document.querySelector(
  '.popupOverlay'
) as HTMLDivElement;
const addTaskCloseButton = document.querySelector(
  '.closeButton'
) as HTMLSpanElement;
const addTaskButton = document.getElementById(
  'addTaskButton'
) as HTMLButtonElement;
const editTaskPopupOverlay = document.querySelector(
  '.editPopupOverlay'
) as HTMLDivElement;
const editTaskInput = document.getElementById(
  'editTaskInput'
) as HTMLInputElement;
const saveEditButton = document.getElementById(
  'saveEditButton'
) as HTMLButtonElement;
const cancelEditButton = document.getElementById(
  'cancelEditButton'
) as HTMLButtonElement;
const taskContainer = document.querySelector('.rightBox') as HTMLDivElement;
const errorMessage = document.getElementById('errorMessage') as HTMLDivElement;
const errorMessageEdit = document.getElementById(
  'errorMessageinedit'
) as HTMLDivElement;

let allTasks: InterfaceTask[] = [];
let currentFilterType: string = 'all';

addTask.addEventListener('click', (): void => {
  addTaskPopupOverlay.style.display = 'flex';
});

addTaskCloseButton.addEventListener('click', (): void => {
  addTaskPopupOverlay.style.display = 'none';
});

enum FilterTypeValue {
  completed = 'completed',
  incomplete = 'incomplete',
  favorite = 'favorite',
  All = 'all',
}
const renderTasksBasedOnFilter = (filterType: string): void => {
  taskContainer.innerHTML = '';

  const heading: HTMLHeadingElement = document.createElement('h4');
  heading.className = 'taskHeading';
  heading.textContent =
    filterType.charAt(0).toUpperCase() + filterType.slice(1) + ' Tasks';
  taskContainer.appendChild(heading);

  let tasksToDisplay: InterfaceTask[];

  switch (filterType) {
    case FilterTypeValue.completed:
      tasksToDisplay = allTasks.filter((task) => task.isCompleted);
      break;
    case FilterTypeValue.incomplete:
      tasksToDisplay = allTasks.filter((task) => !task.isCompleted);
      break;
    case FilterTypeValue.favorite:
      tasksToDisplay = allTasks.filter((task) => task.isFavorite);
      break;
    default:
      tasksToDisplay = allTasks;
  }

  if (!tasksToDisplay.length) {
    const noTasksMessage: HTMLDivElement = document.createElement('div');
    noTasksMessage.textContent = 'No tasks available';
    noTasksMessage.className = 'noTasksMessage';
    taskContainer.appendChild(noTasksMessage);
  } else {
    tasksToDisplay.forEach((task) => {
      const taskElement = createTaskElement(task);
      taskContainer.appendChild(taskElement.element);
    });
  }
};

const sortTasksByName = (ascending: boolean = true): void => {
  allTasks.sort((a, b) => {
    const nameA: string = a.name.toLowerCase();
    const nameB: string = b.name.toLowerCase();
    const comparison: number = nameA.localeCompare(nameB);
    return ascending ? comparison : -comparison;
  });
};

const isDuplicateTaskName = (name: string): boolean => {
  return allTasks.some(
    (task: InterfaceAllTasks) => task.name.toLowerCase() === name.toLowerCase()
  );
};
enum DateFormat {
  Long = 'long',
  Short = 'short',
}

const getDateOptions = (format: DateFormat): Intl.DateTimeFormatOptions => {
  switch (format) {
    case DateFormat.Long:
      return { year: 'numeric', month: 'long', day: 'numeric' };
    case DateFormat.Short:
      return { year: 'numeric', month: '2-digit', day: '2-digit' };
    default:
      return { year: 'numeric', month: 'short', day: 'numeric' };
  }
};

const createTaskElement = (
  task: InterfaceTask
): { element: HTMLElement; task: InterfaceTask } => {
  const taskElement: HTMLDivElement = document.createElement('div');
  taskElement.classList.add('taskElement');
  taskElement.setAttribute('data-id', task.id);

  const checkBox: HTMLInputElement = document.createElement('input');
  checkBox.type = 'checkbox';
  checkBox.checked = task.isCompleted;

  const label: HTMLLabelElement = document.createElement('label');
  label.textContent = task.name;
  label.className = 'textTask';
  label.style.textDecoration = task.isCompleted ? 'line-through' : 'none';

  const star: HTMLSpanElement = document.createElement('span');
  star.classList.add('star');
  star.classList.add(task.isFavorite ? 'yellow' : 'white');
  star.innerHTML = task.isFavorite ? '&#9733;' : '&#9734;';

  star.addEventListener('click', () => {
    task.isFavorite = !task.isFavorite;

    updateTask(task)
      .then(() => {
        star.classList.toggle('yellow', task.isFavorite);
        star.classList.toggle('white', !task.isFavorite);
        star.innerHTML = task.isFavorite ? '&#9733;' : '&#9734;';

        renderTasksBasedOnFilter(currentFilterType);
      })
      .catch((error: Error) => {
        task.isFavorite = !task.isFavorite;
        star.classList.toggle('yellow', task.isFavorite);
        star.classList.toggle('white', !task.isFavorite);
        star.innerHTML = task.isFavorite ? '&#9733;' : '&#9734;';
        handleError(error);
      });
  });

  const editButton: HTMLSpanElement = document.createElement('span');

  editButton.innerHTML = '&#128394;';
  editButton.className = 'editButtonTask';
  if (task.isCompleted) {
    editButton.classList.add('disabled');
  } else {
    editButton.addEventListener('click', () => {
      currentEditingTask = task;
      editTaskInput.value = task.name;
      editTaskPopupOverlay.style.display = 'flex';
    });
  }

  const removeButton: HTMLSpanElement = document.createElement('span');

  removeButton.innerHTML = '&#10060';
  removeButton.className = 'removeButtonTask';
  removeButton.addEventListener('click', () => {
    removeTask(taskElement, task);
  });

  const actionContainer: HTMLDivElement = document.createElement('div');
  actionContainer.className = 'actionContainer';

  const date: HTMLParagraphElement = document.createElement('p');
  date.className = 'date';

  const dateFormat: DateFormat = DateFormat.Long;
  const options: Intl.DateTimeFormatOptions = getDateOptions(dateFormat);
  const now: Date = new Date();
  const dateString: string = now.toLocaleDateString(undefined, options);
  date.textContent = `Added on: ${dateString}`;
  actionContainer.append(date, star, editButton, removeButton);

  taskElement.append(checkBox, label, actionContainer);

  checkBox.addEventListener('click', () => {
    task.isCompleted = checkBox.checked;
    label.style.textDecoration = task.isCompleted ? 'line-through' : 'none';
    updateTask(task);
    renderTasksBasedOnFilter(currentFilterType);
  });

  return { element: taskElement, task: task };
};

addTaskButton.addEventListener('click', () => {
  const taskInput = document.getElementById('taskInput') as HTMLInputElement;
  const taskName: string = taskInput.value.trim();

  if (taskName) {
    if (isDuplicateTaskName(taskName)) {
      errorMessage.textContent = 'A task with this name already exists.';
      errorMessage.classList.remove('hidden');
      return;
    }

    const task: InterfaceAllTasks = {
      name: taskName,
      isCompleted: false,
      isFavorite: false,
    };

    errorMessage.classList.add('hidden');

    const option: RequestInit = {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(task),
    };

    fetchData<InterfaceTask>('', option)
      .then((createdTask: InterfaceTask) => {
        allTasks.push(createdTask);

        sortTasksByName(true);
        renderTasksBasedOnFilter(currentFilterType);

        taskInput.value = '';
        addTaskPopupOverlay.style.display = 'none';
      })
      .catch((error: Error) => handleError(error));
  } else {
    errorMessage.classList.remove('hidden');
  }
});

const removeTask = (taskElement: HTMLElement, task: InterfaceTask): void => {
  const deleteOption: RequestInit = {
    method: 'DELETE',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
    },
  };

  fetchData(`/${task.id}`, deleteOption)
    .then(() => {
      taskElement.remove();
      allTasks = allTasks.filter((t) => t.id !== task.id);
      if (!allTasks.length) {
        renderTasksBasedOnFilter(currentFilterType);
      } else {
        renderTasksBasedOnFilter(currentFilterType);
      }
    })
    .catch((error: Error) => handleError(error));
};

const updateTask = (task: InterfaceTask): Promise<void | string> => {
  const updateOption: RequestInit = {
    method: 'PUT',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(task),
  };
  return fetchData<InterfaceTask>(`/${task.id}`, updateOption)
    .then((updatedTask: InterfaceTask) => {
      const index = allTasks.findIndex((t: InterfaceTask) => t.id === task.id);
      if (index !== -1) {
        allTasks[index] = updatedTask;
      }
    })
    .catch((error: Error) => handleError(error));
};

let currentEditingTask: InterfaceTask | null = null;
saveEditButton.addEventListener('click', () => {
  if (currentEditingTask) {
    const newTaskName = editTaskInput.value.trim();

    if (!newTaskName) {
      errorMessageEdit.textContent = 'Task name cannot be empty.';
      errorMessageEdit.classList.remove('hidden');
      return;
    }

    if (
      isDuplicateTaskName(newTaskName) &&
      newTaskName !== currentEditingTask.name
    ) {
      errorMessageEdit.textContent = 'A task with this name already exists.';
      errorMessageEdit.classList.remove('hidden');
      return;
    }

    currentEditingTask.name = newTaskName;
    errorMessageEdit.classList.add('hidden');

    updateTask(currentEditingTask)
      .then(() => {
        sortTasksByName(true);

        taskContainer.innerHTML = '';
        renderTasksBasedOnFilter(currentFilterType);

        editTaskPopupOverlay.style.display = 'none';
      })
      .catch((error: Error) => {
        handleError(error);
      });
  }
});

cancelEditButton.addEventListener('click', () => {
  editTaskPopupOverlay.style.display = 'none';
});

const getOption: RequestInit = {
  method: 'GET',
  headers: { 'content-type': 'application/json' },
};

const loadTask = (): void => {
  fetchData<InterfaceTask[]>('', getOption)
    .then((data: InterfaceTask[]) => {
      if (!data.length) {
        allTasks = [];
        renderTasksBasedOnFilter(currentFilterType);
      } else {
        allTasks = data;
        sortTasksByName(true);
        renderTasksBasedOnFilter(currentFilterType);
      }
    })
    .catch((error: Error) => handleError(error));
};

const allTaskButton = document.querySelector('.allTask') as HTMLDivElement;
allTaskButton.addEventListener('click', () => {
  currentFilterType = FilterTypeValue.All;
  loadTask();
});

const completeTaskButton = document.querySelector(
  '.completeTask'
) as HTMLDivElement;
completeTaskButton.addEventListener('click', () => {
  currentFilterType = FilterTypeValue.completed;
  renderTasksBasedOnFilter(currentFilterType);
});

const incompleteTaskButton = document.querySelector(
  '.incompleteTask'
) as HTMLDivElement;
incompleteTaskButton.addEventListener('click', () => {
  currentFilterType = FilterTypeValue.incomplete;
  renderTasksBasedOnFilter(currentFilterType);
});

const favoriteButton = document.querySelector(
  '.favoriteTask'
) as HTMLDivElement;
favoriteButton.addEventListener('click', () => {
  currentFilterType = FilterTypeValue.favorite;
  renderTasksBasedOnFilter(currentFilterType);
});

loadTask();
