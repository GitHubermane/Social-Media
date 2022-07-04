import React from 'react'
import { FieldInputProps, FieldMetaState } from 'react-final-form';
//@ts-ignore
import CraftFormsStyle from './CraftForms.module.css'

type propsType = {
    children: undefined | typeof React.Children 
    input: FieldInputProps<string | number | undefined, HTMLElement>;
    meta: any
    placeholder: string
    render: any
}
type craftFormType = {
    input: FieldInputProps<string | number | undefined, HTMLElement>;
    meta: any;
    children: undefined | typeof React.Children
    child: any
}
export const CraftForm: React.FC<craftFormType> = ({ input, meta, child, ...props }) => {
    const hasError = meta.touched && meta.error
    return (
        <div className={CraftFormsStyle.CraftForm__blockInput}>
            <div>
                {props.children}
                {hasError && <span className={CraftFormsStyle.CraftForm__error}>This Field is required</span>}
            </div>
        </div>
    )
}

export const TextArea: React.FC<any> = (props) => {
    return <CraftForm {...props}><textarea placeholder={props.placeholder} {...props.input}/></CraftForm>
}

export const Input: React.FC<any> = (props) => {
    return <CraftForm {...props}><input placeholder={props.placeholder} {...props.input}/></CraftForm>
}
