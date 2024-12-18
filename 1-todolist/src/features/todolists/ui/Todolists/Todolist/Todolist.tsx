import React, {ChangeEvent} from 'react';
import {Button} from "../../../../../Button";
import {Box, List, ListItem} from "@mui/material";
import {FilterValuesType, TaskType} from "../../../../../AppWithReducers";
import {AddItemForm} from "../../../../../common/components/AddItemForm";
import {EditableSpan} from "../../../../../common/components/EditableSpan";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete"
import {Checkbox} from "@mui/material";
import {filterButtonsContainerSx, getListItemSx} from "../../../../../Todolist.styles";

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
    changeTodolistTitle: (id: string, title: string) => void
}

export function Todolist(props: TodoListPropsType) {
    const {
        title,
        tasks,
        todolistId,
        removeTask,
        changeTaskStatus,
        changeTaskTitle,
        changeFilter,
        changeTodolistTitle
    } = props;

    const onAllClickHandler = () => changeFilter('all', todolistId);
    const onActiveClickHandler = () => changeFilter('active', todolistId);
    const onCompletedClickHandler = () => changeFilter('completed', todolistId);

    const onChangeTodolistTitleHandler = (newTitle: string) => {
        changeTodolistTitle(todolistId, newTitle); // вызов функции для измен заголовка тудулиста
    }
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
        : <List>
            {
                filteredTasks.map(task => {
                    const removeTaskHandler = () => removeTask(task.id, todolistId);
                    const changeTaskStatusHandler =
                        (e: ChangeEvent<HTMLInputElement>) => changeTaskStatus(task.id, e.currentTarget.checked, todolistId)
                    const changeTaskTitleHandler =
                        (newValue: string) => changeTaskTitle(task.id, newValue, todolistId)

                    return (
                        <ListItem
                            sx={getListItemSx(task.isDone)}
                            key={task.id}>
                            <div>
                            <Checkbox
                                color={"primary"}
                                checked={task.isDone}
                                onChange={changeTaskStatusHandler}/>
                            {/*<span className={task.isDone ? "task-done" : "task"}>{task.title}</span>*/}
                            <EditableSpan title={task.title} onChange={changeTaskTitleHandler} isDone={task.isDone}/>
                            </div>
                                <IconButton onClick={removeTaskHandler}>
                                <DeleteIcon/>
                            </IconButton>
                        </ListItem>
                    )
                })}
        </List>;

    return (
        <div className="todolist">
            <div className={"todolist-title-container"}>
                <h3>
                    <EditableSpan title={title} isDone={false} onChange={onChangeTodolistTitleHandler}/>
                    <IconButton onClick={removeTodolist}>
                        <DeleteIcon/>
                    </IconButton>
                </h3>
            </div>
            <AddItemForm addItem={addTask}/>
            {taskList}
            <Box sx={filterButtonsContainerSx} gap={2}>
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
                    color={props.filter === "completed" ? "secondary" : "inherit"}/>
            </Box>
        </div>
    )
}