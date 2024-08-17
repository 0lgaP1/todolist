import React, {ChangeEvent, useState} from "react";

type EditableSpanPropsType = {
    title: string,
    isDone: boolean,
    onChange: (newValue: string) => void
}

export function EditableSpan(props: EditableSpanPropsType) {

    let [editMode, setEditMode] = useState(false);

    let [title, setTitle] = useState("");

    const activatedEditMode = () => {
        setEditMode(true)
        setTitle(props.title)
    };
    const activatedViewMode = () => {
        setEditMode(false);
        props.onChange(title);
    }
    const onChangeTitleHandler = (e: ChangeEvent<HTMLInputElement>) => setTitle(e.currentTarget.value);

    return editMode
        ? <input
            value={title}
            onChange={onChangeTitleHandler}
            onBlur={activatedViewMode}
            autoFocus/> //если мы хотим, чтоб в инпуте значение менялось, то стартовое значение - value={title}, a onChange={onChangeHandler}
        : <span
            onDoubleClick={activatedEditMode}
            className={props.isDone ? "task-done" : "task"}> {props.title} </span>
}