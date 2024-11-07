import {combineReducers, createStore} from "redux";
import {tasksReducer} from "./tasks-reducer";
import {todolistsReducer} from "./todolists-reducer";
import {TasksStateType} from "../App";
import {TodoListPropsType} from "../Todolist";

const rootReducer = combineReducers({
    tasks: tasksReducer,
    todolists: todolistsReducer
});

// type AppRootState = {
//     todolists: Array<TodoListPropsType>,
//     tasks: TasksStateType
// }

export type AppRootState = ReturnType<typeof rootReducer>
export const store = createStore(rootReducer);

// @ts-ignore
window.store = store