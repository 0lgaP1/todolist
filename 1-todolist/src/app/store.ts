import { combineReducers, createStore } from "redux";
import { tasksReducer } from "../state/tasks-reducer";
import { todolistsReducer } from "../state/todolists-reducer";
import {appReducer} from "./app-reducer";

// Комбинируем редьюсеры
const rootReducer = combineReducers({
    tasks: tasksReducer,
    todolists: todolistsReducer,
    theme: appReducer,
});

// Определяем тип состояния всего приложения
export type RootState = ReturnType<typeof rootReducer>;

// Создаем store с помощью createStore
export const store = createStore(rootReducer); //configureStore для redux-toolkit, но тогда нужно переписывать редьюсеры с использованием createSlice

// Делаем стор доступным через окно для отладки
// @ts-ignore
window.store = store;
