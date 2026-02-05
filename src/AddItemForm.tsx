import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { memo, useState } from "react";

type addItemFormProps = {

    onClick: (inputValue: string) => void
}

export const AddItemForm = memo( (props: addItemFormProps) => {

    const { onClick } = props



    const [newInputValue, setNewInputValue] = useState('');
    const [inputError, setInputError] = useState(false);

    const onClickAddTaks = () => {
        if (newInputValue.trim() !== "") {
            onClick(newInputValue)
            setNewInputValue("");
        }
        else {

            setInputError(true)
            setNewInputValue("")
        }
    }

    const onChangeSetNewTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
        inputError && setInputError(false)
        setNewInputValue(event.target.value)

    }

    const onkeyDownAddtask = (event: React.KeyboardEvent<HTMLInputElement>) => {
        event.key === "Enter" && onClickAddTaks()
    }
    const userMessage = inputError
        ? <span>yout title empty</span>
        : newInputValue.length <= 15
            ? <span>enter new title</span>
            : <span>yout title very long</span>

    const styleButton = {
        maxWidth: '38px',
        maxHeight: '38px',
        minWidth: '38px',
        minHeight: '38px'

    }

    return (
        <div>
            
            <TextField
                error={!!inputError}
                size="small"
                id="outlined-basic"
                label={inputError ? inputError : "type text" }
                variant="outlined"
                className={inputError ? "input-error" : ""}
                onChange={onChangeSetNewTitle}
                value={newInputValue}
                onKeyDown={onkeyDownAddtask}
            />
           
            <Button onClick={() => onClickAddTaks()} variant="contained" disabled={newInputValue === "" || newInputValue.length > 15} style={styleButton}>+</Button>
            <div>
                {userMessage}
            </div>

        </div>
    )
})