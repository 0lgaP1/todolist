import React, {useState} from 'react';
import './App.css';
import {TaskType, Todolist} from "./Todolist";
import {v1} from "uuid";

function App() {

// const TodoListTitle = ["What to read", "What to buy", "What to learn", "What to listen"]
    let [tasks, setTasks] = useState<TaskType[]>([
        {id: v1(), title: "HTML", isDone: true},
        {id: v1(), title: "JS/TS", isDone: true},
        {id: v1(), title: "React", isDone: false},
        {id: v1(), title: "Redux", isDone: false},
        {id: v1(), title: 'Typescript', isDone: false},
        {id: v1(), title: 'RTK query', isDone: false},
    ])
    type filterNamingType = 'all' | 'active' | 'completed'
    const [filter, setFilter] = useState<filterNamingType>('all')
    const [taskTitle, setTaskTitle] = useState("")
    console.log(taskTitle)

    const changeFilter = (filter: filterNamingType) => {
        setFilter(filter)
    }

    const addTask = (title: string) => {
        const newTask: TaskType = {
            id: v1(),
            title: title,
            isDone: false,
        }
        const newTaskState = [newTask, ...tasks]
        setTasks(newTaskState)
    }
    const removeTask = (taskId: string) => {
        const filteredTasks = tasks.filter(task => {
            return task.id !== taskId
        })
        setTasks(filteredTasks)
    }

    const addTaskHandler = () => {
    }

    return (
        <div className="App">
            <Todolist title="What to read"
                      tasks={tasksForTodolist}
                      addTask={addTask}
                      removeTask={removeTask}
                      changeFilter={changeFilter}/>
        </div>
    );
}

export default App;
