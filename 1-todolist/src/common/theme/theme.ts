import {createTheme} from "@mui/material";
import {changeThemeAC, ThemeMode} from "../../app/app-reducer";


export const getTheme = (themeMode: ThemeMode) => {
    return createTheme({
        palette: {
            mode: themeMode === 'light' ? 'light' : 'dark',
            primary: {
                main: '#087EA4',
            },

            secondary: {
                main: 'rgba(32,56,238,0.55)'
            }
        }
    })
}

