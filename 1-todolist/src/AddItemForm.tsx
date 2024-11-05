import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {Box, TextField} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import AddBoxIcon from '@mui/icons-material/AddBox'
import {v1} from "uuid";

export type AddTodoListPropsType = {
    addItem: (title: string, todolistId: string) => void; // ранее принимался 1 аргумент- title
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
            const newTodolistId = v1();
            props.addItem(taskTitle, newTodolistId);
            setError(null);
        } else {
            setError("Title is required")
        }
        setTaskTitle("");
    }

    return <div>
        <Box display="flex" alignItems="center">
            <TextField
                label="Enter a title"
                variant={'outlined'}
                fullWidth //заставляет внутри бокса занять все свободное пространство
                error={!!error}
                helperText={error}
                size={'small'} //className={error ? 'task-input-error' : ''}
                value={taskTitle}
                onChange={changeTaskTitleHandler}
                onKeyUp={addTaskOnKeyUpHandler}/>
            <IconButton
                onClick={addTaskHandler}
                disabled={isAddBtnDisabled}
                style={{marginLeft: '10px'}}
            >
                <AddBoxIcon/>
            </IconButton>
        </Box>
        <Box>
            {taskTitle.length > 10 && taskTitle.length <= 15 ? (
                <div>Use not more than 10 characters</div>
            ) : taskTitle.length > 15 ? (
                <div>You used more than 15 characters</div>
            ) : null}
            {error && <div>{error}</div>}
        </Box>
    </div>
}