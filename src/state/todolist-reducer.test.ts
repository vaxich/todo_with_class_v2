// import { FilterValueType, TodolistsType } from "../App"
// import { addTodolistAC, changeTodolistFilterAC, changeTodolistTitleAC, removeTodolistAC, todolistReducer } from "./todolist-reducer"

import { v1 } from "uuid"
import { FilterValueType, TodolistsType } from "../App"
import { addTodolistAC, changeTodolistFilterAC, changeTodolistTitleAC, removeTodolistAC, todolistReducer } from "./todolist-reducer"

test('correct todolist should be removed', () => {
    let todolistId1 = '67657456'
    let todolistId2 = '57465754'

    const startState: TodolistsType[] = [
        {id: todolistId1, title: 'What to learn', filter: 'All'},
        {id: todolistId2, title: 'What to buy', filter: 'All'}
    ]

    const endState = todolistReducer(startState, removeTodolistAC(todolistId1))
    expect(endState.length).toBe(1)
    expect(endState[0].id).toBe(todolistId2)
})

test('correct todolist should be added', () => {
    let todolistId1 = v1()
    let todolistId2 = v1()

    let newTodolistTitle = "New Todolist"

    const startState: TodolistsType[] = [
        {id: todolistId1, title: 'What to learn', filter: 'All'},
        {id: todolistId2, title: 'What to buy', filter: 'All'}
    ]

    const endState = todolistReducer(startState, addTodolistAC(newTodolistTitle))

    expect(endState.length).toBe(3)
    expect(endState[2].title).toBe(newTodolistTitle)
    expect(endState[2].filter).toBe('All')
})

test("correct todolist should change its name", () => {
    let todolistId1 = '6754674567'
    let todolistId2 = '4375537475'

    let newTodolistTitle = "New Todolist"

    const startState: TodolistsType[] = [
        {id: todolistId1, title: 'What to learn', filter: 'All'},
        {id: todolistId2, title: 'What to buy', filter: 'All'}
    ]

    

    const endState = todolistReducer(startState, changeTodolistTitleAC(todolistId2 , newTodolistTitle))

    expect(endState[0].title).toBe('What to learn')
    expect(endState[1].title).toBe(newTodolistTitle)
})

test("correct filter of todolist should be change", () => {
    let todolistId1 = '56345645'
    let todolistId2 = '6745675'

    let newFilter: FilterValueType = "Completed"

    const startState: TodolistsType[] = [
        {id: todolistId1, title: 'What to learn', filter: 'All'},
        {id: todolistId2, title: 'What to buy', filter: 'All'}
    ]

    

    const endState = todolistReducer(startState, changeTodolistFilterAC(todolistId2, newFilter))

    expect(endState[0].filter).toBe('All')
    expect(endState[1].filter).toBe(newFilter)
})


function uuidv1() {
    throw new Error("Function not implemented.")
}

