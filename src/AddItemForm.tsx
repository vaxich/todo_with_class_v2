import { useState } from "react";

type addItemFormProps = {
    
    onClick: ( inputValue: string) => void
}

export const AddItemForm = (props: addItemFormProps) => {

    const {  onClick } = props



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

    return (
        <div>
            <input
                className={inputError ? "input-error" : ""}
                onChange={onChangeSetNewTitle}
                value={newInputValue}
                onKeyDown={onkeyDownAddtask}
            />
            <button
                onClick={() => onClickAddTaks()}
                disabled={newInputValue === "" || newInputValue.length > 15}>
                +
            </button>
            <div>
                {userMessage}
            </div>

        </div>
    )
}