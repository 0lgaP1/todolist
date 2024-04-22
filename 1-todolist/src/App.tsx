import React from 'react';
import './App.css';
import {Todolist} from "./Todolist";

export type TaskType = {
    id: number,
    title: string,
    isDone: boolean,
}

function App () {

    const TodoListTitle = ["What to read", "What to buy", "What to learn"]

    const tasks1: Array<TaskType> = [
        {id: 1, title: "HTML", isDone: true},
        {id: 2, title: "JS/TS", isDone: true},
        {id: 3, title: "React", isDone: false},
    ]
    const tasks2: Array<TaskType> = [
        {id: 1, title: "Hello world", isDone: true},
        {id: 2, title: "I'm happy", isDone: false},
        {id: 3, title: "Yo", isDone: false},
    ]

    return (
        <div className="App">
            <Todolist title={TodoListTitle[0]} />
            <Todolist title={TodoListTitle[1]} tasks={tasks1}/>
            <Todolist title={TodoListTitle[2]} tasks={tasks2}/>
        </div>
    );
}

export default App;
