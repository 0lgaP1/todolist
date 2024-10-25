import {TasksStateType} from "../App";
import {v1} from "uuid";

type RemoveTaskActionType = {
    type: "REMOVE-TASK",
    payload: {
        todolistId: string,
        taskId: string
    }
}

type AddTaskActionType = {
    type: "ADD-TASK",
    payload: {
        taskId: string,
        todolistId: string
    }

}

type ActionsType =
    | RemoveTaskActionType
    | AddTaskActionType

export const tasksReducer = (state: TasksStateType, action: ActionsType): TasksStateType => {
    switch (action.type) {
        case 'REMOVE-TASK': {
            const stateCopy = {...state};
            const tasks = state[action.payload.todolistId];
            const filteredTasks = tasks.filter(t => t.id !== action.payload.taskId)
            stateCopy[action.payload.todolistId] = filteredTasks;
            return stateCopy
        }
        case 'ADD-TASK': {
            // const newTask = {
            //     id: v1(),
            //     title: title,
            //     isDone: false,
            // }
            //     [todolistId]: [newTask, ...tasks[todolistId]]
            return {...state};
        }
        default:
            throw new Error("Don't know this case")
    }
}

export const removeTaskAC = (taskId: string, todolistId: string): RemoveTaskActionType => {
    return {
        type: "REMOVE-TASK",
        payload: {
            taskId,
            todolistId
        }
    }
}
export const addTaskAC = (taskId: string, todolistId: string): AddTaskActionType => {
    return {
        type: "ADD-TASK",
        payload: {
            taskId,
            todolistId
        }
    }
}