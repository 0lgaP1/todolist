import React, {useState} from 'react';
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

function App() {
//Data
// BLL

    let todolist1 = v1();
    let todolist2 = v1();

    const [tasks, setTasks] = useState<TasksStateType>({
        [todolist1]: [
            {id: v1(), title: "HTML", isDone: true},
            {id: v1(), title: "JS/TS", isDone: true},
            {id: v1(), title: "React", isDone: false},
            {id: v1(), title: "Redux", isDone: false},
            {id: v1(), title: 'Typescript', isDone: false},
            {id: v1(), title: 'RTK query', isDone: false},
        ],
        [todolist2]: [
            {id: v1(), title: 'Typescript', isDone: true},
            {id: v1(), title: 'RTK query', isDone: true},
        ]
    });

    let [todoLists, setTodoLists] = useState<Array<TodoListType>>([
        {id: todolist1, title: "What to read", filter: "all"},
        {id: todolist2, title: "What to learn", filter: "all"},
    ]);

    let removeTodolist = (todolistId: string) => {
        let filteredTodolist = todoLists.filter(tl => tl.id !== todolistId)
        setTodoLists(filteredTodolist);
        delete tasks[todolistId];
        setTasks({...tasks});
    }
// change logic:
// create form CRUD operations - addTask
    const addTask = (title: string, todolistId: string) => {
        const newTask = {
            id: v1(),
            title: title,
            isDone: false,
        }
        setTasks({
            ...tasks,
            [todolistId]: [newTask, ...tasks[todolistId]]
        });
    };
    // D delete from CRUD - removeTask
    const removeTask = (taskId: string, todolistId: string) => {
        // const nextState: any = []
        // for (let i = 0; i < tasks.length; i++) {
        //     if (tasks[i].id != taskId) {
        //         nextState.push(tasks[i])
        //     }
        // } // GPT предлагает заменить на
        // console.log(nextState)
        // setTasks(nextState)
        setTasks({
            ...tasks,
            [todolistId]: tasks[todolistId].filter(t => t.id !== taskId)
        })
    };
    const changeFilter = (filter: FilterValuesType, todolistId: string) => {
        setTodoLists(todoLists.map(tl => (tl.id === todolistId ? {...tl, filter} : tl)))
    };
// U update from CRUD - changeTaskStatus, changeTaskTitle
    const changeTaskStatus = (taskId: string, newIsDoneValue: boolean, todolistId: string) => {
        let todolistTasks = tasks[todolistId];
        let task = todolistTasks.find(t => t.id === taskId);
        if (task) {
            task.isDone = newIsDoneValue;
            setTasks({...tasks});
        }
    };

    const changeTaskTitle = (taskId: string, newTitle: string, todolistId: string) => {
        let todolistTasks = tasks[todolistId];
        let task = todolistTasks.find(t => t.id === taskId);
        if (task) {
            task.title = newTitle;
            setTasks({...tasks});
        }
    };

// UI:
    function addTodolist(title: string) {
        let todolist: TodoListType = {
            id: v1(),
            filter: 'all',
            title: title,
        };
        setTodoLists([todolist, ...todoLists]);
        setTasks({
            ...tasks,
            [todolist.id]: []
        })
    }

    const changeTodolistTitle = (id: string, title: string) => {
        // let task = todolistTasks.find(t => t.id === .id);
        // if (task) {
        //     .title = action.payload.title;
        // }
        // return [...tasks]

        setTodoLists(
            todoLists.map(tl => tl.id === id ? {...tl, title: title} : tl)
        );
    }
    type ThemeMode = 'dark' | 'light'
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
                    {todoLists.map(tl => {
                        const allTodolistTasks = tasks[tl.id]
                        let tasksForTodolist = allTodolistTasks
                        if (tl.filter === 'active') {
                            tasksForTodolist = allTodolistTasks.filter(task => !task.isDone)
                        }
                        if (tl.filter === 'completed') {
                            tasksForTodolist = allTodolistTasks.filter(task => task.isDone)
                        }

                        return <Grid item>
                            <Paper sx={{p: '0 20px 20px 20px'}}>
                                <Todolist
                                    key={tl.id}
                                    todolistId={tl.id}
                                    title={tl.title}
                                    tasks={tasksForTodolist}
                                    addTask={addTask}
                                    removeTask={removeTask}
                                    changeTaskStatus={changeTaskStatus}
                                    changeTaskTitle={changeTaskTitle}
                                    changeFilter={changeFilter}
                                    filter={tl.filter}
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

export default App;
