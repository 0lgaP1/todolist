import React from 'react';
import {Button} from "./Button";
import {filterNamingType} from "./App";

export type TodoListPropsType = {
    title?: string
    tasks?: TaskType[]
    date?: string
    removeTask: (taskId: number) => void
    changeFilter: (filter: filterNamingType) => void
}

export type TaskType = {
    id: number
    title: string
    isDone: boolean
}

export const Todolist = ({title, tasks, date, removeTask, changeFilter}: TodoListPropsType) => {
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
                <Button title={'all'} onClick={() => changeFilter('all')}/>
                <Button title={'active'} onClick={() => changeFilter('active')}/>
                <Button title={'completed'} onClick={() => changeFilter('completed')}/>
            </div>

        </div>
    );
};
