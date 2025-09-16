import { TaskType } from "./App"

type TodolistPropsType = {
    title: string
    tasks: Array<TaskType>
}


export const Todolist = (props: TodolistPropsType) => {

    const { title, tasks } = props

    return (
        <div className='todolist'>
            <h3>{title}</h3>
            <div>
                <input />
                <button>+</button>
            </div>
            <ul>
                <li>
                    <input type="checkbox" checked={tasks[0].isDone} />
                    <span>{tasks[0].title}</span>
                </li>
                <li>
                    <input type="checkbox" checked={tasks[1].isDone} />
                    <span>{tasks[1].title}</span>
                    </li>
                <li>
                    <input type="checkbox" checked={tasks[2].isDone} />
                    <span>{tasks[2].title}</span>
                    </li>
            </ul>
            <div>
                <button>All</button>
                <button>Active</button>
                <button>Conpleted</button>
            </div>
        </div>
    )
}