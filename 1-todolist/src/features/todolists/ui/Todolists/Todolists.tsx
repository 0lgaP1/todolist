import React from 'react';
import {
    addTodoListAC,
    changeTodoListFilterAC, changeTodoListTitleAC,
    FilterValuesType,
    removeTodoListAC,
    TodoListType
} from "../../../../state/todolists-reducer";
import {
    addTaskAC,
    changeTaskStatusAC,
    changeTaskTitleAC,
    removeTaskAC,
    TasksStateType,
    TaskType
} from "../../../../state/tasks-reducer";
import {Grid, Paper} from "@mui/material";
import {Todolist} from "./Todolist/Todolist";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../../../app/store";
import {v1} from "uuid";

const Todolists = () => {
    const todolists = useSelector<RootState, Array<TodoListType>>((state: RootState) => state.todolists)
    const tasks = useSelector<RootState, TasksStateType>((state: RootState) => state.tasks)
    const dispatch = useDispatch();//react-redux
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

    const changeFilter = (filter: FilterValuesType, id: string) => {
        dispatch(changeTodoListFilterAC(id, filter))
    };

    const changeTodolistTitle = (id: string, title: string) => {
        console.log(`Changing title for id: ${id}, new title: ${title}`);
        dispatch(changeTodoListTitleAC(id, title))
    }
    /* return должен быть внутри JSX. Нужно вернуть todolists.map в одну обертку*/
    return (
        <Grid container spacing={3}>
        {todolists.map((todolist: TodoListType) => {
                const allTodolistTasks = tasks[todolist.id]
                let tasksForTodolist = allTodolistTasks
                if (todolist.filter === 'active') {
                    tasksForTodolist = allTodolistTasks.filter((task: TaskType) => !task.isDone)
                }
                if (todolist.filter === 'completed') {
                    tasksForTodolist = allTodolistTasks.filter((task: TaskType) => task.isDone)
                }

                return (
                    <Grid item>
                    <Paper sx={{p: '0 20px 20px 20px'}}>
                        <Todolist
                            key={todolist.id}
                            // tl={todolist}
                            todolistId={todolist.id} //
                            title={todolist.title} //
                            tasks={tasksForTodolist}
                            addTask={addTask}
                            removeTask={removeTask}
                            changeTaskStatus={changeTaskStatus}
                            changeTaskTitle={changeTaskTitle}
                            changeFilter={changeFilter}
                            filter={todolist.filter} //
                            removeTodolist={removeTodolist}
                            changeTodolistTitle={changeTodolistTitle}
                        />
                    </Paper>
                </Grid>
                );
            })}
        </Grid>
    );
};

export default Todolists;