
import { useState } from 'react';
import './App.css';
import { Todolist } from './Todolist';


export type TaskType = {
  id: string
  title: string
  isDone: boolean
}

export type FilterValueType = "All" | "Active" | "Completed";

function App() {

  const todolistTitle1: string = 'what to learn'

  const [filter, setFilter] = useState<"All" | "Active" | "Completed">("All")

  const [tasks, setTasks] = useState<TaskType[]>([
    { id: crypto.randomUUID(), title: "HTML", isDone: true, },
    { id: crypto.randomUUID(), title: "REACT", isDone: false, },
    { id: crypto.randomUUID(), title: "JS", isDone: false, },
  ]);



  const removeTask = (taskId: string) => {
    let newtasks = tasks.filter(task => task.id !== taskId)
    setTasks(newtasks)
  }

  const changeFilter = (nextFilterValue: FilterValueType) => {
    setFilter(nextFilterValue)
  }

  const addTaks = (newTile: string) => {

    const newTask: TaskType = { id: crypto.randomUUID(), title: newTile, isDone: false };

    setTasks([newTask, ...tasks])
  }

  const ChangeTaskStatus = (taskId: string , newIsDoneValue: boolean) => {
    const newTasks : TaskType[] = tasks.map( (task) => task.id=== taskId ? {... task, isDone: newIsDoneValue} : task)
    setTasks(newTasks)
  }


  const getFilteredTasksForRender = (tasks: TaskType[], filterValue: FilterValueType) => {
    switch (filterValue) {
      case "Active":
        return tasks.filter(task => !task.isDone)
      case "Completed":
        return tasks.filter(task => task.isDone)
      default:
        return tasks
    }
  }
  const filteredTasksForRender: TaskType[] = getFilteredTasksForRender(tasks, filter)


  return (
    <div className="App">
      <Todolist 
      tasks={filteredTasksForRender} 
      title={todolistTitle1} 
      filter ={filter}
      removeTask={removeTask} 
      changeFilter={changeFilter} 
      addTaks={addTaks} 
      ChangeTaskStatus = {ChangeTaskStatus}
      />

    </div>
  );
}

export default App;
