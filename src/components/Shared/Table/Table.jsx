import { DataGrid } from '@mui/x-data-grid'
import React from 'react'
import useStyles from './styles';

const Table = ({ rows, columns, setSelectionIds, components, getRowId }) => {
    const classes = useStyles();
    const checkboxSelection = setSelectionIds ? true : false;

    return (
        <div className={classes.table}>
            <DataGrid
                rows={rows}
                columns={columns}
                pageSize={5}
                rowsPerPageOptions={[5]}
                checkboxSelection={checkboxSelection}
                onSelectionModelChange={(ids) =>
                    setSelectionIds(ids)
                }
                components={components}
                getRowId={getRowId}
            />
        </div>
    )
}

export default Table