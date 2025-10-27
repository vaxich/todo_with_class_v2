import Checkbox from "@mui/material/Checkbox"
import { ChangeEvent } from "react"


type CheckBoxPropsType = {
    onChange: (value: boolean) => void
    checked: boolean
}

export const CheckBox = (props: CheckBoxPropsType) => {

    const OnChangeCheckboxHandler = (event: ChangeEvent<HTMLInputElement>) => {
        props.onChange(event.currentTarget.checked)
    }

    return (
        <Checkbox checked={props.checked} onChange={OnChangeCheckboxHandler} />
    )
}