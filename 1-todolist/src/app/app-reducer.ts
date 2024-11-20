export type ThemeMode = 'dark' | 'light'

type InitialState = typeof initialState
const initialState = {
    themeMode: 'light' as ThemeMode,
}

// Actions types В 1 ОЧЕРЕДЬ УКАЗАЛА ТИП КАК В РЕДЬЮСЕРЕ И ТЕМА КАК ДАРК ИЛИ ЛАЙТ
type ChangeThemeActionType = {
    themeMode: ThemeMode,
    type: 'CHANGE_THEME'
}

type ActionsType = ChangeThemeActionType // место для других типов действий

export const appReducer = (
    state: InitialState = initialState,
    action: ActionsType
): InitialState => {
    switch (action.type) {
        case 'CHANGE_THEME':
            return {
                ...state, themeMode: action.themeMode
            };
        default:
            return state
    }
}

// Action creators ВО-ВТОРЫХ ЭКШН КРЕЭЙТОР ДОЛЖЕН ВЕРНУТЬ ОБЪЕКТ ДЕЙСТВИЯ
export const changeThemeAC = (themeMode: ThemeMode): ChangeThemeActionType => {
    return {type: "CHANGE_THEME", themeMode}
}


