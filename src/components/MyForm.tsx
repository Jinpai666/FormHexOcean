import { ReactElement, ChangeEvent } from 'react';
import { Field, reduxForm, InjectedFormProps } from 'redux-form';
import { useSelector, useDispatch } from 'react-redux';
import { handleTypeSelection } from "../redux/features/setDishType"
import { TypeSelection } from "../types/TypeSelection"

interface FormProps {
    handleSubmit?: (values: FormData) => void;
}

type FormData = {
    name: string;
    hours: string;
    minutes: string;
    seconds: string;
    type: string;
    no_of_slices: string;
};

interface TypeState {
    type: {
        value: string;
    };
}

const Form = (props: InjectedFormProps<FormData, FormProps>): ReactElement => {
    const { handleSubmit } = props;
    const dispatch = useDispatch();
    const selectedType = useSelector((state: TypeState) => state.type.value);

    const onSubmit = (values: FormData) => {
        console.log('stare', values);

        const newValues = {
            ...values,
            preparation_time: `${values.hours || '00'}:${values.minutes || '00'}:${values.seconds || '00'}`
        };
        console.log('nowe', newValues);
    };

    const handleTypeChange = (event: ChangeEvent<HTMLSelectElement>) => {
        const selectedType = event.target.value;
        const payload: TypeSelection = { selectedType };
        dispatch(handleTypeSelection(payload));
    };

    return (
        <>
            <h1>{selectedType || 'brak'}</h1>
            <button onClick={() => console.log(selectedType)}>test</button>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <label htmlFor="name">Dish name</label>
                    <Field
                        name="name"
                        component="input"
                        type="text"
                    />
                </div>
                <div>
                    <p>prep time</p>
                    <label htmlFor="hours">h:</label>
                    <Field
                        name="hours"
                        component="input"
                        type="text"
                    />
                    <label htmlFor="minutes">m:</label>
                    <Field
                        name="minutes"
                        component="input"
                        type="text"
                    />
                    <label htmlFor="seconds">s:</label>
                    <Field name="seconds" component="input" type="text" />
                </div>
                <div>
                    <label htmlFor="type">Dish type</label>
                    <Field
                        name="type"
                        component="select"
                        onChange={handleTypeChange}
                    >
                        <option value="">select type</option>
                        <option value="pizza">pizza</option>
                        <option value="soup">soup</option>
                        <option value="sandwich">sandwich</option>
                    </Field>
                </div>
                {selectedType === 'pizza' &&
                    <div>
                        <label htmlFor="no_of_slices">Number of slices</label>
                        <Field name="no_of_slices" component="input" type="text" />
                    </div>
                }
                {selectedType === 'soup' &&
                    <div>
                        <label htmlFor="spiciness_scale ">Spiciness scale from 1 to 10:</label>
                        <Field name="spiciness_scale " component="input" type="text" />
                    </div>
                }
                {selectedType === 'sandwich' &&
                    <div>
                        <label htmlFor="slices_of_bread  ">Slices of bread:</label>
                        <Field name="slices_of_bread  " component="input" type="text" />
                    </div>
                }

                <button type="submit">Submit</button>
            </form>
        </>
    );
};

export default reduxForm<FormData, FormProps>({
    form: 'myForm'
})(Form);
