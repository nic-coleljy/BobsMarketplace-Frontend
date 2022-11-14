import { Link, Typography } from '@material-ui/core'
import React from 'react'

const DataField = ({ label, data, href }) => {
    return (
        <Typography variant='body1' align="center" gutterBottom>
            <b>{label}: </b>{href ? (
                <Link href={href}>
                    {data}
                </Link>
            ) : data}
        </Typography>
    )
}

export default DataField