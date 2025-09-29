
import { FilterValueType, TaskType } from "./App"
import { ChangeEvent, useState } from "react"

type TodolistPropsType = {
    title: string
    tasks: Array<TaskType>
    filter: FilterValueType
    removeTask: (taskId: string) => void
    changeFilter: (nextFilterValue: FilterValueType) => void
    addTaks: (newTile: string) => void
    ChangeTaskStatus: (taskId: string, newIsDoneValue: boolean) => void
}


export const Todolist = (props: TodolistPropsType) => {

    const { title, tasks, removeTask, changeFilter, addTaks, ChangeTaskStatus, filter } = props

    const [newInputValue, setNewInputValue] = useState('');

    const [inputError, setInputError] = useState(false)

    //const isAddDisabled = !newInputValue ? "enter new title" : "yuor title veru long";

    const userMessage = inputError
        ? <span>yout title empty</span>
        : newInputValue.length <= 15
            ? <span>enter new title</span>
            : <span>yout title very long</span>

    // const getInputValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    //     // получить input
    //     const newValue = e.target.value
    //     setNewInputValue(newValue)
    // }

    const onClickAddTaks = () => {
        if (newInputValue.trim() !== "") {
            addTaks(newInputValue)
            setNewInputValue("");
        }
        else {

            setInputError(true)
            setNewInputValue("")
        }
    }

    const onkeyDownAddtask = (event: React.KeyboardEvent<HTMLInputElement>) => {
        event.key === "Enter" && onClickAddTaks()
    }

    const onChangeSetNewTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
        inputError && setInputError(false)
        setNewInputValue(event.target.value)

    }

    return (
        <div className='todolist'>
            <h3>{title}</h3>
            <div>
                <input
                    className={inputError ? "input-error" : ""}
                    onChange={onChangeSetNewTitle}
                    value={newInputValue}
                    onKeyDown={onkeyDownAddtask}
                />
                <button
                    onClick={() => onClickAddTaks()}
                    disabled={newInputValue === "" || newInputValue.length > 15}>
                    +
                </button>
                <div>
                    {userMessage}
                </div>

            </div>
            <ul>
                {!tasks.length
                    ? <span>not tasks</span>
                    : tasks.map(task => {

                        const onClickRemoveTasHandler = () => {
                            removeTask(task.id)
                        }

                        const OnChangeCheckboxHandler = (event: ChangeEvent<HTMLInputElement>) => {
                            ChangeTaskStatus(task.id, event.currentTarget.checked)
                        }


                        return (
                            <li key={task.id}>
                                <input type="checkbox" checked={task.isDone} onChange={OnChangeCheckboxHandler} />
                                <span className={task.isDone ? "task-done" : "task"}>{task.title}</span>
                                <button onClick={onClickRemoveTasHandler}>x</button>
                            </li>
                        )
                    })
                }

            </ul>
            <div>
                <button className={filter === "All" ? "btn-active" : ""} onClick={() => changeFilter("All")}>All</button>
                <button className={filter === "Active" ? "btn-active" : ""} onClick={() => changeFilter("Active")}>Active</button>
                <button className={filter === "Completed" ? "btn-active" : ""} onClick={() => changeFilter("Completed")}>Completed</button>
            </div>
        </div>
    )
}