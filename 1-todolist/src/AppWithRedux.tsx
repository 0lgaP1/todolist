import React from 'react';
import './App.css';
import {CssBaseline, ThemeProvider} from "@mui/material";
import {useSelector} from "react-redux";
import {RootState} from "./state/store";
import {ThemeMode} from "./app/app-reducer";
import {getTheme} from "./common/theme/theme";
import Header from "./Header";
import Main from "./Main";

const AppWithRedux = () => {

    const themeMode = useSelector<RootState, ThemeMode>((state: RootState) => state.theme.themeMode)
    return (
        <ThemeProvider theme={getTheme(themeMode)}>
            <CssBaseline/>
            <Header/>
            <Main/>
        </ThemeProvider>
    );
}

export default AppWithRedux;
