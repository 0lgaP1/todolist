import {v1} from "uuid";
import {AddTodolistActionType, RemoveTodolistActionType, todolistID1, todolistID2} from "./todolists-reducer";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

export type TasksStateType = {
    [key: string]: TaskType[]
}

type RemoveTaskActionType = {
    type: "REMOVE-TASK"
    todolistId: string,
    taskId: string
}

type AddTaskActionType = {
    type: "ADD-TASK"
    title: string
    todolistId: string
}
type ChangeTaskStatusActionType = {
    type: "CHANGE-TASK-STATUS"
    isDone: boolean
    taskId: string
    todolistId: string
}

type ChangeTaskTitleActionType = {
    type: "CHANGE-TASK-TITLE"
    title: string
    taskId: string
    todolistId: string
}

type ActionsType =
    | RemoveTaskActionType
    | AddTaskActionType
    | ChangeTaskStatusActionType
    | ChangeTaskTitleActionType
    | AddTodolistActionType
    | RemoveTodolistActionType

const initialState: TasksStateType =  {
    [todolistID1]: [
    {id: v1(), title: "HTML", isDone: true},
    {id: v1(), title: "JS/TS", isDone: true},
    {id: v1(), title: "React", isDone: false},
    {id: v1(), title: "Redux", isDone: false},
    {id: v1(), title: 'Typescript', isDone: false},
    {id: v1(), title: 'RTK query', isDone: false},
],
    [todolistID2]: [
    {id: v1(), title: 'Typescript', isDone: true},
    {id: v1(), title: 'RTK query', isDone: true},
]}

export const tasksReducer = (state: TasksStateType = initialState, action: ActionsType): TasksStateType => {
    switch (action.type) {
        case 'REMOVE-TASK': {
            const stateCopy = {...state};
            const tasks = stateCopy[action.todolistId];
            const filteredTasks = tasks.filter(t => t.id !== action.taskId)
            stateCopy[action.todolistId] = filteredTasks;
            return stateCopy
        }
        case 'ADD-TASK': {
            const stateCopy = {...state};
            const tasks = stateCopy[action.todolistId];
            const newTask = {id: v1(), title: action.title, isDone: false}
            const newTasks = [newTask, ...tasks]
            stateCopy[action.todolistId] = newTasks;
            return stateCopy;
        }
        case 'CHANGE-TASK-STATUS': {
            const stateCopy = {...state};

            let tasks = stateCopy[action.todolistId];
            let task = tasks.find(t => t.id === action.taskId);
            if (task) {
                task.isDone = action.isDone;
            }
            return stateCopy;
        }
        case 'CHANGE-TASK-TITLE': {
            const stateCopy = {...state};
            let tasks = stateCopy[action.todolistId];
            let task = tasks.find(t => t.id === action.taskId);

            if (task) {
                task.title = action.title;
            }
            return stateCopy
        }
        case 'ADD-TODOLIST': {
            const stateCopy = {...state}
            stateCopy[action.todolistId] = [];
            return stateCopy
        }
        case 'REMOVE-TODOLIST' : {
            const stateCopy = {...state}
            delete stateCopy[action.id]
            return stateCopy
        }
        default:
            // throw new Error("Don't know this case")
            return state;
    }
}

export const removeTaskAC = (taskId: string, todolistId: string): RemoveTaskActionType => {
    return {
        type: "REMOVE-TASK",
        taskId,
        todolistId

    }
}
export const addTaskAC = (title: string, taskId: string, todolistId: string): AddTaskActionType => {
    return {
        type: "ADD-TASK",
        title,
        todolistId
    }
}
export const changeTaskStatusAC = (taskId: string, isDone: boolean, todolistId: string): ChangeTaskStatusActionType => {
    return {
        type: "CHANGE-TASK-STATUS",
        taskId,
        isDone,
        todolistId
    }
}

export const changeTaskTitleAC = (taskId: string, title: string, todolistId: string): ChangeTaskTitleActionType => {
    return {
        type: "CHANGE-TASK-TITLE",
        taskId,
        title,
        todolistId
    }
}