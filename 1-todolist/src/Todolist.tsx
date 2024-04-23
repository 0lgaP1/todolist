import React from 'react';
import {Button} from "./Button";


export type TodoListPropsType = {
    title?: string,
    tasks?: TaskType[],
    date?: string,
}

export type TaskType = {
    id: number,
    title: string,
    isDone: boolean,
}

export const Todolist = ({title, tasks, date}: TodoListPropsType) => {
    return (
        <div className="todolist">
            <h3>{title}</h3>
            <div>
                <input/>
                <Button title="+"/>
                <div>{date}</div>
            </div>
            <ul>
                {tasks && tasks.map(task => {
                    debugger
                    return (
                        <li>
                            <input type="checkbox" checked={task.isDone}/>
                            <span>{task.title}</span>
                        </li>
                    )
                })}
            </ul>
            <div>
                <Button title="All"/>
                <Button title="Active"/>
                <Button title="Completed"/>
            </div>

        </div>
    );
};
