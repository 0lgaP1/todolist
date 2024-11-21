import React from 'react';
import {Container, Grid, Paper} from "@mui/material";
import {AddItemForm} from "./AddItemForm";
import {useDispatch} from "react-redux";

import {
    addTodoListAC,
} from "./state/todolists-reducer";
import Todolists from "./Todolists";

export const Main = () => {
    const dispatch = useDispatch();//react-redux
    function addTodolist(title: string, todolistId: string) {
        const action = addTodoListAC(title, todolistId);
        dispatch(action);
    }

    return (
        <div>
            <Container fixed>
                <Grid container sx={{mb: '30px'}}>
                    <AddItemForm addItem={addTodolist}/>
                </Grid>
                <Grid container spacing={5}>
                    <Todolists />


                </Grid>
            </Container>
        </div>
    );
};

export default Main;