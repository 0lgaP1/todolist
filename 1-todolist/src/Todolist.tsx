import React, {ChangeEvent} from 'react';
import {Button} from "./Button";
import {FilterValuesType, TaskType} from "./App";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";

export type TodoListPropsType = {
    title: string
    todolistId: string
    tasks: TaskType[]
    filter: FilterValuesType
    addTask: (title: string, todolistId: string) => void
    removeTask: (taskId: string, todolistId: string) => void
    changeTaskStatus: (taskId: string, newIsDoneValue: boolean, todolistId: string) => void
    changeTaskTitle: (taskId: string, newValue: string, todolistId: string) => void
    changeFilter: (filter: FilterValuesType, todolistId: string) => void
    removeTodolist: (todolistId: string) => void
}

export function Todolist(props: TodoListPropsType) {
    const {
        title,
        tasks,
        todolistId,
        removeTask,
        changeTaskStatus,
        changeTaskTitle,
        changeFilter
    } = props;

    const onAllClickHandler = () => changeFilter('all', todolistId);
    const onActiveClickHandler = () => changeFilter('active', todolistId);
    const onCompletedClickHandler = () => changeFilter('completed', todolistId);
    // UI LOGIC:
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
    const removeTodolist = () => {
        props.removeTodolist(props.todolistId)
    };
    const addTask = (title: string) => {
        props.addTask(title, props.todolistId)
    };

    const taskList: JSX.Element = filteredTasks.length === 0
        ? <span>Your task list is empty</span>
        : <ul>
            {
                filteredTasks.map(task => {
                    const removeTaskHandler = () => removeTask(task.id, todolistId);
                    const changeTaskStatusHandler =
                        (e: ChangeEvent<HTMLInputElement>) => changeTaskStatus(task.id, e.currentTarget.checked, todolistId)
                    const changeTaskTitleHandler =
                        (newValue: string) => changeTaskTitle(task.id, newValue, todolistId)

                    return (
                        <li key={task.id}>
                            <input
                                type="checkbox"
                                checked={task.isDone}
                                onChange={changeTaskStatusHandler}/>
                            {/*<span className={task.isDone ? "task-done" : "task"}>{task.title}</span>*/}
                            <EditableSpan title={task.title} onChange={changeTaskTitleHandler} isDone={task.isDone}/>
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
            <AddItemForm addItem={addTask}/>
            {taskList}
            <div>
                <Button
                    title={'All'}
                    onClickHandler={onAllClickHandler}
                    classes={props.filter === "all" ? "btn-filter-active" : ""}/>
                <Button
                    title={'Active'}
                    onClickHandler={onActiveClickHandler}
                    classes={props.filter === "active" ? "btn-filter-active" : ""}/>
                <Button
                    title={'Completed'}
                    onClickHandler={onCompletedClickHandler}
                    classes={props.filter === "completed" ? "btn-filter-active" : ""}/>
            </div>
        </div>
    )
}