import React from 'react';
import './App.css';
import {CssBaseline, ThemeProvider} from "@mui/material";
import {useSelector} from "react-redux";
import {RootState} from "./state/store";
import {ThemeMode} from "./app/app-reducer";
import {getTheme} from "./common/theme/theme";
import Header from "./Header";
import Main from "./Main";

export type FilterValuesType = 'all' | 'active' | 'completed'
export type TaskType = {
    id: string
    title: string
    isDone: boolean
}
export type TodoListType = {
    id: string
    title: string
    filter: FilterValuesType
}
export type TasksStateType = {
    [key: string]: TaskType[]
}

function AppWithRedux() {

    const themeMode = useSelector<RootState, ThemeMode>((state: RootState) => state.theme.themeMode)
    // const tasks = useReducer(tasksReducer, {
    //     [todolist1]: [
    //         {id: v1(), title: "HTML", isDone: true},
    //         {id: v1(), title: "JS/TS", isDone: true},
    //         {id: v1(), title: "React", isDone: false},
    //         {id: v1(), title: "Redux", isDone: false},
    //         {id: v1(), title: 'Typescript', isDone: false},
    //         {id: v1(), title: 'RTK query', isDone: false},
    //     ],
    //     [todolist2]: [
    //         {id: v1(), title: 'Typescript', isDone: true},
    //         {id: v1(), title: 'RTK query', isDone: true},
    //     ]
    // });
    //
    // let [todoLists, dispatchTotodolistReducer] = useReducer(todolistsReducer, [
    //     {id: todolist1, title: "What to read", filter: "all"},
    //     {id: todolist2, title: "What to learn", filter: "all"},
    // ]); - эти два стэйта были нужны для useReducer, Redux хранит значения в reducers у себя
    // const theme = getTheme(themeMode);
    // const changeModeHandler = () => {
    //     dispatch(changeThemeAC(themeMode === 'light' ? 'dark' : 'light'));
    // }; вынесла в отдельную компоненту Header

    return (
        <ThemeProvider theme={getTheme(themeMode)}>
            <CssBaseline/>
            <Header/>
            <Main/>
        </ThemeProvider>
    );
}

export default AppWithRedux;
