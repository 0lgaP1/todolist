import React from 'react';
import {Container, Grid, Paper} from "@mui/material";
import {AddItemForm} from "./AddItemForm";
import {Todolist} from "./Todolist";
import {FilterValuesType, TasksStateType, TaskType, TodoListType} from "./AppWithRedux";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "./state/tasks-reducer";
import {v1} from "uuid";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "./state/store";
import {ThemeMode} from "./app/app-reducer";
import {
    addTodoListAC,
    changeTodoListFilterAC,
    changeTodoListTitleAC,
    removeTodoListAC
} from "./state/todolists-reducer";

export const Main = () => {
    const dispatch = useDispatch();//react-redux
    const todolists = useSelector<RootState, Array<TodoListType>>((state: RootState) => state.todolists)
    const tasks = useSelector<RootState, TasksStateType>((state: RootState) => state.tasks)
    const themeMode = useSelector<RootState, ThemeMode>((state: RootState) => state.theme.themeMode)

    //crud:
//c - create
//r - read (view mode, filter, sort, search, pagination)
//u - update (change task title, change task status : isDone)
//d - delete

//Data
// BLL


// change logic:
// create form CRUD operations - addTask
    const addTask = (title: string, todolistId: string) => {
        const taskId = v1();
        dispatch(addTaskAC(title, taskId, todolistId)) // was: dispatchToTaskReducer
    };

// U update from CRUD - changeTaskStatus, changeTaskTitle
    const changeTaskStatus = (taskId: string, newIsDoneValue: boolean, todolistId: string) => {
        dispatch(changeTaskStatusAC(taskId, newIsDoneValue, todolistId))
    };

    const changeTaskTitle = (taskId: string, newTitle: string, todolistId: string) => {
        dispatch(changeTaskTitleAC(taskId, newTitle, todolistId))
    };
// D delete from CRUD - removeTask
    const removeTask = (taskId: string, todolistId: string) => {
        dispatch(removeTaskAC(taskId, todolistId))
    };

// UI:
    let removeTodolist = (todolistId: string) => {
        const action = removeTodoListAC(todolistId)
        dispatch(action);
    }

    function addTodolist(title: string, todolistId: string) {
        const action = addTodoListAC(title, todolistId);
        dispatch(action);
    }

    const changeFilter = (filter: FilterValuesType, id: string) => {
        dispatch(changeTodoListFilterAC(id, filter))
    };

    const changeTodolistTitle = (id: string, title: string) => {
        console.log(`Changing title for id: ${id}, new title: ${title}`);
        dispatch(changeTodoListTitleAC(id, title))
    }

    return (
        <div>
            <Container fixed>
                <Grid container sx={{mb: '30px'}}>
                    <AddItemForm addItem={addTodolist}/>
                </Grid>
                <Grid container spacing={5}>
                    {todolists.map((todolist: TodoListType) => {
                        const allTodolistTasks = tasks[todolist.id]
                        let tasksForTodolist = allTodolistTasks
                        if (todolist.filter === 'active') {
                            tasksForTodolist = allTodolistTasks.filter((task: TaskType) => !task.isDone)
                        }
                        if (todolist.filter === 'completed') {
                            tasksForTodolist = allTodolistTasks.filter((task: TaskType) => task.isDone)
                        }

                        return <Grid item>
                            <Paper sx={{p: '0 20px 20px 20px'}}>
                                <Todolist
                                    key={todolist.id}
                                    todolistId={todolist.id}
                                    title={todolist.title}
                                    tasks={tasksForTodolist}
                                    addTask={addTask}
                                    removeTask={removeTask}
                                    changeTaskStatus={changeTaskStatus}
                                    changeTaskTitle={changeTaskTitle}
                                    changeFilter={changeFilter}
                                    filter={todolist.filter}
                                    removeTodolist={removeTodolist}
                                    changeTodolistTitle={changeTodolistTitle}
                                />
                            </Paper>
                        </Grid>
                    })}
                </Grid>
            </Container>
        </div>
    );
};

export default Main;