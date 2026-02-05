
import { CheckBox } from "./CheckBox"
import { EditableSpan } from "./EditableSpan"

import { TaskType } from "./AppWithRedux";

import { memo, useCallback } from "react";
import Delete from "@mui/icons-material/Delete";
import { IconButton } from "@mui/material";
import { useDispatch } from "react-redux";

import { changeTaskStatusAC, changeTaskTitleAC, removeTaskAC } from "./state/tasks-reducer";

type TaskPropsType = {
    task: TaskType
    todolistId: string
    // task: TaskType
    // changeTaskStatus: (taskId: string , newValue: boolean) => void
    // onClickRemoveTasHandler: (taskId: string ) => void
    // updateTaskTitleGandler: (taskId: string , newTitle : string) => void
}


export const Task = memo((props: TaskPropsType) => {

    const { task, todolistId } = props

    //let task = useSelector<RootState, TaskType>(state => state.tasks[todolistId].find(task => task.id === taskId) as TaskType)

    const dispatch = useDispatch()

    const changeTaskStatus = useCallback((taskId: string, newValue: boolean) => {
        dispatch(changeTaskStatusAC(todolistId, taskId, newValue))
    }, [todolistId, dispatch])

      const updateTaskTitleGandler = useCallback((taskId: string, newTitle: string) => {
        dispatch(changeTaskTitleAC(todolistId, taskId, newTitle))
    }, [todolistId, dispatch])

     const removeTask = useCallback((taskId: string) => {
        dispatch(removeTaskAC(todolistId, taskId))
    }, [todolistId, dispatch])

    return (
        <div>
            <li key={task.id} className={task.isDone ? "task-done" : "task"}>

                <CheckBox checked={task.isDone} onChange={(value) => changeTaskStatus(task.id, !task.isDone)} />

                <EditableSpan title={task.title} onClick={(newTitle) => updateTaskTitleGandler(task.id, newTitle)} />

                <IconButton size="small" aria-label="delete" onClick={() => removeTask(task.id)}>
                    <Delete fontSize="inherit" />
                </IconButton>
            </li>
        </div>
    )
})