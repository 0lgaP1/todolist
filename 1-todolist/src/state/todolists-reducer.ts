import {TodoListType} from "../App";
import {v1} from "uuid";
type ActionType = {
    type: string
    [key: string]: any
    payload: any
}

let todolistID1 = v1()
let todolistID2 = v1()

const initialState: TodoListType[] = [
    { id: todolistID1, title: 'What to learn', filter: 'all' },
    { id: todolistID2, title: 'What to buy', filter: 'all' },
]

export const todolistsReducer = (state: TodoListType[] = initialState, action: ActionType): TodoListType[] => {
    switch (action.type) {
        case 'REMOVE-TODOLIST': {
                return state.filter(tl => tl.id !== action.payload.id)
            }
        case 'ADD-TODOLIST': {
                return [{ id: action.payload.id, title: action.payload.title, filter: 'all' }, ...state];
        }
        case 'CHANGE-TODOLIST-TITLE': {
            let task = state.find(t => t.id === action.id);
            if (task) {
                task.title = action.payload.title;
            }
            return [...state]

        }
        default:
            throw new Error("I don't understand this action type")
    }
}

/*
state[1].id === action.payload.id ? { ...state} : state))*/
