import { Typography } from '@material-ui/core';
import React from 'react';
import { Table } from '..';
import useStyles from './styles';

const OngoingTable = ({ orders, columns }) => {
    const classes = useStyles();

    const components = {
        Header: () => (
            <div className={classes.tableHeader}>
                <Typography variant="h5">
                    Ongoing ({orders.length})
                </Typography>
            </div>
        ),
    };

    return (
        <>
            {orders &&
                <Table
                    rows={orders}
                    columns={columns}
                    components={components}
                    getRowId={(row) => row.tid}
                />
            }
        </>
    )
}

export default OngoingTable