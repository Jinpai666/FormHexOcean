import React, { ReactElement } from 'react';
import {Field, reduxForm, InjectedFormProps} from 'redux-form';
import store from "../redux/store";
import { useSelector, useDispatch} from 'react-redux';
import changeType from "../redux/actions/setDishType/setDishAction";

interface MyFormProps {
    handleSubmit: (values: FormData) => void;
}

type FormData = {
    name: string;
    hours: string;
    minutes: string;
    seconds: string;
    type: string;
};

const MyForm = (props: InjectedFormProps<FormData, MyFormProps>): ReactElement => {
    const {handleSubmit} = props;
    const dispatch = useDispatch();

    const selectedType = useSelector((state: any) => state.type.selectedType);



    const onSubmit = (values: FormData) => {
        console.log('stare', values);

        const newValues = (values: FormData) => {
            const {hours, minutes, seconds, ...rest} = values;
            const combinedTime = {
                preparation_time: `${hours || '00'}:${minutes|| '00'}:${seconds|| '00'}`
            };
            return {...rest, ...combinedTime};
        }
        console.log('nowe', newValues(values));
    };

    const handleTypeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedType = event.target.value;
        dispatch(changeType(selectedType));
    };

    return (
        <>
            <h1>{selectedType}</h1>
            <button onClick={() => console.log(store.getState().type.selectedType)}>test</button>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <label htmlFor="name">Dish name</label>
                    <Field name="name" component="input" type="text"/>
                </div>
                <div>
                    <p>prep time</p>
                    <label htmlFor="hours">h:</label>
                    <Field name="hours" component="input" type="text"/>
                    <label htmlFor="minutes">m:</label>
                    <Field name="minutes" component="input" type="text"/>
                    <label htmlFor="seconds">s:</label>
                    <Field name="seconds" component="input" type="text"/>
                </div>
                <div>
                    <label htmlFor="type">Dish type</label>
                    <Field name="type" component="select" onChange={handleTypeChange}>
                        <option value="">select type</option>
                        <option value="pizza">pizza</option>
                        <option value="soup">soup</option>
                        <option value="sandwich">sandwich</option>
                    </Field>
                </div>

                <button type="submit">Submit</button>
            </form>
        </>
    );
};

export default reduxForm<FormData, MyFormProps>({
    form: 'myForm'
})(MyForm);
