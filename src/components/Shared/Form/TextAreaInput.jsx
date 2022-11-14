import React from 'react';
import { TextField } from '@material-ui/core';
import { useFormContext, Controller } from 'react-hook-form';

const TextAreaInput = ({ name, label, placeholder, multiline, rows, maxRows }) => {
    const { control } = useFormContext();

    return (
        <Controller
            name={name}
            control={control}
            render={({ field }) => (
                <TextField
                    name={name}
                    margin="normal"
                    fullWidth
                    label={label}
                    placeholder={placeholder}
                    multiline={multiline}
                    maxRows={maxRows}
                    {...field}
                />
            )}
        />
    )
};

export default TextAreaInput;
