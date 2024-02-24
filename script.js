const form = document.querySelector('#form');
const taskInput = form.querySelector('#task')
const add = form.querySelector('button')
const list = document.querySelector('.list')

const taskList = []
class Task {
  constructor(task) {
    this.id = taskList.length + 1;
    this.name = task;
    this.completed = false;
    this.createdAt = setDate();

    function setDate() {
      const today = new Date();
      return new Intl.DateTimeFormat('pt-br', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        timeZone: 'America/sao_paulo',
        timeZoneName: 'short'
      }).format(today);
    }
  }
}


form.addEventListener('submit', e=>{
  e.preventDefault()
  const task = taskInput.value
  
  if (task)
  {taskValidate(task)}
  
  taskInput.focus()
  taskInput.value = ''
  showTask()
  
})

function taskValidate(task){
  const ItemExist = taskList.some(li=>li.name.toLowerCase() === task.toLowerCase())
  if(ItemExist){
    window.alert(`${task} já está existe!`)
  }else{
    taskList.push(new Task(task))
        
  }
}

const showTask = ()=>{
    list.innerHTML = ''
    taskList.forEach((e,index) => {
      const item = `
      <li class="item" data-index="${index}">
      <input type="checkbox" class="input__done">
              <input type="text" value="${e.name}" class="item__inputTask" disabled>
              <div class="buttons">
              <button class="fa-solid fa-pen-to-square edit">
              </button>  
              <button class="fa-solid fa-trash-can delete">
              </button>
              </div> 
      </li>        `
      list.innerHTML += item
    })
}


list.addEventListener('click', handleTaskClick)

function handleTaskClick(event) {
    const target = event.target
    const listItem = target.closest('li')
    const index = parseInt(listItem.dataset.index)
    const inputTask = listItem.querySelector('.item__inputTask')

    if (target.classList.contains('delete')) {
        deleteTask(index)
        showTask()
    }

    if (target.classList.contains('edit')) {
        toggleEditTask(listItem, inputTask)
        if (!target.classList.contains('fa-floppy-disk')) {
            updateTaskName(index, inputTask.value)
            showTask()
        }
    }

    if (target.classList.contains('input__done')) {
        toggleTaskCompletion(listItem, index)
    }
}

function deleteTask(index) {
    taskList.splice(index, 1)
}

function toggleEditTask(listItem, inputTask) {
    const editButton = listItem.querySelector('.edit')
    editButton.classList.toggle('fa-floppy-disk')
    
    if (editButton.classList.contains('fa-floppy-disk')) {
        inputTask.removeAttribute('disabled')
        inputTask.focus()
    } else {
        inputTask.setAttribute('disabled', 'disabled')
    }
}

function updateTaskName(index, newName) {
    taskList[index].name = newName
}

function toggleTaskCompletion(listItem, index) {
    const inputDone = listItem.querySelector('input[type="checkbox"]')
    taskList[index].completed = inputDone.checked
    listItem.classList.toggle('done', inputDone.checked)
}
