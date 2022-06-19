import React from 'react'
import CraftFormsStyle from './CraftForms.module.css'


export const CraftForm = ({ input, meta, child, ...props }) => {
    const hasError = meta.touched && meta.error
    return (
        <div className={CraftFormsStyle.CraftForm__blockInput}>
            <div>
                {props.children}
                {hasError && <span className={CraftFormsStyle.CraftForm__error}>Error</span>}
            </div>
        </div>
    )
}

export const TextArea = (props) => {
    return <CraftForm {...props}><textarea placeholder={props.placeholder} {...props.input}/></CraftForm>
}

export const Input = (props) => {
    return <CraftForm {...props}><input placeholder={props.placeholder} {...props.input}/></CraftForm>
}
