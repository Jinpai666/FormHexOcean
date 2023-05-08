import { ReactElement, useState, ChangeEvent } from 'react';

import { Field, reduxForm, InjectedFormProps } from 'redux-form';
import Input from "../Input/Input"

interface FormProps {
    handleSubmit?: (values: FormData) => void;
}

interface FormData {
    name: string;
    hours: string;
    minutes: string;
    seconds: string;
    type: string;
    no_of_slices?: string;
};

interface RenderInputProps {
    input: string;
    type: string;
    meta: {
        touched: boolean;
        error: string;
        warning: string;
    };
}

const renderInput = ({ input, type, meta }: RenderInputProps): React.ReactElement => {
    return <Input {...input} type={type} errorMessage={meta.touched && meta.error} />;
};

const onSubmit = (values: FormData) => {
    console.log('stare', values);
    const {hours, minutes, seconds, ...rest} = values;
    const newValues = {
        ...rest,
        preparation_time: `${values.hours || '00'}:${values.minutes || '00'}:${values.seconds || '00'}`
    };
    console.log('nowe', newValues);
};

const required = (value: string): string | undefined => {
    if (!value || value === "") {
        return 'This field is required';
    }
    return undefined;
};

const Form = (props: InjectedFormProps<FormData, FormProps>): ReactElement => {
    const {handleSubmit, valid} = props;
    const [selectedType, setSelectedType] = useState('')

    const handleTypeChange = (event: ChangeEvent<HTMLSelectElement>) => {
        setSelectedType(event.target.value);
    };

    return (
        <>
            <h1>{selectedType || 'brak'}</h1>
            <button onClick={() => console.log(props)}>test</button>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <label htmlFor="name">Dish name</label>
                    <Field
                        name="name"
                        component={renderInput}
                        type="text"
                        validate={required}
                    />
                </div>
                <div>
                    <p>prep time</p>
                    <label htmlFor="hours">h:</label>
                    <Field
                        name="hours"
                        component={renderInput}
                        type="text"
                        validate={required}
                    />
                    <label htmlFor="minutes">m:</label>
                    <Field
                        name="minutes"
                        component={renderInput}
                        type="text"
                        validate={required}
                    />
                    <label htmlFor="seconds">s:</label>
                    <Field
                        name="seconds"
                        component={renderInput}
                        type="text"
                        validate={required}
                    />
                </div>
                <div>
                    <label htmlFor="type">Dish type</label>
                    <Field
                        name="type"
                        type="select"
                        component={renderInput}
                        onChange={handleTypeChange}
                        validate={required}
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
                        <Field
                            name="no_of_slices"
                            component={renderInput}
                            type="number"
                            validate={required}
                        />
                        <label htmlFor="diameter">Diameter</label>
                        <Field
                            name="diameter"
                            component={renderInput}
                            type="number"
                            validate={required}
                            step="0.1"
                        />
                    </div>
                }

                {selectedType === 'soup' && (
                    <div  >
                        <h2>Spiciness level</h2>
                            {Array.from({length: 10}, (_, index) => (
                                <div key={index + 1}>
                                    <label htmlFor={`spiciness_scale${index + 1}`}>{index + 1}</label>
                                    <Field
                                        name="spiciness_scale"
                                        component={renderInput}
                                        type="radio"
                                        value={(index + 1).toString()}
                                        validate={required}
                                    />
                                </div>
                            ))}

                    </div>
                )}
                {selectedType === 'sandwich' &&
                    <div>
                        <label htmlFor="slices_of_bread  ">Slices of bread:</label>
                        <Field
                            name="slices_of_bread"
                            component={renderInput}
                            type="number"
                            validate={required}
                        />
                    </div>
                }

                <button
                    type="submit"
                    disabled={!valid}
                >Submit
                </button>
            </form>
        </>
    );
};

export default reduxForm<FormData, FormProps>({
    form: 'foodForm'
})(Form);