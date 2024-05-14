import React, {useState} from 'react';
import {Button} from "./Button";
import {filterNamingType} from "./App";

export type TodoListPropsType = {
    title: string
    tasks: TaskType[]
    date?: string
    addTask: (title: string) => void
    removeTask: (taskId: string) => void
    changeFilter: (filter: filterNamingType) => void
}

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

export function Todolist(props: TodoListPropsType) {
    const {
        title,
        tasks,
        date,
        addTask,
        removeTask,
        changeFilter
    } = props

    const [taskTitle, setTaskTitle] = useState("")
    console.log(taskTitle)

    const addTaskHandler = () => {
        addTask(taskTitle);
        setTaskTitle('');
    }

    return (
        <div className="todolist">
            <h3>{title}</h3>
            <div>
                <input value={taskTitle}
                       onChange={(e) => {setTaskTitle(e.currentTarget.value)}}
                       onKeyUp={e => {
                           if(e.key === "Enter") {
                               addTaskHandler()
                           }
                       }}/>
                <Button title="+"
                        onClickHandler={addTaskHandler}
                        disabled={taskTitle.length === 0 || taskTitle.length > 15}
                />
                {taskTitle.length > 10 && <div>Use not more than 10 charters</div>}
                {taskTitle.length > 15 && <div>You used more than 15 charters</div>}
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
                                <Button title="x" onClickHandler={() => removeTask(task.id)}/>
                            </li>
                        )
                    })}
                </ul>
            )}
            <div>
                <Button title={'All'} onClickHandler={() => changeFilter('all')}/>
                <Button title={'Active'} onClickHandler={() => changeFilter('active')}/>
                <Button title={'Completed'} onClickHandler={() => changeFilter('completed')}/>
            </div>
        </div>

    )
}
