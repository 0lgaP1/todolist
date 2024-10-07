import {FilterValuesType, TodoListType} from "../App";
import {v1} from "uuid";

export type RemoveTodolistActionType = {
    type: 'REMOVE-TODOLIST'
    payload: {
        id: string
    }
}
export type AddTodolistActionType = {
    type: 'ADD-TODOLIST',
    payload: {
        title: string,
        id: string
    },
}
export type ChangeTodolistTitleActionType = {
    type: 'CHANGE-TODOLIST-TITLE',
    payload: {
        id: string,
        title: string,
    },
}
export type ChangeTodolistFilterActionType = {
    type: 'CHANGE-TODOLIST-FILTER',
    payload: {
        id: string,
        filter: FilterValuesType,
    },
}
type ActionsType =
    | RemoveTodolistActionType
    | AddTodolistActionType
    | ChangeTodolistTitleActionType
    | ChangeTodolistFilterActionType

let todolistID1 = v1()
let todolistID2 = v1()

const initialState: TodoListType[] = [
    {id: todolistID1, title: 'What to learn', filter: 'all'},
    {id: todolistID2, title: 'What to buy', filter: 'all'},
]

export const todolistsReducer = (state: TodoListType[] = initialState, action: ActionsType): TodoListType[] => {
    switch (action.type) {
        case 'REMOVE-TODOLIST': {
            return state.filter(tl => tl.id !== action.payload.id)
        }
        case 'ADD-TODOLIST': {
            return [{id: v1(), title: action.payload.title, filter: 'all'}, ...state];
        }
        case 'CHANGE-TODOLIST-TITLE': {
            // let task = state.find(t => t.id === action.payload.id);
            // if (task) {
            //     task.title = action.payload.title;
            // }
            // return [...state]
            return state.map(tl => tl.id === action.payload.id ? {...tl, title: action.payload.title} : tl)
        }
        case 'CHANGE-TODOLIST-FILTER': {
            return state.map(tl => tl.id === action.payload.id ? {...tl, filter: action.payload.filter} : tl)
        }
        default:
            throw new Error("I don't understand this action type")
    }
}
export const RemoveTodoListAC = (id: string): RemoveTodolistActionType => {
    return {
        type: "REMOVE-TODOLIST",
        payload: {
            id: id
        }
    }
}
export const AddTodoListAC = (title: string, id: string): AddTodolistActionType => {
    return {
        type: "ADD-TODOLIST",
        payload: {
            title: title,
            id: id,
        }
    }
}
export const ChangeTodoListTitleAC = (id: string, title: string): ChangeTodolistTitleActionType => {
    return {
        type: "CHANGE-TODOLIST-TITLE",
        payload: {
            id: id,
            title: title
        }
    }
}
export const ChangeTodoListFilterAC = (id: string, filter: FilterValuesType): ChangeTodolistFilterActionType => {
    return {
        type: "CHANGE-TODOLIST-FILTER",
        payload: {
            id: id,
            filter: filter
        }
    }
}