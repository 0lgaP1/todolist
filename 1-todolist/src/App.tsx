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
function App() {
//Data
// BLL
    const todoListTitle: string = "What to read"
    const [tasks, setTasks] = useState([
        {id: v1(), title: "HTML", isDone: true},
        {id: v1(), title: "JS/TS", isDone: true},
        {id: v1(), title: "React", isDone: false},
        {id: v1(), title: "Redux", isDone: false},
        {id: v1(), title: 'Typescript', isDone: false},
        {id: v1(), title: 'RTK query', isDone: false},
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

// UI:
      return (
        <div className="App">
            <Todolist title={todoListTitle}
                      tasks={tasks}
                      addTask={addTask}
                      removeTask={removeTask}
                      changeTaskStatus={changeTaskStatus}
                      //changeFilter={changeFilter}
            />
        </div>
    );
}

export default App;
