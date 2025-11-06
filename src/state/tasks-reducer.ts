
import { TasksStateType } from "../App";
import { AddTodolistACType, RemoveTodolistACType } from "./todolist-reducer";


export const tasksReducer = (state: TasksStateType, action: tasksReducerType): TasksStateType => {
    switch (action.type) {
        case 'REMOVE-TASK': {
            // setTasks({ ...tasks, [todolistId]: tasks[todolistId].filter(task => task.id !== taskId) })
            return { ...state, [action.payload.todolistId]: state[action.payload.todolistId].filter(task => task.id !== action.payload.taskId) }
        }
        case 'ADD-TASK': {
            const newTask = { id: '47345', title: action.payload.newTitle, isDone: false }; // : TaskType
            // setTasks({ ...tasks, [todolistId]: [...tasks[todolistId], newTask] })
            return { ...state, [action.payload.todolistId]: [newTask, ...state[action.payload.todolistId]] }
        }
        case 'CHANGE-TASK-STATUS': {
            //  setTasks({ ...tasks, [todolistId]: tasks[todolistId].map(task => task.id === taskId ? { ...task, isDone: newIsDoneValue } : task) })
            return { ...state, [action.payload.todolistId]: state[action.payload.todolistId].map(task => task.id === action.payload.taskId ? { ...task, isDone: action.payload.newTaskStatus } : task) }
        }
        case 'CHANGE-TASK-TITLE': {
            // setTasks({ ...tasks, [todolistId]: tasks[todolistId].map(task => task.id === taskId ? { ...task, title: newTitle } : task) })
            return { ...state, [action.payload.todolistId]: state[action.payload.todolistId].map(task => task.id === action.payload.taskId ? { ...task, title: action.payload.newTaskTitle } : task) }
        }
        case 'ADD-TODOLIST': {
            // setTasks({ ...tasks, [newTodolistId]: [] })
            return { ...state, [action.payload.todolistId]: [] }
        }
        case 'REMOVE-TODOLIST': {
            // delete tasks[todolistId]
            let copyState = { ...state }
            delete copyState[action.payload.todolistId]
            return copyState
        }

        default: return state
    }
}



type tasksReducerType = removeTaskACType | addTaskACType | changeTaskStatusACType | changeTaskTitleACType | AddTodolistACType | RemoveTodolistACType
type removeTaskACType = ReturnType<typeof removeTaskAC>
type addTaskACType = ReturnType<typeof addTaskAC>
type changeTaskStatusACType = ReturnType<typeof changeTaskStatusAC>
type changeTaskTitleACType = ReturnType<typeof changeTaskTitleAC>


export const removeTaskAC = (todolistId: string, taskId: string) => {
    return {
        type: "REMOVE-TASK",
        payload: {
            todolistId,
            taskId
        }
    } as const
}
export const addTaskAC = (todolistId: string, newTitle: string) => {
    return {
        type: "ADD-TASK",
        payload: {
            todolistId,
            newTitle

        }
    } as const
}
export const changeTaskStatusAC = (todolistId: string, taskId: string, newTaskStatus: boolean) => {
    return {
        type: "CHANGE-TASK-STATUS",
        payload: {
            todolistId,
            taskId,
            newTaskStatus

        }
    } as const
}
export const changeTaskTitleAC = (todolistId: string, taskId: string, newTaskTitle: string) => {
    return {
        type: "CHANGE-TASK-TITLE",
        payload: {
            todolistId,
            taskId,
            newTaskTitle

        }
    } as const
}





