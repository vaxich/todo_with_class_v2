import { useState } from "react";
import { TodolistsType } from "../App";
import { removeTodolistAC, todolistReducer } from "./todolist-reducer";


test('remove todolist', () => {
    let todoistId1 = crypto.randomUUID();
    let todoistId2 = crypto.randomUUID();


    const [startState, setTodolists] = useState<TodolistsType[]>([
        { id: todoistId1, title: "what to learn", filter: 'All', },
        { id: todoistId2, title: "what to buy", filter: 'Completed', },
    ]);

    const endState = todolistReducer(startState,  removeTodolistAC(todoistId1));

    expect(endState.length).toBe(1);
    expect(endState[0].id).toBe(todoistId2);
})

