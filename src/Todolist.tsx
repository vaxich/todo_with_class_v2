
import { FilterValueType, TaskType } from "./App"
import { KeyboardEventHandler, useState } from "react"

type TodolistPropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (taskId: string) => void
    changeFilter: (nextFilterValue: FilterValueType) => void
    addTaks: (newTile: string) => void
}


export const Todolist = (props: TodolistPropsType) => {

    const { title, tasks, removeTask, changeFilter, addTaks } = props

    const [newInputValue, setNewInputValue] = useState('');

    //const isAddDisabled = !newInputValue ? "enter new title" : "yuor title veru long";

    const userMessage = newInputValue.length <= 15
        ? <span>enter new title</span>
        : <span>yout title very lonf</span>

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
            alert('вы пытаетесь добавить пустой таск')
        }
    }

    const onkeyDownAddtask = (event: React.KeyboardEvent<HTMLInputElement>) => {
        event.key === "Enter" && onClickAddTaks()
    }

    const onChangeSetNewTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNewInputValue(event.target.value)
    }

    return (
        <div className='todolist'>
            <h3>{title}</h3>
            <div>
                <input
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


                        return (
                            <li key={task.id}>
                                <input type="checkbox" checked={task.isDone} />
                                <span>{task.title}</span>
                                <button onClick={onClickRemoveTasHandler}>x</button>
                            </li>
                        )
                    })
                }

            </ul>
            <div>
                <button onClick={() => changeFilter("All")}>All</button>
                <button onClick={() => changeFilter("Active")}>Active</button>
                <button onClick={() => changeFilter("Completed")}>Completed</button>
            </div>
        </div>
    )
}