import React from 'react';
import { Field, Form, Formik } from 'formik';
import { filterType } from '../../../../Types/ReducersTypes';
import { useSelector } from 'react-redux';
import { appStateType } from '../../../../Redux/ReduxStore';
type propsType = {
    onFilterChange: (filter: filterType) => void
}
export const SearchForm: React.FC<propsType> = React.memo(props => {

    const filter = useSelector((state: appStateType) => state.UsersPage.filter)

    type specificFilterType = {
        term: string
        friends: "null" | "true" | "false" | boolean

    }
    const initialValues: specificFilterType = {
        term: filter.term === null ? "" : filter.term,
        friends: filter.friends === null ? "null" : filter.friends
    }
    const submit = (values: specificFilterType, { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }) => {
        const filteredValues = {
            term: values.term || '',
            friends: values.friends === "null" ? null : values.friends === "true" ? true : false
        }
        props.onFilterChange(filteredValues);
        setSubmitting(false);
    }
    return (
        <div>
            <Formik
                initialValues={initialValues}
                enableReinitialize
                onSubmit={submit}
            >
                {({ isSubmitting }) => (
                    <Form>
                        <Field type="text" name="term" />
                        <Field as="select" name="friends">
                            <option value="null">All</option>
                            <option value="true">Followed</option>
                            <option value="false">Unfollowed</option>
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