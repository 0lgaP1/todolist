import React, {ChangeEvent} from 'react';
import {Button} from "./Button";
import {Box} from "@mui/material";
import {FilterValuesType, TaskType} from "./App";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete"
import {Checkbox} from "@mui/material";

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
                            <Checkbox
                                color={"primary"}
                                checked={task.isDone}
                                onChange={changeTaskStatusHandler}/>
                            {/*<span className={task.isDone ? "task-done" : "task"}>{task.title}</span>*/}
                            <EditableSpan title={task.title} onChange={changeTaskTitleHandler} isDone={task.isDone}/>
                            <IconButton onClick={removeTaskHandler}>
                                <DeleteIcon/>
                            </IconButton>
                        </li>
                    )
                })}
        </ul>;

    return (
        <div className="todolist">
            <div className={"todolist-title-container"}>
                <h3>{title}
                    <IconButton onClick={removeTodolist}>
                        <DeleteIcon/>
                    </IconButton>
                </h3>
            </div>
            <AddItemForm addItem={addTask}/>
            {taskList}
            <Box display={"flex"} gap={2}>
                <Button
                    title={'All'}
                    onClick={onAllClickHandler}
                    variant="text"
                    color={props.filter === "all" ? "primary" : "inherit"}
                />
                <Button
                    title={'Active'}
                    onClick={onActiveClickHandler}
                    variant="text"
                    color={props.filter === "active" ? "secondary" : "inherit"}/>
                <Button
                    title={'Completed'}
                    onClick={onCompletedClickHandler}
                    variant="text"
                    color={props.filter === "completed" ? "primary" : "inherit"}/>
            </Box>
        </div>
    )
}