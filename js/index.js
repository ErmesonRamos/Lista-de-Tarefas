// Variaveis 
const buttonAddTasks = document.querySelector('#button-add-tasks');
const inputAddTasks = document.querySelector('#input-add-tasks');
const listUl = document.querySelector('#listUl');
let tasks = [];


window.onload = () => {
  // Recuperando as tasks do localStorage
  const taskOnLocalStorage = localStorage.getItem('tasks');

  if(!taskOnLocalStorage) return;

  tasks = JSON.parse(taskOnLocalStorage);

  tasks.forEach(t => {
    renderTaskOnHTML(t.title, t.done);
  });

};


// Função para renderizar o HTML com JavaScript
function renderTaskOnHTML(taskTitle, done = false) {
  
  // Criando os elementos
  const li = document.createElement('li');
  const span = document.createElement('span');
  const input = document.createElement('input');
  const containerCheckbox = document.createElement('div');
  const containerButton = document.createElement('div');
  const buttonRemove = document.createElement('button');

  // Manipulando as classes
  li.classList.add('container-li');
  containerCheckbox.classList.add('container-checkbox');
  containerButton.classList.add('container-button');
  buttonRemove.classList.add('remover-tasks');

  // Adicionando o atributo do checkbox
  input.setAttribute('type', 'checkbox');

  // Pasando o valor do title para o span
  span.textContent = taskTitle;

  // Passando textContent do botão Remove.
  buttonRemove.textContent = 'X';

  // Adicionando os elementos ao DOM
  listUl.appendChild(li);
  li.appendChild(containerCheckbox);
  li.appendChild(containerButton);
  containerCheckbox.appendChild(input);
  containerCheckbox.appendChild(span);
  containerButton.appendChild(buttonRemove);

  // Atribuindo valor
  input.checked = done;
  
  if (done) {
    span.style.textDecoration = 'line-through';
  }

   //Evento para remover
  buttonRemove.addEventListener('click', () => {
    listUl.removeChild(li);
    li.removeChild(containerCheckbox);
    li.removeChild(containerButton);
    containerCheckbox.removeChild(input);
    containerCheckbox.removeChild(span);
    containerButton.removeChild(buttonRemove);

    // Tirando tarefas do array
    tasks = tasks.filter((t) => t.title !== span.textContent);
    localStorage.setItem('tasks', JSON.stringify(tasks));
  });

  // Checkbox
  input.addEventListener('change', () => {
    
    if (input.checked) {
      span.style.textDecoration = 'line-through'
    } else {
      span.style.textDecoration = 'none'
    }

    tasks = tasks.map((t) => {
      if (t.title === span.textContent) {
        return {
          title: t.title,
          done: !t.done,
        }
      } else {
        return t;
      }
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
  });

  inputAddTasks.value = '';

};

buttonAddTasks.addEventListener('click', () => {
  
  const taskTitle = inputAddTasks.value;
  
  if (taskTitle.length < 3) {
    alert('A tarefa precisa ter pelo menos 3 caracteres');
    inputAddTasks.value = '';
    return;
  };
  
  renderTaskOnHTML(taskTitle);
  
  // Adicionando a task ao array
  tasks.push({
    title: taskTitle,
    done: false,
  });

  localStorage.setItem('tasks', JSON.stringify(tasks));
  
  inputAddTasks.value = '';

});
