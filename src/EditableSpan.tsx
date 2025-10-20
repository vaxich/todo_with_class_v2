import { useState } from "react"

type ediableSpanProps = {
    title: string
    onClick: (newTitle: string) => void
}

export const EditableSpan = (props: ediableSpanProps) => {
    const { title , onClick} = props;

    const [edit, setEdit] = useState(false);
    const [newTitle, setNewTitle] = useState(title);

    const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {

        setNewTitle(event.target.value)

    }

    const editHandler = () => {
        setEdit(!edit)
        if(edit) {
            addTask()
        }
    }

    const addTask = () => {
        onClick(newTitle)
    }


    return (
        edit
            ? <input value={newTitle} onChange={onChangeHandler} onBlur={editHandler} autoFocus />
            : <span onDoubleClick={editHandler}>{title}</span>
    )
}