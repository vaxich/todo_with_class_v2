
import { useState } from 'react';
import './App.css';
import { Todolist } from './Todolist';
import { AddItemForm } from './AddItemForm';

import ButtonAppBar from './ButtonAppBar';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';

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


  let todoistId1 = crypto.randomUUID();
  let todoistId2 = crypto.randomUUID();


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
      { id: crypto.randomUUID(), title: "bread", isDone: true, },
      { id: crypto.randomUUID(), title: "tea", isDone: false, },
      { id: crypto.randomUUID(), title: "sigi", isDone: false, },
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

  const addTodolist = (newTile: string) => {
    let newTodolistId = crypto.randomUUID()
    let newTodolist: TodolistsType = { id: newTodolistId, title: newTile, filter: 'All' }
    setTodolists([newTodolist, ...todolists])
    setTasks({ ...tasks, [newTodolistId]: [] })
  }

  const updateTaskTitle = (todolistId: string, taskId: string, newTitle: string) => {
    setTasks({ ...tasks, [todolistId]: tasks[todolistId].map(task => task.id === taskId ? { ...task, title: newTitle } : task) })
  }
  const updateTodolistTitle = (todolistId: string, newTitle: string) => {
    setTodolists(todolists.map(tl => tl.id === todolistId ? { ...tl, title: newTitle } : tl))
  }

  return (
    <div className="App">
      <ButtonAppBar />
      <Container fixed >
        <Grid container  spacing={3}>
          <AddItemForm onClick={addTodolist} />
        </Grid>
        <Grid container >

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
              <Paper elevation={3} style={{padding: '10px' , margin: '10px'}}>
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
                  updateTaskTitle={updateTaskTitle}
                  updateTodolistTitle={updateTodolistTitle}
                />
              </Paper>


            )
          })
          }
        </Grid>
      </Container>

    </div>
  );
}

export default App;
