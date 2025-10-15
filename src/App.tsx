
import { useState } from 'react';
import './App.css';
import { Todolist } from './Todolist';

export type TodolistsType = {
  id: string
  title: string
  filter: FilterValueType
}
export type TaskType = {
  id: string
  title: string
  isDone: boolean
}

export type FilterValueType = "All" | "Active" | "Completed";

function App() {

  //const todolistTitle1: string = 'what to learn'
  let todoistId1 = crypto.randomUUID();
  let todoistId2 = crypto.randomUUID();
  //const [filter, setFilter] = useState<"All" | "Active" | "Completed">("All")

  const [todolists, setTodolists] = useState<TodolistsType[]>([
    { id: todoistId1, title: "what to learn", filter: 'All', },
    { id: todoistId2, title: "what to buy", filter: 'Completed', },
  ]);


  // const [tasks, setTasks] = useState<TaskType[]>([
  //   { id: crypto.randomUUID(), title: "HTML", isDone: true, },
  //   { id: crypto.randomUUID(), title: "REACT", isDone: false, },
  //   { id: crypto.randomUUID(), title: "JS", isDone: false, },
  // ]);

  const [tasks, setTasks] = useState({
    [todoistId1]: [
      { id: crypto.randomUUID(), title: "HTML", isDone: true, },
      { id: crypto.randomUUID(), title: "REACT", isDone: false, },
      { id: crypto.randomUUID(), title: "JS", isDone: false, },
    ],
    [todoistId2]: [
      { id: crypto.randomUUID(), title: "HTML", isDone: true, },
      { id: crypto.randomUUID(), title: "REACT", isDone: false, },
      { id: crypto.randomUUID(), title: "JS", isDone: false, },
    ],
  })

  const removeTodolist = (todolistId: string) => {
    setTodolists(todolists.filter(tl => tl.id !== todolistId));
    delete tasks[todolistId]
  }
  const removeTask = (todolistId: string, taskId: string) => {
    setTasks({ ...tasks, [todolistId]: tasks[todolistId].filter(task => task.id !== taskId) })
    // let newtasks = tasks.filter(task => task.id !== taskId)
    // setTasks(newtasks)
  }

  const changeFilter = (todolistId: string, nextFilterValue: FilterValueType) => {
    setTodolists(todolists.map((tl) => tl.id === todolistId ? { ...tl, filter: nextFilterValue } : tl))
    // setFilter(nextFilterValue)
  }

  const addTaks = (todolistId: string, newTile: string) => {

    const newTask = { id: crypto.randomUUID(), title: newTile, isDone: false }; // : TaskType
    setTasks({ ...tasks, [todolistId]: [...tasks[todolistId], newTask] })
    // setTasks([newTask, ...tasks])
  }

  const ChangeTaskStatus = (todolistId: string, taskId: string, newIsDoneValue: boolean) => {
    setTasks({ ...tasks, [todolistId]: tasks[todolistId].map(task => task.id === taskId ? { ...task, isDone: newIsDoneValue } : task) })
    // const newTasks: TaskType[] = tasks.map((task) => task.id === taskId ? { ...task, isDone: newIsDoneValue } : task)
    // setTasks(newTasks)


  }




  return (
    <div className="App">
      {todolists.map(tl => {

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
        const filteredTasksForRender: TaskType[] = getFilteredTasksForRender(tasks[tl.id], tl.filter)

        return (
          <Todolist
            key={tl.id}
            todolistId={tl.id}
            tasks={filteredTasksForRender}
            title={tl.title}
            filter={tl.filter}
            removeTask={removeTask}
            changeFilter={changeFilter}
            addTaks={addTaks}
            ChangeTaskStatus={ChangeTaskStatus}
            removeTodolist={removeTodolist}
          />
        )
      })}


    </div>
  );
}

export default App;
