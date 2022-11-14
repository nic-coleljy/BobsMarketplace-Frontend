import React from 'react';
import { Checkbox, FormControlLabel } from '@material-ui/core';
import { useFormContext, Controller } from 'react-hook-form';

const CheckboxInput = ({ name, label, required, checked, handleChange }) => {
    const { control } = useFormContext();

    return (
        <Controller
            as={Checkbox}
            defaultValue={checked}
            name={name}
            control={control}
            render={({ field }) => (
                <FormControlLabel
                    control={
                        <Checkbox
                            required={required}
                            name={name}
                            {...field}
                            defaultChecked={checked}
                            onChange={(e) => {
                                field.onChange(e);
                                if (handleChange)
                                    handleChange(e);
                            }}
                        />
                    }
                    label={label}
                />
            )}
        />
    )
};

export default CheckboxInput;
