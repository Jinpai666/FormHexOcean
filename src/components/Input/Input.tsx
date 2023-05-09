import { FC, InputHTMLAttributes, SelectHTMLAttributes } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    errorMessage?: string | boolean;
}

interface SelectInputProps extends SelectHTMLAttributes<HTMLSelectElement> {
    errorMessage?: string | boolean;
    type: string;
}

const Input: FC<InputProps | SelectInputProps> = ({ errorMessage, type, ...props }) => (
    <div className="input">
        {type !== 'select' ? (
            <input type={type} {...props as InputProps} />
        ) : (
            <select {...props as SelectInputProps}>
                <option value="">select type</option>
                <option value="pizza">pizza</option>
                <option value="soup">soup</option>
                <option value="sandwich">sandwich</option>
            </select>
        )}
        {errorMessage && <p className="input__error">{errorMessage}</p>}
    </div>
);

export default Input;
