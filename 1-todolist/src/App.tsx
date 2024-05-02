import React, {useState} from 'react';
import './App.css';
import {TaskType, Todolist} from "./Todolist";

export type filterNamingType = 'all' | 'active' | 'completed'

function App() {
    // const TodoListTitle = ["What to read", "What to buy", "What to learn", "What to listen"]
    let [tasks, setTasks] = useState<TaskType[]>([
        {id: 1, title: "HTML", isDone: true},
        {id: 2, title: "JS/TS", isDone: true},
        {id: 3, title: "React", isDone: false},
        {id: 4, title: "Redux", isDone: false},
        {id: 5, title: 'Typescript', isDone: false},
        {id: 6, title: 'RTK query', isDone: false},
    ])
    const removeTask = (taskId: number) => {
        const filteredTasks = tasks.filter(task => {
            return task.id !== taskId
        })
        setTasks(filteredTasks)
    }

    const [filter, setFilter] = useState<filterNamingType>('all')
    let tasksForTodolist = tasks
    if (filter === 'active') {
        tasksForTodolist = tasks.filter(task => !task.isDone) // task.isDone === false
    }
    if (filter === 'completed') {
        tasksForTodolist = tasks.filter(task => task.isDone) // task.isDone === true
    }

    const changeFilter = (filter: filterNamingType) => {
        setFilter(filter)
    }

    return (
        <div className="App">
            <Todolist title="What to read"
                      tasks={tasksForTodolist}
                      removeTask={removeTask}
                      changeFilter={changeFilter}/>
        </div>
    );
}


export default App;
