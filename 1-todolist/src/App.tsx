import React, {useState} from 'react';
import './App.css';
import {Todolist} from "./Todolist";
import {v1} from "uuid";
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
// U update from CRUD - changeTaskStatus
    const changeTaskStatus = (taskId: string, newIsDoneValue: boolean, todolistId: string) => {
        setTasks({
            ...tasks,
            [todolistId]: tasks[todolistId].map(t => t.id == taskId ? {...t, isDone: newIsDoneValue} : t)
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
        });
    }
    const changeFilter = (filter: FilterValuesType, todolistId: string) => {
        setTodoLists(todoLists.map(tl => (tl.id === todolistId ? {...tl, filter} : tl)))
    }
// UI:
    return (
        <div className="App">
            <input/> <button>+</button>

            {todoLists.map(tl => {
                const allTodolistTasks = tasks[tl.id]
                let tasksForTodolist = allTodolistTasks
                if (tl.filter === 'active') {
                    tasksForTodolist = allTodolistTasks.filter(task => !task.isDone)
                }
                if (tl.filter === 'completed') {
                    tasksForTodolist = allTodolistTasks.filter(task => task.isDone)
                }

                return <Todolist
                    key={tl.id}
                    todolistId={tl.id}
                    title={tl.title}
                    tasks={tasksForTodolist}
                    addTask={addTask}
                    removeTask={removeTask}
                    changeTaskStatus={changeTaskStatus}
                    changeFilter={changeFilter}
                    filter={tl.filter}
                    removeTodolist={removeTodolist}
                />
            })}
        </div>
    );
}

export default App;
