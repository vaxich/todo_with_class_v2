


import { FilterValueType, TodolistsType } from "../App"
import { addTodolistAC, changeTodolistFilterAC, changeTodolistTitleAC, removeTodolistAC, todolistReducer } from "./todolist-reducer"

let todolistId1 : string
let todolistId2 : string

let startState: TodolistsType[]

beforeEach( () => {
    const crypto = require('crypto');
     todolistId1 = crypto.randomUUID()
     todolistId2 = crypto.randomUUID()

     startState = [
        {id: todolistId1, title: 'What to learn', filter: 'All'},
        {id: todolistId2, title: 'What to buy', filter: 'All'}
    ]
})



test('correct todolist should be removed', () => {  
   

    const endState = todolistReducer(startState, removeTodolistAC(todolistId1))
    expect(endState.length).toBe(1)
    expect(endState[0].id).toBe(todolistId2)
})

test('correct todolist should be added', () => {
    

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
    

    let newFilter: FilterValueType = "Completed"

    const startState: TodolistsType[] = [
        {id: todolistId1, title: 'What to learn', filter: 'All'},
        {id: todolistId2, title: 'What to buy', filter: 'All'}
    ]

    

    const endState = todolistReducer(startState, changeTodolistFilterAC(todolistId2, newFilter))

    expect(endState[0].filter).toBe('All')
    expect(endState[1].filter).toBe(newFilter)
})