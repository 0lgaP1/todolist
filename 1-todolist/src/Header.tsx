import React from 'react';
import {AppBar, Switch, Toolbar} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import {MenuButton} from "./MenuButton";
import {getTheme} from "./common/theme/theme";
import {changeThemeAC, ThemeMode} from "./app/app-reducer";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "./state/store";

export const Header = () => {
    const dispatch = useDispatch();//react-redux
    const themeMode = useSelector<RootState, ThemeMode>((state: RootState) => state.theme.themeMode)
    const changeModeHandler = () => {
        dispatch(changeThemeAC(themeMode === 'light' ? 'dark' : 'light'));
    };

    return (
        <div>
            <AppBar position="static" sx={{mb: '30px'}}>
                <Toolbar sx={{display: 'flex', justifyContent: 'space-between'}}>
                    <IconButton color="inherit">
                        <MenuIcon/>
                    </IconButton>
                    <div>
                        <MenuButton>Login</MenuButton>
                        <MenuButton>FAQ</MenuButton>
                        <MenuButton background={'#456789'}>Logout</MenuButton>
                        <Switch color={'default'} onChange={changeModeHandler}/>
                    </div>
                </Toolbar>
            </AppBar>
        </div>
    );
};

export default Header;