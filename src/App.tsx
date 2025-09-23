
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
  const [tasks, setTasks] = useState([
    { id: crypto.randomUUID(), title: "HTML", isDone: true, },
    { id: crypto.randomUUID(), title: "REACT", isDone: false, },
    { id: crypto.randomUUID(), title: "JS", isDone: false, },
  ]);

  // const tasks_1 : Array<TaskType> = [
  //   {id: crypto.randomUUID() , title: "HTML" , isDone: true,},
  //   {id: crypto.randomUUID()  , title: "REACT" , isDone: false,},
  //   {id: crypto.randomUUID()  ,  title: "JS" , isDone: false,},
  // ]

  const removeTask = (taskId: string) => {
    let newtasks = tasks.filter(task => task.id != taskId)
    setTasks(newtasks)
  }

  const changeFilter = (nextFilterValue: FilterValueType) =>     {
    setFilter(nextFilterValue)
  }


  const getFilteredTasksForRender = (tasks : TaskType[], filterValue: FilterValueType) => {
    switch (filterValue) {
      case "Active":
        return tasks.filter(task => task.isDone === false)
      case "Completed":
        return tasks.filter(task => task.isDone === true)
        default:
          return tasks
    }
  }
   const filteredTasksForRender: TaskType[] = getFilteredTasksForRender(tasks, filter)


  return (
    <div className="App">
      <Todolist tasks={filteredTasksForRender} title={todolistTitle1} removeTask={removeTask} changeFilter = {changeFilter}/>

    </div>
  );
}

export default App;
