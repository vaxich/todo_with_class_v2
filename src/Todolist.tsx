
import { AddItemForm } from "./AddItemForm"
import { FilterValueType, TaskType } from "./App"
import { ChangeEvent } from "react"
import { EditableSpan } from "./EditableSpan"



type TodolistPropsType = {
    todolistId: string
    title: string
    tasks: Array<TaskType>
    filter: FilterValueType
    removeTask: (todolistId: string, taskId: string) => void
    changeFilter: (todolistId: string, nextFilterValue: FilterValueType) => void
    addTaks: (todolistId: string, newTile: string) => void
    ChangeTaskStatus: (todolistId: string, taskId: string, newIsDoneValue: boolean) => void
    removeTodolist: (todolistId: string) => void
    updateTaskTitle: (todolistId: string, taskId: string, newTitle: string) => void
    updateTodolistTitle: (todolistId: string, newTitle: string) => void
}


export const Todolist = (props: TodolistPropsType) => {

    const { title, tasks, removeTask, changeFilter, addTaks, ChangeTaskStatus, filter, todolistId, removeTodolist, updateTaskTitle, updateTodolistTitle } = props


    const removeTodolistHandler = () => {
        removeTodolist(todolistId)
    }

    const addTaskHandler = (inputValue: string) => {
        addTaks(todolistId, inputValue)
    }

    const updateTodolistTitleHandler = (newTitle: string) => {
        updateTodolistTitle(todolistId, newTitle)
    }
//
    const updateTaskTitleGandler = (taskId: string, newTitle: string) => {
        updateTaskTitle(todolistId, taskId, newTitle)
    }


    return (
        <div className='todolist'>
            <h3>
                <EditableSpan onClick={updateTodolistTitleHandler} title={title} />
                {/* {title} */}
                <button onClick={removeTodolistHandler}>X</button>
            </h3>
            <AddItemForm onClick={addTaskHandler} />


            <ul>
                {!tasks.length
                    ? <span>not tasks</span>
                    : tasks.map(task => {

                        const onClickRemoveTasHandler = () => {
                            removeTask(todolistId, task.id)
                        }

                        const OnChangeCheckboxHandler = (event: ChangeEvent<HTMLInputElement>) => {
                            ChangeTaskStatus(todolistId, task.id, event.currentTarget.checked)
                        }

                        // const updateTaskTitleGandler = (newTitle: string) => {
                        //     updateTaskTitle(todolistId, task.id, newTitle)
                        // }

                        return (
                            <li key={task.id}>
                                <input type="checkbox" checked={task.isDone} onChange={OnChangeCheckboxHandler} />
                                {/* <span className={task.isDone ? "task-done" : "task"}>{task.title}</span> */}
                                <EditableSpan title={task.title} onClick={ (newTitle) => updateTaskTitleGandler(task.id, newTitle)} />
                                <button onClick={onClickRemoveTasHandler}>x</button>
                            </li>
                        )
                    })
                }

            </ul>
            <div>
                <button className={filter === "All" ? "btn-active" : ""} onClick={() => changeFilter(todolistId, "All")}>All</button>
                <button className={filter === "Active" ? "btn-active" : ""} onClick={() => changeFilter(todolistId, "Active")}>Active</button>
                <button className={filter === "Completed" ? "btn-active" : ""} onClick={() => changeFilter(todolistId, "Completed")}>Completed</button>
            </div>
        </div>
    )
}