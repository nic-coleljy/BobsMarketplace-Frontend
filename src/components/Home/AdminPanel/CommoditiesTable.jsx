import { Avatar, Button, Grid, Typography } from '@material-ui/core';
import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { fetchCommodities, handleRemoveCommodity } from '../../../helpers/BackendAPICalls';
import { UserContext } from '../../../helpers/Contexts';
import useStyles from './styles';
import { Table } from '../../';

const CommoditiesTable = () => {
    const classes = useStyles();
    const navigate = useNavigate();
    const { currentUser, isLoading, setIsLoading, errorMessage, setErrorMessage } = useContext(UserContext);
    const [commodities, setCommodities] = useState(null);
    const [selectionIds, setSelectionIds] = useState([]);

    useEffect(() => {
        if (currentUser) {
            setIsLoading(true);
            fetchCommodities().then((commodities) => {
                setCommodities(commodities);
                setIsLoading(false);
            });
        }
    }, [currentUser, setIsLoading]);

    const handleDelete = (id) => {
        setIsLoading(true);
        handleRemoveCommodity(id).then((response) => {
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
            handleRemoveCommodity(id).then((response) => {
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
        { field: 'cnid', headerName: 'ID', width: 80 },
        { field: 'name', headerName: 'Name', width: 150 },
        {
            field: 'image', headerName: 'Image', width: 80, renderCell: (params) => {
                return (
                    <Avatar src={params.row.pictureUrl} />
                )
            }
        },
        {
            field: 'category', headerName: 'Category', width: 90, renderCell: (params) => {
                return (
                    <>
                        {params.row.categoryEntity.name}
                    </>
                )
            }
        },
        { field: 'uom', headerName: 'Unit Of Measure', width: 140 },
        {
            field: 'page', headerName: 'Page', width: 100, renderCell: (params) => {
                return (
                    <Button
                        onClick={() => navigate(`/commodity/${params.row.cnid}`)}
                        color="primary"
                        variant="outlined"
                    >
                        View
                    </Button>
                )
            }
        },
        {
            field: 'products', headerName: 'Products', width: 100, renderCell: (params) => {
                return (
                    <Button
                        onClick={(e) => navigate(`/commodity/product/${params.row.cnid}`)}
                        color="primary"
                        variant="outlined"
                    >
                        View
                    </Button>
                )
            }
        },
        {
            field: 'actions', headerName: 'Actions', width: 200, renderCell: (params) => {
                return (
                    <Grid container spacing={1}>
                        <Grid item>
                            <Button
                                onClick={() => navigate(`/commodity/edit/${params.row.cnid}`)}
                                color="primary"
                                variant="outlined"
                            >
                                Edit
                            </Button>
                        </Grid>
                        {/* <Grid item>
                            <Button
                                onClick={(e) => handleDelete(params.row.cnid)}
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
                    Commodities
                </Typography>
                <div>
                    <Grid container spacing={1}>
                        <Grid item>
                            <Button
                                onClick={() => navigate('/commodity/edit/add')}
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
            {!isLoading && !errorMessage && commodities &&
                <Table
                    rows={commodities}
                    columns={columns}
                    // setSelectionIds={setSelectionIds}
                    components={components}
                    getRowId={(row) => row.cnid}
                />
            }
        </>
    )
}

export default CommoditiesTable