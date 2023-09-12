export const required = (value: any) => {
    if (value) return undefined;
    return "Field is required"
}

export const maxLengthCreator = (MaxLength: number) => (value: string) => {
    if (value && value.length > MaxLength) return `Max length is ${MaxLength}`
    return undefined;
}