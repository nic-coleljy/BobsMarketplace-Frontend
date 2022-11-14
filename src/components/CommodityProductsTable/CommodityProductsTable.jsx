import { Button, Grid, Typography } from '@material-ui/core';
import { DataGrid } from '@mui/x-data-grid';
import { useNavigate } from 'react-router-dom';
import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchCommodityProducts } from '../../helpers/BackendAPICalls';
import { UserContext } from '../../helpers/Contexts';
import useStyles from './styles';
import { BackButton } from '..';

const CommodityProductsTable = () => {
    const classes = useStyles();
    const navigate = useNavigate();
    const { id } = useParams();
    const { currentUser, isLoading, setIsLoading } = useContext(UserContext);
    const [selectionIds, setSelectionIds] = useState([]);
    const [products, setProducts] = useState(null);

    useEffect(() => {
        if (currentUser) {
            setIsLoading(true);
            fetchCommodityProducts(id).then((products) => {
                setProducts(products);
                setIsLoading(false);
            });
        }
    }, [currentUser, id, setIsLoading]);

    const columns = [
        { field: 'cid', headerName: 'ID', width: 80 },
        {
            field: 'companyId', headerName: 'Company ID', width: 120, renderCell: (params) => {
                return (
                    <>
                        {params.row.sellerEntity && params.row.sellerEntity.id}
                    </>
                )
            }
        },
        {
            field: 'companyName', headerName: 'Company Name', width: 200, renderCell: (params) => {
                return (
                    <>
                        {params.row.sellerEntity && params.row.sellerEntity.companyName}
                    </>
                )
            }
        },
        { field: 'price', headerName: 'Price(SGD)', width: 100 },
        { field: 'quantity', headerName: 'Quantity', width: 100 },
        { field: 'standardCharge', headerName: 'Standard Charge(SGD)', width: 180 },
        { field: 'expressCharge', headerName: 'Express Charge(SGD)', width: 170 },
        // {
        //     field: 'isBanned', headerName: 'Ban Status', width: 100, renderCell: (params) => {
        //         return (
        //             <>
        //                 {params.row.isBanned ? 'Banned' : 'Okay'}
        //             </>
        //         )
        //     }
        // },
        // {
        //     field: 'actions', headerName: 'Actions', width: 100, renderCell: (params) => {
        //         return (
        //             <Button
        //                 onClick={(e) => console.log(params.row.name)}
        //                 color="primary"
        //                 variant="outlined"
        //             >
        //                 {params.row.isBanned ? 'Unban' : 'Ban'}
        //             </Button>
        //         )
        //     }
        // },
    ];

    const components = {
        Header: () => (
            <div className={classes.tableHeader}>
                <BackButton />
                <Typography variant="h5">
                    Products
                </Typography>
                <div>
                    {/* <Grid container spacing={1}>
                        <Grid item>
                            <Button
                                onClick={(e) => console.log(e)}
                                color="primary"
                                variant="outlined"
                                disabled={selectionIds <= 0}
                            >
                                Ban Selected
                            </Button>
                        </Grid>
                        <Grid item>
                            <Button
                                onClick={(e) => console.log(e)}
                                color="primary"
                                variant="outlined"
                                disabled={selectionIds <= 0}
                            >
                                Unban Selected
                            </Button>
                        </Grid>
                    </Grid> */}
                </div>
            </div>
        ),
    };

    return (
        <>
            {!isLoading && products && (
                <div className={classes.table}>
                    <DataGrid
                        rows={products}
                        columns={columns}
                        pageSize={5}
                        rowsPerPageOptions={[5]}
                        // checkboxSelection
                        // onSelectionModelChange={(ids) =>
                        //     setSelectionIds(ids)
                        // }
                        components={components}
                        getRowId={(row) => row.cid}
                    />
                </div>
            )}
        </>
    )
}

export default CommodityProductsTable