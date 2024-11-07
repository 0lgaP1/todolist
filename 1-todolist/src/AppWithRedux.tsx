import React, {useReducer, useState} from 'react';
import './App.css';
import {Todolist} from "./Todolist";
import {v1} from "uuid";
import {AddItemForm} from "./AddItemForm";
import {
    AppBar,
    Container,
    createTheme,
    CssBaseline,
    Grid,
    Paper,
    Switch,
    ThemeProvider,
    Toolbar
} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import MenuIcon from '@mui/icons-material/Menu'
import {MenuButton} from "./MenuButton";
import {
    addTodoListAC,
    changeTodoListFilterAC,
    changeTodoListTitleAC,
    removeTodoListAC,
    todolistsReducer
} from "./state/todolists-reducer";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer} from "./state/tasks-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootState} from "./state/store";
//crud:
//c - create
//r - read (view mode, filter, sort, search, pagination)
//u - update (change task title, change task status : isDone)
//d - delete
export type FilterValuesType = 'all' | 'active' | 'completed'
export type TaskType = {
    id: string
    title: string
    isDone: boolean
}
export type TodoListType = {
    id: string
    title: string
    filter: FilterValuesType
}
export type TasksStateType = {
    [key: string]: TaskType[]
}

function AppWithRedux() {
//Data
// BLL

    let todolist1 = v1();
    let todolist2 = v1();


    const dispatch = useDispatch();//react-redux
    const todolists = useSelector<AppRootState, Array<TodoListType>>( state => state.todolists )
    const tasks = useSelector<AppRootState, TasksStateType>( state => state.tasks )

    // const tasks = useReducer(tasksReducer, {
    //     [todolist1]: [
    //         {id: v1(), title: "HTML", isDone: true},
    //         {id: v1(), title: "JS/TS", isDone: true},
    //         {id: v1(), title: "React", isDone: false},
    //         {id: v1(), title: "Redux", isDone: false},
    //         {id: v1(), title: 'Typescript', isDone: false},
    //         {id: v1(), title: 'RTK query', isDone: false},
    //     ],
    //     [todolist2]: [
    //         {id: v1(), title: 'Typescript', isDone: true},
    //         {id: v1(), title: 'RTK query', isDone: true},
    //     ]
    // });
    //
    // let [todoLists, dispatchTotodolistReducer] = useReducer(todolistsReducer, [
    //     {id: todolist1, title: "What to read", filter: "all"},
    //     {id: todolist2, title: "What to learn", filter: "all"},
    // ]); - эти два стэйта были нужны для useReducer, Redux хранит значения в reducers у себя

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

    type ThemeMode = 'dark' | 'light'; //dark or light theme mode from MUI
    const [themeMode, setThemeMode] = useState<ThemeMode>('light')
    const theme = createTheme({
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
    const changeModeHandler = () => {
        setThemeMode(themeMode == 'light' ? 'dark' : 'light')
    }

    return (
    <ThemeProvider theme={theme}>
        <CssBaseline/>
        <div>
            <AppBar position="static" sx={{mb: '30px'}}>
                <Toolbar sx={{display: 'flex', justifyContent: 'space-between'}}>
                    <IconButton color="inherit">
                        <MenuIcon/>
                    </IconButton>
                    <div>
                        <MenuButton>Login</MenuButton>
                        <MenuButton>FAQ</MenuButton>
                        <MenuButton background={'#456789'}>Logout</MenuButton>
                        <Switch color={'default'} onChange={changeModeHandler}/>
                    </div>
                </Toolbar>
            </AppBar>
            <Container fixed>
                <Grid container sx={{mb: '30px'}}>
                    <AddItemForm addItem={addTodolist}/>
                </Grid>
                <Grid container spacing={5}>
                    {todolists.map(todolist => {
                        const allTodolistTasks = tasks[todolist.id]
                        let tasksForTodolist = allTodolistTasks
                        if (todolist.filter === 'active') {
                            tasksForTodolist = allTodolistTasks.filter(task => !task.isDone)
                        }
                        if (todolist.filter === 'completed') {
                            tasksForTodolist = allTodolistTasks.filter(task => task.isDone)
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
    </ThemeProvider>
)
    ;
}

export default AppWithRedux;
