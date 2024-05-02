import React from 'react';
import {Button} from "./Button";

export type TodoListPropsType = {
    title?: string
    tasks?: TaskType[]
    date?: string
    removeTask: (taskId: number) => void
}

export type TaskType = {
    id: number
    title: string
    isDone: boolean
}

export const Todolist = ({title, tasks, date, removeTask}: TodoListPropsType) => {
    return (
        <div className="todolist">
            <h3>{title}</h3>
            <div>
                <input/>
                <Button title="+"/>
                <div>{date}</div>
            </div>
            {tasks && tasks.length === 0? (
                <p>No tasks here</p>
            ) : (
                <ul>
                    {tasks && tasks.map(task => {
                        return (
                            <li key={task.id}>
                                <input type="checkbox" checked={task.isDone}/>
                                <span>{task.title}</span>
                                <button onClick={() => removeTask(task.id)}>{title="x"}</button>
                            </li>
                        )
                    })}
                </ul>
            )}
            <div>
                <Button title="All"/>
                <Button title="Active"/>
                <Button title="Completed"/>
            </div>

        </div>
    );
};
