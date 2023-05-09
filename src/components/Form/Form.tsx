import {ReactElement, useState, ChangeEvent} from 'react';
import {Field, reduxForm, InjectedFormProps} from 'redux-form';
import Input from "../Input/Input"
import "./form.scss"
import submitDish from "../../services/sendRecipe"
import {Dish} from '../../types/dish'

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
    input: {
        name: string;
    };
    type: string;
    className: string;
    placeholder: string;
    meta: {
        touched: boolean;
        error: string;
        warning: string;
    };
}

const renderInput = ({input, type, className, placeholder, meta}: RenderInputProps): React.ReactElement => {
    let step = "1";

    if (input.name === 'diameter') {
        step = '0.1';
    }

    return <Input {...input}
                  type={type}
                  step={step}
                  className={className}
                  errorMessage={meta.touched && meta.error}
                  placeholder={placeholder}
    />;
};

const required = (value: string): string => {
    if (!value || value === "") {
        return 'Field required.';
    }
    return '';
};
const maxLength2 = (value: string): string => {
    if (value.length > 2) {
        return 'Max 2 digits.';
    }
    return '';
};

const maxValue59minutes = (value: string): string => {
    if (value > "59") {
        return 'Max 59 minutes.';
    }
    return '';
};
const maxValue59seconds = (value: string): string => {
    if (value > "59") {
        return 'Max 59 seconds.';
    }
    return '';
};
const maxValue23hours = (value: string): string => {
    if (value > "23") {
        return 'Max 23 hours.';
    }
    return '';
};
const min3characters = (value: string): string => {
    if (value.length < 3) {
        return 'Min 3 chracters.';
    }
    return '';
};


const Form = (props: InjectedFormProps<FormData, FormProps>): ReactElement => {
    const {handleSubmit, valid} = props;
    const [selectedType, setSelectedType] = useState('')
    const [apiError, setApiError] = useState('')
    const [message, setMessage] = useState('')

    const handleTypeChange = (event: ChangeEvent<HTMLSelectElement>) => {
        setSelectedType(event.target.value);
    };
    const onSubmit = async (values: FormData) => {
        const {hours, minutes, seconds, ...rest} = values;
        const newValues: Dish = {
            ...rest,
            preparation_time: `${values.hours}:${values.minutes}:${values.seconds}`,
        };
        try {
            await submitDish(newValues);
            props.reset()
            setMessage('Form sent successfully')
        } catch (error) {
            setApiError('Form was not sent, please try again later');
        }
    };

    return (
        <div className="project">
            <form className="form" onSubmit={handleSubmit(onSubmit)}>
                <h1 className="form__title">Your Recipe</h1>

                <div>
                    <label htmlFor="name"/>
                    <Field
                        placeholder="Dish name"
                        name="name"
                        component={renderInput}
                        type="text"
                        validate={[
                            required,
                            min3characters
                        ]
                        }
                        className="form__input"

                    />
                </div>
                <div>
                    <h2 className="form__title_small">Preparation time:</h2>
                    <div className="form__preparation-section">
                        <label htmlFor="hours"/>
                        <Field
                            placeholder="hours"
                            name="hours"
                            component={renderInput}
                            type="number"
                            validate={[
                                required,
                                maxLength2,
                                maxValue23hours
                            ]}
                            className="form__input form__input_number form__input_preparation"
                        />
                        <label htmlFor="minutes"/>
                        <Field
                            placeholder="minutes"
                            name="minutes"
                            component={renderInput}
                            type="number"
                            validate={[
                                required,
                                maxLength2,
                                maxValue59minutes
                            ]}
                            className="form__input form__input_number form__input_preparation"
                        />
                        <label htmlFor="seconds"/>
                        <Field
                            placeholder="seconds"
                            name="seconds"
                            component={renderInput}
                            type="number"
                            validate={[
                                required,
                                maxLength2,
                                maxValue59seconds
                            ]}
                            className="form__input form__input_number form__input_preparation"
                        />
                    </div>

                </div>
                <div>
                    <label htmlFor="type"/>
                    <Field
                        name="type"
                        type="select"
                        component={renderInput}
                        onChange={handleTypeChange}
                        validate={required}
                        className="form__input"

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
                            className="form__input  form__input_number "

                        />
                        <label htmlFor="diameter">Diameter</label>
                        <Field
                            name="diameter"
                            component={renderInput}
                            type="number"
                            validate={required}
                            className="form__input"

                        />
                    </div>
                }

                {selectedType === 'soup' && (
                    <>
                        <h2 className="form__title_small">Spiciness level</h2>
                        <div className="form__radio">

                            {Array.from({length: 10}, (_, index) => (
                                <div className="form__radio_button" key={index + 1}>
                                    <label htmlFor={`spiciness_scale${index + 1}`}>{index + 1}</label>
                                    <Field
                                        name="spiciness_scale"
                                        component={renderInput}
                                        type="radio"
                                        value={(index + 1).toString()}
                                        validate={required}
                                        className="form__input"
                                    />
                                </div>
                            ))}

                        </div>
                    </>

                )}
                {selectedType === 'sandwich' &&
                    <div>
                        <label htmlFor="slices_of_bread  ">Slices of bread:</label>
                        <Field
                            name="slices_of_bread"
                            component={renderInput}
                            type="number"
                            validate={required}
                            className="form__input form__input_number"
                        />
                    </div>
                }

                <button
                    type="submit"
                    disabled={!valid}
                >Submit
                </button>
                {message
                    ? <h2 className="form__message form__info">{message}</h2>
                    : <h2 className="form__api-error form__info">{apiError}</h2>
                }


            </form>
        </div>
    );
};

export default reduxForm<FormData, FormProps>({
    form: 'foodForm'
})(Form);
