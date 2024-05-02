import React, {useState} from 'react';
import './App.css';
import {TaskType, Todolist} from "./Todolist";

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

    return (
        <div className="App">
            <Todolist title="What to read"
                      tasks={tasks}
                      removeTask={removeTask}/>
        </div>
    );
}

export default App;
