import { v1 } from "uuid";
import { FilterValueType, TodolistsType } from "../App";


export const todolistReducer = (state: TodolistsType[], action: todolistReducerType): TodolistsType[] => {
    switch (action.type) {
        case 'REMOVE-TODOLIST': {
            return state.filter(tl => tl.id !== action.payload.todolistId)
        }
        case 'ADD-TODOLIST': {
            //  let newTodolistId = '5735673'
             let newTodolist: TodolistsType = { id: action.payload.todolistId, title: action.payload.newTile, filter: 'All' }
             return [...state, newTodolist]
            // setTodolists([newTodolist, ...todolists])
            // setTasks({ ...tasks, [newTodolistId]: [] })

        }
        case 'CHANGE-TODOLIST-TITLE' : {
            // setTodolists(todolists.map(tl => tl.id === todolistId ? { ...tl, title: newTitle } : tl))
            return state.map(tl => tl.id === action.payload.todolistId ? { ...tl, title: action.payload.newTile } : tl)
        }
        case 'CHANGE-TODOLIST-FILTER' : {
            // setTodolists(todolists.map((tl) => tl.id === todolistId ? { ...tl, filter: nextFilterValue } : tl))
            return state.map((tl) => tl.id === action.payload.todolistId ? { ...tl, filter: action.payload.nextFilterValue } : tl)
        }
        default: return state
    }
}



type todolistReducerType = RemoveTodolistACType | AddTodolistACType |ChangeTodolistTitleACType | changeTodolistFilterACType
export type RemoveTodolistACType = ReturnType<typeof removeTodolistAC>
export type AddTodolistACType = ReturnType<typeof addTodolistAC>
type ChangeTodolistTitleACType = ReturnType<typeof changeTodolistTitleAC>
type changeTodolistFilterACType = ReturnType<typeof changeTodolistFilterAC>

export const removeTodolistAC = (todolistId: string) => {
    return {
        type: "REMOVE-TODOLIST",
        payload: {
            todolistId
        }
    } as const
}
export const addTodolistAC = (newTile: string) => {
    return {
        type: "ADD-TODOLIST",
        payload: {
            todolistId: v1(),
            newTile
        }
    } as const
}
export const changeTodolistTitleAC = (todolistId: string, newTile: string) => {
    return {
        type: 'CHANGE-TODOLIST-TITLE',
        payload: {
            todolistId, 
            newTile
        }
    } as const
}
export const changeTodolistFilterAC = (todolistId: string, nextFilterValue: FilterValueType) => {
    return {
        type: 'CHANGE-TODOLIST-FILTER',
        payload: {
            todolistId, 
            nextFilterValue
        }
    } as const
}