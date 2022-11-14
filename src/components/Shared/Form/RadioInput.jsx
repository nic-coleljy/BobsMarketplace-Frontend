import React from 'react';
import { FormControl, FormControlLabel, FormLabel, Radio, RadioGroup } from '@material-ui/core';
import { useFormContext, Controller } from 'react-hook-form';

const RadioInput = ({ name, label, required, defaultValue, values, handleChange }) => {
    const { control } = useFormContext();

    return (
        <Controller
            as={RadioGroup}
            defaultValue={defaultValue}
            name={name}
            control={control}
            render={({ field }) => (
                <FormControl
                    required={required}
                    margin="normal"
                >
                    <FormLabel id={label}>
                        {label}
                    </FormLabel>
                    <RadioGroup
                        row
                        {...field}
                        aria-labelledby={label}
                        name={name}
                        defaultValue={defaultValue}
                        onChange={(e) => {
                            field.onChange(e);
                            if (handleChange) {
                                handleChange(e);
                            }
                        }}
                    >
                        {values.map((value) => (
                            <FormControlLabel
                                value={value}
                                control={<Radio />}
                                label={value}
                                key={value}
                            />
                        ))}
                    </RadioGroup>
                </FormControl>
            )}
        />
    )
};

export default RadioInput;
