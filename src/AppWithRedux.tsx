
import { useCallback } from 'react';
import './App.css';

import { AddItemForm } from './AddItemForm';

import ButtonAppBar from './ButtonAppBar';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { addTodolistAC} from './state/todolist-reducer';


import { useDispatch, useSelector } from 'react-redux';
import { RootState } from './state/store';
import { TodolistWithRedux } from './TodolistWithRedux';

export type TodolistsType = {
    todolistId: string
    title: string
    filter: FilterValueType
}
export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

export type TasksStateType = {
    [key: string]: TaskType[]
}

export type FilterValueType = "All" | "Active" | "Completed";

function AppWithRedux() {

    let todolists = useSelector<RootState, Array<TodolistsType>>(state => state.todolists)    

    const dispatch = useDispatch()   

    const addTodolist = useCallback( (newTile: string) => {
        dispatch(addTodolistAC(newTile))
    } , [dispatch])    

    return (
        <div className="App">
            <ButtonAppBar />
            <Container fixed >
                <Grid container spacing={3}>
                    <AddItemForm onClick={addTodolist} />
                </Grid>
                <Grid container >

                    {todolists.map(tl => {
                        return (
                            <Paper elevation={3} style={{ padding: '10px', margin: '10px' }}>
                                <TodolistWithRedux
                                    todolist={tl}
                                />
                            </Paper>
                        )
                    })
                    }
                </Grid>
            </Container>

        </div>
    );
}

export default AppWithRedux;
