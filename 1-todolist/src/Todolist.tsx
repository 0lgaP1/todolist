import React, {useState, KeyboardEvent, ChangeEvent} from 'react';
import {Button} from "./Button";
import {FilterValuesType, TaskType} from "./App";


export type TodoListPropsType = {
    title: string
    tasks: TaskType[]
    date?: string
    addTask: (title: string) => void
    removeTask: (taskId: string) => void
    changeTaskStatus: (taskId: string, newIsDoneValue: boolean) => void
    //changeFilter: (filter: FilterValuesType) => void
}
export function Todolist(props: TodoListPropsType) {
    const {
        title,
        tasks,
        //date,
        addTask,
        removeTask,
        changeTaskStatus,
        //changeFilter
        } = props;

    // UI LOGIC
    const [filter, setFilter] = useState<FilterValuesType>("all")
    const [taskTitle, setTaskTitle] = useState("")
    console.log(taskTitle)

    const changeFilter = (filter: FilterValuesType) => {
        setFilter(filter)
    }

    const getFilteredTasks =
        (allTasks: Array<TaskType>, filterValue: FilterValuesType): Array<TaskType> => {
            switch (filterValue) {
                case "active":
                    return allTasks.filter(t => t.isDone === false)
                case "completed":
                    return allTasks.filter(t => t.isDone === true)
                default:
                    return allTasks
            }
        }

    const filteredTasks: Array<TaskType> = getFilteredTasks(tasks, filter);
    const addTaskHandler = () => {
        addTask(taskTitle);
        setTaskTitle("");
    }

    const addTaskOnKeyUpHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter" && taskTitle) {
            addTaskHandler()
        }
    }

    const changeTaskTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {setTaskTitle(e.currentTarget.value)}

    const isAddBtnDisabled = taskTitle.length === 0 || taskTitle.length > 15

const tasklist: JSX.Element = filteredTasks.length === 0
    ? <span>Your tasklist is empty</span>
    : <ul>
        {
            filteredTasks.map(task => {
                const removeTaskHandler = () => removeTask(task.id)
                const changeTaskStatusHandler =
                    (e: ChangeEvent<HTMLInputElement>) => changeTaskStatus(task.id, e.currentTarget.checked)
                return (
                    <li key={task.id}>
                        <input
                            type="checkbox"
                            checked={task.isDone}
                            onChange={changeTaskStatusHandler}
                        />
                        <span>{task.title}</span>
                        <Button
                            title="x"
                            onClickHandler={removeTaskHandler}/>
                    </li>
                )
            })
        }
    </ul>

    return (
        <div className="todolist">
            <h3>{title}</h3>
            <div>
                <input value={taskTitle}
                       onChange={changeTaskTitleHandler}
                       onKeyUp={addTaskOnKeyUpHandler}/>
                <Button title="+"
                        onClickHandler={addTaskHandler}
                        disabled={isAddBtnDisabled}
                />
                {taskTitle.length > 10 && <div>Use not more than 10 charters</div>}
                {taskTitle.length > 15 && <div>You used more than 15 charters</div>}
            </div>
            {tasklist}
            <div>
                <Button title={'All'} onClickHandler={() => changeFilter('all')}/>
                <Button title={'Active'} onClickHandler={() => changeFilter('active')}/>
                <Button title={'Completed'} onClickHandler={() => changeFilter('completed')}/>
            </div>
        </div>
    )}