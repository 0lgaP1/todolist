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

function App() {
//Data
// BLL

    // const todoListTitle: string = "What to read"
    const [tasks, setTasks] = useState([
        {id: v1(), title: "HTML", isDone: true},
        {id: v1(), title: "JS/TS", isDone: true},
        {id: v1(), title: "React", isDone: false},
        {id: v1(), title: "Redux", isDone: false},
        {id: v1(), title: 'Typescript', isDone: false},
        {id: v1(), title: 'RTK query', isDone: false},
    ])

    let [todoLists, setTodoLists] = useState<Array<TodoListType>>([
        {id: v1(), title: "What to read", filter: "all"},
        {id: v1(), title: "What to learn", filter: "completed"},
    ])
// change logic:
// create form CRUD operations - addTask
    const addTask = (title: string) => {
        setTasks([{id: v1(), title, isDone: false}, ...tasks])
    }
// U update from CRUD - changeTaskStatus
    const changeTaskStatus = (taskId: string, newIsDoneValue: boolean) => {

        // const taskForUpdate: TaskType | undefined = tasks.find(t => t.id === taskId)
        //if(taskForUpdate){
        //        taskForUpdate.isDone = !taskForUpdate.isDone
        //        }
        //setTasks([...tasks]) - метод find работает имутабельно, но, в отл от filter, не создает новый массив, содержащий 1 таску, а только новый объект с 1 таской -> лучше для оптимизации
        const nextState: Array<TaskType> = tasks.map(t => t.id === taskId ? {...t, isDone: newIsDoneValue} : t)
        setTasks(nextState)
    }
// D delete from CRUD - removeTask
    const removeTask = (taskId: string) => {
        const nextState: any = []
        for (let i = 0; i < tasks.length; i++) {
            if (tasks[i].id != taskId) {
                nextState.push(tasks[i])
            }
        }
        console.log(nextState)
        setTasks(nextState)
    }
    const changeFilter = (value: FilterValuesType, todolistId: string) => {

        const newTodolists = todoLists.map(tl => {
            return tl.id === todolistId ? {...tl, filter:value} : tl
        })
        setTodoLists(newTodolists)
    }
// UI:

    <div className="App">
        {todoLists.map(tl => {
                let tasksForTodolist = tasks

                if (tl.filter === 'active') {
                    tasksForTodolist = tasks.filter(task => !task.isDone)
                }
                if (tl.filter === 'completed') {
                    tasksForTodolist = tasks.filter(task => task.isDone)
                }

                return (
                    <Todolist
                        key={tl.id}
                        todolistId={tl.id}
                        title={tl.title}
                        tasks={tasks}
                        addTask={addTask}
                        removeTask={removeTask}
                        changeTaskStatus={changeTaskStatus}
                        changeFilter={changeFilter}
                        filter={tl.filter}
                    />
                )
            }
        )
        }
    </div>
}

export default App;
