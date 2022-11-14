import { Button, Grid, Typography } from '@material-ui/core';
import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { fetchCategories, handleRemoveCategory } from '../../../helpers/BackendAPICalls';
import { UserContext } from '../../../helpers/Contexts';
import useStyles from './styles';
import { Table } from '../..';

const CategoriesTable = () => {
    const classes = useStyles();
    const navigate = useNavigate();
    const { currentUser, isLoading, setIsLoading, errorMessage, setErrorMessage } = useContext(UserContext);
    const [categories, setCategories] = useState([]);
    const [selectionIds, setSelectionIds] = useState([]);

    useEffect(() => {
        if (currentUser) {
            setIsLoading(true);
            fetchCategories().then((categories) => {
                setCategories(categories);
                setIsLoading(false);
            });
        }
    }, [currentUser, setIsLoading]);

    const handleDelete = (id) => {
        setIsLoading(true);
        handleRemoveCategory(id).then((response) => {
            if (response.status === 200) {
                window.location.reload(false);
            } else {
                setErrorMessage('An Error Occurred');
            }
            setIsLoading(false);
        });
    }

    const handleDeleteSelected = () => {
        setIsLoading(true);
        let toDelete = selectionIds.length;
        selectionIds.forEach((id) => {
            handleRemoveCategory(id).then((response) => {
                if (response.status === 200) {
                    if (--toDelete === 0) {
                        window.location.reload(false);
                        setIsLoading(false);
                    }
                } else {
                    setErrorMessage('An Error Occurred');
                    setIsLoading(false);
                }
            });
        })
    }

    const columns = [
        { field: 'catid', headerName: 'ID', width: 80 },
        { field: 'name', headerName: 'Name', width: 150 },
        {
            field: 'actions', headerName: 'Actions', width: 200, renderCell: (params) => {
                return (
                    <Grid container spacing={1}>
                        <Grid item>
                            <Button
                                onClick={() => navigate(`/category/edit/${params.row.catid}`)}
                                color="primary"
                                variant="outlined"
                            >
                                Edit
                            </Button>
                        </Grid>
                        {/* <Grid item>
                            <Button
                                onClick={(e) => handleDelete(params.row.catid)}
                                color="primary"
                                variant="outlined"
                            >
                                Delete
                            </Button>
                        </Grid> */}
                    </Grid>
                )
            }
        },
    ];

    const components = {
        Header: () => (
            <div className={classes.tableHeader}>
                <Typography variant="h5">
                    Categories
                </Typography>
                <div>
                    <Grid container spacing={1}>
                        <Grid item>
                            <Button
                                onClick={() => navigate('/category/edit/add')}
                                color="primary"
                                variant="contained"
                            >
                                + Add
                            </Button>
                        </Grid>
                        {/* <Grid item>
                            <Button
                                onClick={handleDeleteSelected}
                                color="primary"
                                variant="outlined"
                                disabled={selectionIds <= 0}
                            >
                                Delete Selected
                            </Button>
                        </Grid> */}
                    </Grid>
                </div>
            </div>
        ),
    };

    return (
        <>
            {!isLoading && !errorMessage && categories &&
                <Table
                    rows={categories}
                    columns={columns}
                    // setSelectionIds={setSelectionIds}
                    components={components}
                    getRowId={(row) => row.catid}
                />
            }
        </>
    )
}

export default CategoriesTable