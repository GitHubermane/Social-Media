import React from 'react';
import { Field, Form, Formik } from 'formik';
import { filterType } from '../../../../Types/ReducersTypes';
type propsType = {
    onFilterChange: (filter: filterType) => void
}
export const SearchForm: React.FC<propsType> = React.memo(props => {
    
    type specificFilterType = {
        term: string
        friends: "All" | "Followed" | "Unfollowed"
    }
    const initialValues: specificFilterType = {
        term: '',
        friends: "All"
    }
    const submit = (values: specificFilterType, { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }) => {
        const filteredValues = {
            term: values.term,
            friends: values.friends === "All" ? null : values.friends === "Followed" ? true : false
        }
        props.onFilterChange(filteredValues);
        setSubmitting(false);
    }
    return (
        <div>
            <Formik
                initialValues={initialValues}
                onSubmit={submit}
            >
                {({ isSubmitting }) => (
                    <Form>
                        <Field type="text" name="term" />
                        <Field as="select" name="friends">
                            <option value="All">All</option>
                            <option value="Followed">Followed</option>
                            <option value="Unfollowed">Unfollowed</option>
                        </Field>
                        <button type="submit" disabled={isSubmitting}>Submit</button>
                    </Form>
                )}
            </Formik>
        </div>
    )
})


//     const formik = useFormik({
//         initialValues: {
//             term: '',
//             friends: null as null | boolean
//         },
//         onSubmit: (values: filterType) => {
//             // alert(JSON.stringify(values, null, 2));
//             console.log(values);
//         },
//     });
//     return (
//         <form onSubmit={formik.handleSubmit}>
//             <input
//                 name="search"
//                 onChange={formik.handleChange}
//                 value={formik.values.term}
//             />
//             <input
//                 type="checkbox"
//                 value={formik.values.friends}
//             />
//             <button type="submit">Submit</button>
//         </form>
//     );
// };