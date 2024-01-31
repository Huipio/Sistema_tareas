  // Listas de tareas
  const pendingTasks = [];
  const completedTasks = [];

  // Función para agregar una nueva tarea
  function addTask() {
    const taskInput = document.getElementById('taskInput');
    const taskText = taskInput.value.trim();

    if (taskText !== '') {
      const taskDescription = prompt('Ingrese una descripción para la tarea:');
      const taskDateTime = prompt('Ingrese fecha y hora para la tarea (YYYY-MM-DD HH:MM):');

      const newTask = {
        text: taskText,
        description: taskDescription,
        datetime: taskDateTime ? new Date(taskDateTime) : null,
        completed: false,
        timestamp: new Date()
      };

      pendingTasks.push(newTask);
      displayTasks();
      logEvent('Nueva tarea agregada: ' + taskText);
      taskInput.value = '';
    }
  }

  // Función para mostrar las tareas en la interfaz
  function displayTasks() {
    displayPendingTasks();
    displayCompletedTasks();
  }

  // Función para mostrar las tareas pendientes en la interfaz
  function displayPendingTasks() {
    const pendingTaskList = document.getElementById('pendingTaskList');
    pendingTaskList.innerHTML = '';

    pendingTasks.forEach((task, index) => {
      const listItem = createTaskListItem(task, index, true);
      pendingTaskList.appendChild(listItem);
    });
  }

  // Función para mostrar las tareas completadas en la interfaz
  function displayCompletedTasks() {
    const completedTaskList = document.getElementById('completedTaskList');
    completedTaskList.innerHTML = '';

    completedTasks.forEach((task, index) => {
      const listItem = createTaskListItem(task, index, false);
      completedTaskList.appendChild(listItem);
    });
  }

  // Función para crear un elemento de lista de tarea
  function createTaskListItem(task, index, isPending) {
    const listItem = document.createElement('li');
    listItem.className = 'list-group-item d-flex justify-content-between align-items-center';

    const taskText = document.createTextNode(task.text);
    const taskDetailsButton = document.createElement('button');
    taskDetailsButton.className = 'btn btn-info btn-sm';
    taskDetailsButton.innerHTML = 'Detalles';
    taskDetailsButton.onclick = () => showTaskDetails(task, isPending);
    listItem.appendChild(taskText);
    listItem.appendChild(taskDetailsButton);

    if (isPending) {
      const buttonsDiv = document.createElement('div');
      buttonsDiv.className = 'btn-group';

      const completeButton = document.createElement('button');
      completeButton.className = 'btn btn-success';
      completeButton.innerHTML = 'Completada';
      completeButton.onclick = () => markAsCompleted(index);
      buttonsDiv.appendChild(completeButton);

      const deleteButton = document.createElement('button');
      deleteButton.className = 'btn btn-danger';
      deleteButton.innerHTML = 'Eliminar';
      deleteButton.onclick = () => deleteTask(index, isPending);
      buttonsDiv.appendChild(deleteButton);

      listItem.appendChild(buttonsDiv);
    } else {
      const detailsText = document.createElement('small');
      detailsText.className = 'text-muted';
      detailsText.innerHTML = `(${task.description || 'Sin descripción'}) - ${task.datetime ? task.datetime.toLocaleString() : 'Sin fecha y hora'}`;
      listItem.appendChild(detailsText);
    }

    return listItem;
  }

  // Función para mostrar detalles completos de la tarea
  function showTaskDetails(task, isPending) {
    const modalTitle = document.getElementById('taskDetailsModalLabel');
    const modalBody = document.getElementById('taskDetailsBody');

    modalTitle.innerText = 'Detalles de Tarea';
    modalBody.innerHTML = `
      <p><strong>Tarea:</strong> ${task.text}</p>
      <p><strong>Descripción:</strong> ${task.description || 'N/A'}</p>
      <p><strong>Fecha y Hora:</strong> ${task.datetime ? task.datetime.toLocaleString() : 'N/A'}</p>
      <p><strong>Estado:</strong> ${isPending ? 'Pendiente' : 'Completada'}</p>
      <p><strong>Fecha de Creación:</strong> ${task.timestamp.toLocaleString()}</p>
    `;

    $('#taskDetailsModal').modal('show');
  }

  // Función para marcar una tarea como completada
  function markAsCompleted(index) {
    const completedTask = pendingTasks.splice(index, 1)[0];
    completedTask.completed = true;
    completedTasks.push(completedTask);
    displayTasks();
    logEvent('Tarea completada: ' + completedTask.text);
  }

  // Función para eliminar una tarea
  function deleteTask(index, isPending) {
    const deletedTask = isPending ? pendingTasks.splice(index, 1)[0] : completedTasks.splice(index, 1)[0];
    displayTasks();
    logEvent(`Tarea ${isPending ? 'pendiente' : 'completada'} eliminada: ${deletedTask.text}`);
  }

  // Función para registrar eventos en los logs
  function logEvent(eventText) {
    const logsDiv = document.getElementById('logs');
    const logItem = document.createElement('p');
    logItem.innerHTML = `<strong>${new Date().toLocaleString()}:</strong> ${eventText}`;
    logsDiv.appendChild(logItem);
  }

  // Inicializar las tareas y mostrarlas en la interfaz
  displayTasks();