
import { AddItemForm } from "./AddItemForm"
import { FilterValueType, TaskType, TodolistsType } from "./App"

import { EditableSpan } from "./EditableSpan"
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Button from "@mui/material/Button";
import { CheckBox } from "./CheckBox";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "./state/store";
import { addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC } from "./state/tasks-reducer";
import { changeTodolistFilterAC, changeTodolistTitleAC, removeTodolistAC } from "./state/todolist-reducer";




type TodolistPropsType = {
    todolist: TodolistsType
}


export const TodolistWithRedux = (props: TodolistPropsType) => {

    const { todolist } = props
    const { id, title, filter } = todolist;
    let tasks = useSelector<RootState, Array<TaskType>>(state => state.tasks[id])

    const dispatch = useDispatch()

    const removeTodolistHandler = () => {
        // removeTodolist(todolistId)
        dispatch(removeTodolistAC(id))
    }

    const addTaskHandler = (inputValue: string) => {
        // addTaks(todolistId, inputValue)
        dispatch(addTaskAC(id, inputValue))
    }

    const updateTodolistTitleHandler = (newTitle: string) => {
        // updateTodolistTitle(todolistId, newTitle)
        dispatch(changeTodolistTitleAC(id, newTitle))
    }

    const updateTaskTitleGandler = (taskId: string, newTitle: string) => {
        // updateTaskTitle(todolistId, taskId, newTitle)
        dispatch(changeTaskTitleAC(id, taskId, newTitle))
    }

    const onAllActiveHandler = () => {
        // changeFilter(todolistId, "All")
        dispatch(changeTodolistFilterAC(id, 'All'))

    }
    const onActiveActiveHandler = () => {
        // changeFilter(todolistId, "Active")
        dispatch(changeTodolistFilterAC(id, 'Active'))
    }
    const onCompletedActiveHandler = () => {
        // changeFilter(todolistId, "Completed")
        dispatch(changeTodolistFilterAC(id, 'Completed'))
    }

    const callBackHandler = (taskId: string, newValue: boolean) => {
        // ChangeTaskStatus(todolistId, taskId, newValue)
        dispatch(changeTaskStatusAC(id, taskId, newValue))
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
        <div className='todolist'>
            <h3>
                <EditableSpan onClick={updateTodolistTitleHandler} title={title} />
                {/* {title} */}
                {/* <button onClick={removeTodolistHandler}>X</button> */}
                <IconButton size="small" aria-label="delete" onClick={removeTodolistHandler}>
                    <DeleteIcon fontSize="inherit" />
                </IconButton>
            </h3>
            <AddItemForm onClick={addTaskHandler} />


            <ul>
                {!tasks.length
                    ? <span>not tasks</span>
                    : filteredTasksForRender.map(task => {

                        const onClickRemoveTasHandler = () => {
                            // removeTask(todolistId, task.id)
                            dispatch(removeTaskAC(id, task.id))
                            debugger
                        }

                        //  git status

                        // const updateTaskTitleGandler = (newTitle: string) => {
                        //     updateTaskTitle(todolistId, task.id, newTitle)
                        // }

                        return (
                            <li key={task.id} className={task.isDone ? "task-done" : "task"}>
                                {/* <input type="checkbox" checked={task.isDone} onChange={OnChangeCheckboxHandler} /> */}
                                {/* <Checkbox checked={task.isDone} onChange={OnChangeCheckboxHandler}/> */}
                                <CheckBox checked={task.isDone} onChange={(value) => callBackHandler(task.id, value)} />
                                {/* <span className={task.isDone ? "task-done" : "task"}>{task.title}</span> */}
                                <EditableSpan title={task.title} onClick={(newTitle) => updateTaskTitleGandler(task.id, newTitle)} />
                                {/* <button onClick={onClickRemoveTasHandler}>x</button> */}
                                <IconButton size="small" aria-label="delete" onClick={onClickRemoveTasHandler}>
                                    <DeleteIcon fontSize="inherit" />
                                </IconButton>
                            </li>
                        )
                    })
                }

            </ul>
            <div>
                {/* <button className={filter === "All" ? "btn-active" : ""} onClick={onAllActiveHandler}>All</button> */}
                {/* <button className={filter === "Active" ? "btn-active" : ""} onClick={onAActiveActiveHandler}>Active</button> */}
                {/* <button className={filter === "Completed" ? "btn-active" : ""} onClick={onCompletedActiveHandler}>Completed</button> */}
                <Button variant={filter === "All" ? "outlined" : "contained"} color="success" onClick={onAllActiveHandler}>  All  </Button>
                <Button variant={filter === "Active" ? "outlined" : "contained"} color="primary" onClick={onActiveActiveHandler}>  Active  </Button>
                <Button variant={filter === "Completed" ? "outlined" : "contained"} color="error" onClick={onCompletedActiveHandler}>  Completed  </Button>
            </div>
        </div>
    )
}