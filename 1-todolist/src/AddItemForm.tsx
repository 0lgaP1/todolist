import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {Button} from "./Button";
import {TextField} from "@mui/material";


export type AddTodoListPropsType = {
    addItem: (title: string) => void;
}

export function AddItemForm(props: AddTodoListPropsType) {
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
            props.addItem(taskTitle);
            setError(null);
        } else {
            setError("Title is required")
        }
        setTaskTitle("");
    }

    return <div>
        <TextField
            label="Enter a title"
            variant={'outlined'}
            size={'small'}
            className={error ? 'task-input-error' : ''}
               value={taskTitle}
               onChange={changeTaskTitleHandler}
               onKeyUp={addTaskOnKeyUpHandler}/>
        <Button
                    title={"+"}
                    onClick={addTaskHandler}
                    disabled={isAddBtnDisabled}
        />
        {taskTitle.length > 10 && taskTitle.length <= 15 ? (
            <div>Use not more than 10 characters</div>
        ) : taskTitle.length > 15 ? (
            <div>You used more than 15 characters</div>
        ) : null}
        {error && <div>{error}</div>}
    </div>
}