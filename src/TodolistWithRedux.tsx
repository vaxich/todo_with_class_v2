
import { AddItemForm } from "./AddItemForm"


import { EditableSpan } from "./EditableSpan"
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Button from "@mui/material/Button";

import { useDispatch, useSelector } from "react-redux";
import { RootState } from "./state/store";
import { addTaskAC} from "./state/tasks-reducer";
import { changeTodolistFilterAC, changeTodolistTitleAC, removeTodolistAC } from "./state/todolist-reducer";
import { memo, useCallback } from "react";
import { FilterValueType, TaskType, TodolistsType } from "./AppWithRedux";
import { Task } from "./Task";




type TodolistPropsType = {
    todolist: TodolistsType
}


export const TodolistWithRedux = memo((props: TodolistPropsType) => {

    console.log('todolist')

    const { todolist } = props
    const { todolistId, title, filter } = todolist;

    let tasks = useSelector<RootState, Array<TaskType>>(state => state.tasks[todolistId])

    const dispatch = useDispatch()

    const removeTodolistHandler = useCallback(() => {
        dispatch(removeTodolistAC(todolistId))
    }, [todolistId, dispatch])

    const addTaskHandler = useCallback((inputValue: string) => {
        dispatch(addTaskAC(todolistId, inputValue))
    }, [todolistId, dispatch])

    const updateTodolistTitleHandler = useCallback((newTitle: string) => {
        dispatch(changeTodolistTitleAC(todolistId, newTitle))
    }, [todolistId, dispatch])

    // const updateTaskTitleGandler = useCallback((taskId: string, newTitle: string) => {
    //     dispatch(changeTaskTitleAC(todolistId, taskId, newTitle))
    // }, [todolistId, dispatch])


    const changeFilter = useCallback((newFiletValue: FilterValueType) => {
        dispatch(changeTodolistFilterAC(todolistId, newFiletValue))
    }, [todolistId, dispatch]);

    // const removeTask = useCallback((taskId: string) => {
    //     dispatch(removeTaskAC(todolistId, taskId))
    // }, [todolistId, dispatch])

    // const changeTaskStatus = useCallback((taskId: string, newValue: boolean) => {
    //     dispatch(changeTaskStatusAC(todolistId, taskId, newValue))
    // }, [todolistId, dispatch])

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
                <IconButton size="small" aria-label="delete" onClick={removeTodolistHandler}>
                    <DeleteIcon fontSize="inherit" />
                </IconButton>
            </h3>
            <AddItemForm onClick={addTaskHandler} />
            <ul>
                {!tasks.length
                    ? <span>not tasks</span>
                    : filteredTasksForRender.map(task => {

                        // const onClickRemoveTasHandler = (taskId: string) => {
                        //     removeTask(taskId)
                        // }
                        return (
                            <Task 
                            key= {task.id}
                            task = {task} 
                            todolistId= {todolistId}
                            // changeTaskStatus = {changeTaskStatus} 
                            // onClickRemoveTasHandler = {onClickRemoveTasHandler} 
                            // updateTaskTitleGandler = {updateTaskTitleGandler}
                            />
                            // <li key={task.id} className={task.isDone ? "task-done" : "task"}>

                            //     <CheckBox checked={task.isDone} onChange={(value) => changeTaskStatus(task.id, value)} />

                            //     <EditableSpan title={task.title} onClick={(newTitle) => updateTaskTitleGandler(task.id, newTitle)} />

                            //     <IconButton size="small" aria-label="delete" onClick={() => onClickRemoveTasHandler(task.id)}>
                            //         <DeleteIcon fontSize="inherit" />
                            //     </IconButton>
                            // </li>
                        )
                    })
                }

            </ul>
            <div>
                <Button variant={filter === "All" ? "outlined" : "contained"} color="success" onClick={() => changeFilter('All')}>  All  </Button>
                <Button variant={filter === "Active" ? "outlined" : "contained"} color="primary" onClick={() => changeFilter('Active')}>  Active  </Button>
                <Button variant={filter === "Completed" ? "outlined" : "contained"} color="error" onClick={() => changeFilter('Completed')}>  Completed  </Button>
            </div>
        </div>
    )
})