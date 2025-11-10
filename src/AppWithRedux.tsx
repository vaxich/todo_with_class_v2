
import { useReducer } from 'react';
import './App.css';
import { Todolist } from './Todolist';
import { AddItemForm } from './AddItemForm';

import ButtonAppBar from './ButtonAppBar';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { addTodolistAC, changeTodolistFilterAC, changeTodolistTitleAC, removeTodolistAC, todolistReducer } from './state/todolist-reducer';
import { addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer } from './state/tasks-reducer';
import { v1 } from 'uuid';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from './state/store';
import { TodolistWithRedux } from './TodolistWithRedux';

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

export type TasksStateType = {
    [key: string]: TaskType[]
}

export type FilterValueType = "All" | "Active" | "Completed";

function AppWithRedux() {


    let todolists = useSelector<RootState, Array<TodolistsType>>(state => state.todolists)
    //let tasks = useSelector<RootState, TasksStateType>(state => state.tasks)

    const dispatch = useDispatch()

    // const [todolists, dispatchToTodolists] = useReducer(todolistReducer, [
    //     { id: todoistId1, title: "what to learn", filter: 'All', },
    //     { id: todoistId2, title: "what to buy", filter: 'Completed', },
    // ]);


    // const [tasks, dispatchToTasks] = useReducer(tasksReducer, {
    //     [todoistId1]: [
    //         { id: v1(), title: "HTML", isDone: true, },
    //         { id: v1(), title: "REACT", isDone: false, },
    //         { id: v1(), title: "JS", isDone: false, },
    //     ],
    //     [todoistId2]: [
    //         { id: v1(), title: "bread", isDone: true, },
    //         { id: v1(), title: "tea", isDone: false, },
    //         { id: v1(), title: "sigi", isDone: false, },
    //     ],
    // })

    const removeTodolist = (todolistId: string) => {        
        dispatch(removeTodolistAC(todolistId))        
    }
    const removeTask = (todolistId: string, taskId: string) => {
        // setTasks({ ...tasks, [todolistId]: tasks[todolistId].filter(task => task.id !== taskId) })
        // let newtasks = tasks.filter(task => task.id !== taskId)
        // setTasks(newtasks)
        dispatch(removeTaskAC(todolistId, taskId))
    }

    const changeFilter = (todolistId: string, nextFilterValue: FilterValueType) => {
        // setTodolists(todolists.map((tl) => tl.id === todolistId ? { ...tl, filter: nextFilterValue } : tl))
        // setFilter(nextFilterValue)
        dispatch(changeTodolistFilterAC(todolistId, nextFilterValue))
    }

    const addTaks = (todolistId: string, newTile: string) => {

        // const newTask = { id: crypto.randomUUID(), title: newTile, isDone: false }; // : TaskType
        // setTasks({ ...tasks, [todolistId]: [...tasks[todolistId], newTask] })
        // setTasks([newTask, ...tasks])
        dispatch(addTaskAC(todolistId, newTile))
    }

    const ChangeTaskStatus = (todolistId: string, taskId: string, newIsDoneValue: boolean) => {
        // setTasks({ ...tasks, [todolistId]: tasks[todolistId].map(task => task.id === taskId ? { ...task, isDone: newIsDoneValue } : task) })
        // const newTasks: TaskType[] = tasks.map((task) => task.id === taskId ? { ...task, isDone: newIsDoneValue } : task)
        // setTasks(newTasks)
        dispatch(changeTaskStatusAC(todolistId, taskId, newIsDoneValue))

    }

    const addTodolist = (newTile: string) => {
        dispatch(addTodolistAC(newTile))
    }

    const updateTaskTitle = (todolistId: string, taskId: string, newTitle: string) => {
        // setTasks({ ...tasks, [todolistId]: tasks[todolistId].map(task => task.id === taskId ? { ...task, title: newTitle } : task) })
        dispatch(changeTaskTitleAC(todolistId, taskId, newTitle))
    }
    const updateTodolistTitle = (todolistId: string, newTitle: string) => {
        // setTodolists(todolists.map(tl => tl.id === todolistId ? { ...tl, title: newTitle } : tl))
        dispatch(changeTodolistTitleAC(todolistId, newTitle))
    }

    return (
        <div className="App">
            <ButtonAppBar />
            <Container fixed >
                <Grid container spacing={3}>
                    <AddItemForm onClick={addTodolist} />
                </Grid>
                <Grid container >

                    {todolists.map(tl => {

                        // const getFilteredTasksForRender = (tasks: TaskType[], filterValue: FilterValueType) => {
                        //     switch (filterValue) {
                        //         case "Active":
                        //             return tasks.filter(task => !task.isDone)
                        //         case "Completed":
                        //             return tasks.filter(task => task.isDone)
                        //         default:
                        //             return tasks
                        //     }
                        // }
                        // const filteredTasksForRender: TaskType[] = getFilteredTasksForRender(tasks[tl.id], tl.filter)

                        return (
                            <Paper elevation={3} style={{ padding: '10px', margin: '10px' }}>
                                <TodolistWithRedux
                                    todolist={tl}
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

export default AppWithRedux;
