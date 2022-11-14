import { Grid } from '@material-ui/core'
import React from 'react'
import { CheckboxInput } from '..'

const CheckBoxInputs = ({ values, handleChange, defaultValue }) => {
    return (
        <Grid container spacing={2} >
            {values.map((value) => (
                <Grid
                    item
                    key={value}
                    xs={12}
                    sm={4}
                    md={3}
                    lg={2}
                    align="left"
                >
                    {defaultValue.includes(value) ?
                        <CheckboxInput
                            name={value}
                            label={value}
                            checked={true}
                            handleChange={handleChange}
                        />
                        :
                        <CheckboxInput
                            name={value}
                            label={value}
                            checked={false}
                            handleChange={handleChange}
                        />
                    }

                </Grid>
            ))}
        </Grid >
    )
}

export default CheckBoxInputs