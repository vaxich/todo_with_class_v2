import { spawn } from "child_process"
import { FilterValueType, TaskType } from "./App"

type TodolistPropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (taskId: string) => void
    changeFilter: (nextFilterValue: FilterValueType) => void
}


export const Todolist = (props: TodolistPropsType) => {

    const { title, tasks, removeTask , changeFilter} = props


    return (
        <div className='todolist'>
            <h3>{title}</h3>
            <div>
                <input />
                <button>+</button>
            </div>
            <ul>
                {!tasks.length
                    ? <span>not tasks</span>
                    : tasks.map(task => {

                        const onClickRemoveTasHandler = ( ) => {
                            removeTask(task.id)
                        }


                        return (
                            <li key={task.id}>
                                <input type="checkbox" checked={task.isDone} />
                                <span>{task.title}</span>
                                <button onClick={  onClickRemoveTasHandler}>x</button>
                            </li>
                        )
                    })
                }

            </ul>
            <div>
                <button onClick={ () => changeFilter("All")}>All</button>
                <button onClick={ () => changeFilter("Active")}>Active</button>
                <button onClick={ () => changeFilter("Completed")}>Completed</button>
            </div>
        </div>
    )
}