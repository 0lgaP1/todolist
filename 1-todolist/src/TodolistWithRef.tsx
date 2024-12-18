import React, {useRef} from 'react';
import {Button} from "./Button";
import {FilterValuesType} from "./app/App"
export type TodoListPropsType = {
    title?: string
    tasks?: TaskType[]
    date?: string
    addTask: (title: string) => void
    removeTask: (taskId: string) => void
    changeFilter: (filter: FilterValuesType) => void
}

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

export const Todolist = ({title, tasks, date, addTask, removeTask, changeFilter}: TodoListPropsType) => {

    const inputRef = useRef<HTMLInputElement>(null)
    const addTaskHandler = () => {
        if (inputRef.current) {
            addTask(inputRef.current.value)
            inputRef.current.value = ""
        }
    }
    return (
        <div className="todolist">
            <h3>{title}</h3>
            <div>
                <input ref={inputRef}/>
                <Button title="+" onClick={addTaskHandler}/>
                <div>{date}</div>
            </div>
            {tasks && tasks.length === 0 ? (
                <p>No tasks here</p>
            ) : (
                <ul>
                    {tasks && tasks.map(task => {
                        return (
                            <li key={task.id}>
                                <input type="checkbox" checked={task.isDone}/>
                                <span>{task.title}</span>
                                <button onClick={() => removeTask(task.id)}>{title = "x"}</button>
                            </li>
                        )
                    })}
                </ul>
            )}
            <div>
                <Button title={'All'} onClick={() => changeFilter('all')}/>
                <Button title={'active'} onClick={() => changeFilter('active')}/>
                <Button title={'completed'} onClick={() => changeFilter('completed')}/>
            </div>
        </div>
    );
};
