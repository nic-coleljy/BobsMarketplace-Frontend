import React from 'react';
import { TextField } from '@material-ui/core';
import { useFormContext, Controller } from 'react-hook-form';

const TextInput = ({ name, label, required, type, value, InputProps, error, helperText, handleChange }) => {
    const { control } = useFormContext();

    return (
        <Controller
            name={name}
            defaultValue={value}
            control={control}
            render={({ field }) => (
                <TextField
                    name={name}
                    margin="normal"
                    fullWidth
                    label={label}
                    type={type}
                    required={required}
                    error={error}
                    helperText={error && helperText}
                    InputProps={InputProps}
                    {...field}
                    onChange={event => {
                        field.onChange(event);
                        if (handleChange) {
                            handleChange(event);
                        }
                    }}
                />
            )}
        />
    )
};

export default TextInput;
