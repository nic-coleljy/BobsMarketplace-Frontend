import React from 'react';
import { FormLabel, MenuItem, Select } from '@material-ui/core';
import { useFormContext, Controller } from 'react-hook-form';

const SelectInput = ({ name, label, required, defaultValue, values }) => {
    const { control } = useFormContext();

    return (
        <Controller
            as={Select}
            defaultValue={defaultValue}
            name={name}
            control={control}
            render={({ field }) => (
                <div>
                    <FormLabel id={label}>
                        {label}
                    </FormLabel>
                    <Select
                        value={values}
                        fullWidth
                        required={required}
                        {...field}
                    >
                        {values.map((value) => (
                            <MenuItem key={value.id} value={value.label}>
                                {value.label}
                            </MenuItem>
                        ))}
                    </Select>
                </div>
            )}
        />
    )
};

export default SelectInput;
