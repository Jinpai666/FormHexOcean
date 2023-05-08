import {ReactElement, ChangeEvent, useState} from 'react';
import {Field, reduxForm, InjectedFormProps} from 'redux-form';

interface FormProps {
    handleSubmit?: (values: FormData) => void;
}

type FormData = {
    name: string;
    hours: string;
    minutes: string;
    seconds: string;
    type: string;
    no_of_slices?: string;
};


const Form = (props: InjectedFormProps<FormData, FormProps>): ReactElement => {
    const {handleSubmit} = props;
    const [selectedType, setSelectedType] = useState('')

    const onSubmit = (values: FormData) => {
        console.log('stare', values);
        const {hours, minutes, seconds, ...rest} = values;
        const newValues = {
            ...rest,
            preparation_time: `${values.hours || '00'}:${values.minutes || '00'}:${values.seconds || '00'}`
        };
        console.log('nowe', newValues);
    };

    const handleTypeChange = (event: ChangeEvent<HTMLSelectElement>) => {
        setSelectedType(event.target.value);
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
                    <Field name="seconds" component="input" type="text"/>
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
                        <Field name="no_of_slices" component="input" type="number"/>
                        <label htmlFor="diameter ">Diameter</label>
                        <Field name="diameter " component="input" type="float"/>
                    </div>
                }

                {selectedType === 'soup' && (
                    <div>
                        {Array.from({ length: 10 }, (_, index) => (
                            <div key={index + 1}>
                                <label htmlFor={`spiciness_scale${index + 1}`}>{index + 1}</label>
                                <Field
                                    name="spiciness_scale"
                                    component="input"
                                    type="radio"
                                    value={(index + 1).toString()}
                                />
                            </div>
                        ))}
                    </div>
                )}
                {selectedType === 'sandwich' &&
                    <div>
                        <label htmlFor="slices_of_bread  ">Slices of bread:</label>
                        <Field name="slices_of_bread  " component="input" type="number"/>
                    </div>
                }

                <button type="submit">Submit</button>
            </form>
        </>
    );
};

export default reduxForm<FormData, FormProps>({
    form: 'foodForm'
})(Form);
