import React from 'react';
import {Button} from "./Button";
import {TaskType} from "./App";


export type TodoListPropsType = {
    title?: string,
    tasks?: TaskType[];
}


export const Todolist = ({title, tasks}: TodoListPropsType) => {
    return (
        <div className="todolist">
            <h3>{title}</h3>
            <div>
                <input/>
                <Button title="+"/>
                {/*<button>+</button>*/}
            </div>
            <ul>
                {tasks && tasks.length > 0 && (
                    <>
                        <li>
                            <input type="checkbox" checked={tasks[0].isDone}/>
                            <span>{tasks[0].title}</span>
                        </li>
                        <li>
                            <input type="checkbox" checked={tasks[1].isDone}/>
                            <span>{tasks[1].title}</span>
                        </li>
                        <li>
                            <input type="checkbox" checked={tasks[2].isDone}/>
                            <span>{tasks[2].title}</span>
                        </li>
                    </>
                )}
            </ul>
                    <div>
                    <Button title="All"/>
                    <Button title="Active"/>
                    <Button title="Completed"/>
                    </div>
                    </div>
                    );
                };
