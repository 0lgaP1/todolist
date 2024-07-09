import React, {useState, KeyboardEvent, ChangeEvent} from 'react';
import {Button} from "./Button";
import {FilterValuesType, TaskType} from "./App";

export type TodoListPropsType = {
    title: string
    todolistId: string
    tasks: TaskType[]
    filter: FilterValuesType
    addTask: (title: string, todolistId: string) => void
    removeTask: (taskId: string, todolistId: string) => void
    changeTaskStatus: (taskId: string, newIsDoneValue: boolean, todolistId: string) => void
    changeFilter: (filter: FilterValuesType, todolistId: string) => void
    removeTodolist: (todolistId: string) => void
}

export function Todolist(props: TodoListPropsType) {
    const {
        title,
        tasks,
        todolistId,
        addTask,
        removeTask,
        changeTaskStatus,
        changeFilter
    } = props;

    // UI LOGIC
    //const [filter, setFilter] = useState<FilterValuesType>("all")
    const [taskTitle, setTaskTitle] = useState("") //отслеживаем ввод пользователя
    const [error, setError] = useState<string | null>(null)
    console.log(taskTitle)

    const getFilteredTasks = (allTasks: Array<TaskType>, filterValue: FilterValuesType): Array<TaskType> => {
        switch (filterValue) {
            case "active":
                return allTasks.filter(t => !t.isDone)
            case "completed":
                return allTasks.filter(t => t.isDone)
            default:
                return allTasks
        }
    }
    const filteredTasks: Array<TaskType> = getFilteredTasks(tasks, props.filter);
    const addTaskHandler = () => {
        const trimmedTaskTitle = taskTitle.trim()
        if (trimmedTaskTitle !== "") {
            addTask(taskTitle, props.todolistId);
            setError(null);
        } else {
            setError("Title is required")
        }
        setTaskTitle("");
    }
    const addTaskOnKeyUpHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter" && taskTitle) {
            addTaskHandler()
        }
    }
    const changeTaskTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTaskTitle(e.currentTarget.value);
    };
    const removeTodolist = () => {
        props.removeTodolist(props.todolistId)
    };
    const isAddBtnDisabled = taskTitle.length === 0 || taskTitle.length > 15

    const tasklist: JSX.Element = filteredTasks.length === 0
        ? <span>Your tasklist is empty</span>
        : <ul>
            {
                filteredTasks.map(task => {
                    const removeTaskHandler = () => removeTask(task.id, todolistId);
                    const changeTaskStatusHandler =
                        (e: ChangeEvent<HTMLInputElement>) => changeTaskStatus(task.id, e.currentTarget.checked, todolistId)
                    return (
                        <li key={task.id}>
                            <input
                                type="checkbox"
                                checked={task.isDone}
                                onChange={changeTaskStatusHandler}/>
                            <span className={task.isDone ? "task-done" : "task"}>{task.title}</span>
                            <Button
                                title="x"
                                onClickHandler={removeTaskHandler}/>
                        </li>
                    )
                })}
        </ul>;

    return (
        <div className="todolist">
            <div className={"todolist-title-container"}>
                <h3>{title}
                    <button onClick={removeTodolist}>x</button>
                </h3>
            </div>
            <AddItemForm id={props.id} addTask={props.addTask}/>
            <div>
                <input className={error ? "task-input-error" : ""}
                       value={taskTitle}
                       onChange={changeTaskTitleHandler}
                       onKeyUp={addTaskOnKeyUpHandler}/>
                <Button title="+"
                        onClickHandler={addTaskHandler}
                        disabled={isAddBtnDisabled}/>

                {taskTitle.length > 10 && taskTitle.length <= 15 ? (
                    <div>Use not more than 10 characters</div>
                ) : taskTitle.length > 15 ? (
                    <div>You used more than 15 characters</div>
                ) : null}
                {error && <div>{error}</div>}
            </div>
            {tasklist}
            <div>
                <Button
                    title={'All'}
                    onClickHandler={() => changeFilter('all', todolistId)}
                    classes={props.filter === "all" ? "btn-filter-active" : ""}/>
                <Button
                    title={'Active'}
                    onClickHandler={() => changeFilter('active', todolistId)}
                    classes={props.filter === "active" ? "btn-filter-active" : ""}/>
                <Button
                    title={'Completed'}
                    onClickHandler={() => changeFilter('completed', todolistId)}
                    classes={props.filter === "completed" ? "btn-filter-active" : ""}/>
            </div>
        </div>
    )
}

type AddTodoListPropsType = {
    addTask: (title: string, todolistId: string) => void
    id: string;
}

function AddItemForm(props: AddTodoListPropsType) {
    const [taskTitle, setTaskTitle] = useState(""); //отслеживаем ввод пользователя
    const [error, setError] = useState<string | null>(null);
    const isAddBtnDisabled = taskTitle.length === 0 || taskTitle.length > 15
    const changeTaskTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTaskTitle(e.currentTarget.value);
    };
    const addTaskOnKeyUpHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter" && taskTitle) {
            addTaskHandler()
        }
    }
    const addTaskHandler = () => {
        const trimmedTaskTitle = taskTitle.trim()
        if (trimmedTaskTitle !== "") {
            props.addTask(props.id, taskTitle);
            setError(null);
        } else {
            setError("Title is required")
        }
        setTaskTitle("");
    }

    return <div>
        <input className={error ? "task-input-error" : ""}
               value={taskTitle}
               onChange={changeTaskTitleHandler}
               onKeyUp={addTaskOnKeyUpHandler}/>
        <Button title="+"
                onClickHandler={addTaskHandler}
                disabled={isAddBtnDisabled}/>

        {taskTitle.length > 10 && taskTitle.length <= 15 ? (
            <div>Use not more than 10 characters</div>
        ) : taskTitle.length > 15 ? (
            <div>You used more than 15 characters</div>
        ) : null}
        {error && <div>{error}</div>}
    </div>
}