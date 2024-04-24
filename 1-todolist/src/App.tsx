import React from 'react';
import './App.css';
import {TaskType, Todolist} from "./Todolist";

function App () {

    const TodoListTitle = ["What to read", "What to buy", "What to learn", "What to listen"]

    const tasks0: Array<any> = []
    const tasks1: Array<TaskType> = [
        {id: 1, title: "HTML", isDone: true},
        {id: 2, title: "JS/TS", isDone: true},
        {id: 3, title: "React", isDone: false},
        {id: 4, title: "Redux", isDone: false},
        {id: 5, title: 'Typescript', isDone: false },
        {id: 6, title: 'RTK query', isDone: false },
    ]
    const tasks2: Array<TaskType> = [
        {id: 1, title: "Hello world", isDone: true},
        {id: 2, title: "I'm happy", isDone: false},
        {id: 3, title: "Yo", isDone: false},
    ]

    const tasks3: Array<any> = []

    return (
        <div className="App">
            <Todolist title={TodoListTitle[0]} tasks={tasks0}/>
            <Todolist title={TodoListTitle[1]} tasks={tasks1} date={"23.04.2024"}/>
            <Todolist title={TodoListTitle[2]} tasks={tasks2}/>
            <Todolist title={TodoListTitle[3]} tasks={tasks3} />
        </div>
    );
}

export default App;
