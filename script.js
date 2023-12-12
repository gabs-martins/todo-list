const form = document.querySelector('#form');
const taskInput = form.querySelector('#task')
const add = form.querySelector('button')
const list = document.querySelector('.list')

const taskList = []
function Task(task){
  this.name = task
  this.completed = false
  this.createdAt = setDate()
  
  function setDate(){
    const today = new Date()
    return new Intl.DateTimeFormat('pt-br',{
      day:'numeric',
      month:'short',
      year:'numeric',
      hour:'numeric',
      minute:'numeric',
      timeZone: 'America/sao_paulo',
      timeZoneName: 'short'
    }).format(today)
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


list.addEventListener('click', e =>{
  const target = e.target
  const li = target.parentElement.parentElement
  const index = li.getAttribute('data-index')
  const inputTask = li.querySelector('.item__inputTask')
  
  if(target.matches('.delete')){
    taskList.splice(index, 1)
    showTask()
  }

  if(target.matches('.edit')){
    target.classList.toggle('fa-floppy-disk')
    console.log(inputTask)
    if(target.classList.contains('fa-floppy-disk')){
      inputTask.removeAttribute('disabled')
      li.querySelector('input[type="text"]').focus()
       
    }else{
      inputTask.setAttribute('disabled', 'disabled')
      taskList[index].name = inputTask.value
      showTask()
    }
  }

  if (target.matches('.input__done')){
    target.parentElement.querySelector('.edit').style.display ='none'
    const inputDone = target.parentElement.querySelector('input[type="checkbox"]')
    console.log(inputDone)
    console.log(target.parentElement)
    if(inputDone.checked){
      taskList[target.parentElement.getAttribute('data-index')].completed = true
      inputDone.parentElement.classList.add('done')
    }
    else{
      taskList[target.parentElement.getAttribute('data-index')].completed = !true
      inputDone.parentElement.classList.remove('done')
    }
  
  }
})
