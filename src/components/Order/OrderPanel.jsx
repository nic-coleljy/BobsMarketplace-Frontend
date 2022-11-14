import React, { useContext, useEffect, useState } from 'react';
import { Separator } from '..';
import { fetchOrders } from '../../helpers/BackendAPICalls';
import { UserContext } from '../../helpers/Contexts';
import CompletedTable from './CompletedTable';
import OngoingTable from './OngoingTable';

const OrderPanel = () => {
    const { currentUser, isLoading, setIsLoading } = useContext(UserContext);
    const [ongoingOrders, setOngoingOrders] = useState(null);
    const [completedOrders, setCompletedOrders] = useState(null);

    useEffect(() => {
        if (currentUser) {
            setIsLoading(true);
            fetchOrders(currentUser.id).then((orders) => {
                let ongoing = [];
                let completed = [];
                orders.forEach((order) => {
                    switch (order.status) {
                        case 'Transacting':
                            ongoing.push(order);
                            break;
                        case 'Completed':
                            completed.push(order);
                            break;
                        default:
                            break;
                    }
                });
                setOngoingOrders(ongoing);
                setCompletedOrders(completed);
                setIsLoading(false);
            });
        }
    }, [currentUser, setIsLoading]);

    const columns = [
        { field: 'tid', headerName: 'ID', width: 80 },
        {
            field: 'commodity', headerName: 'Commodity', width: 100, renderCell: (params) => {
                return (
                    <>
                        {params.row.commodityEntity.commodityNameEntity.name}
                    </>
                )
            }
        },
        { field: 'quantity', headerName: 'Quantity', width: 90 },
        { field: 'comment', headerName: 'Comment', width: 200 },
        { field: 'minPrice', headerName: 'Price/unit(SGD)', width: 130 },
        { field: 'subTotal', headerName: 'Sub-Total(SGD)', width: 130 },
        { field: 'address', headerName: 'Address', width: 250 },
        { field: 'zip', headerName: 'ZIP/Postal Code', width: 140 },
        {
            field: 'isExpress', headerName: 'Delivery Mode', width: 120, renderCell: (params) => {
                return (
                    <>
                        {params.row.isExpress ? 'Express' : 'Standard'}
                    </>
                )
            }
        },
        { field: 'deliveryCharge', headerName: 'Delivery Charge(SGD)', width: 170 },
        { field: 'commission', headerName: 'Commission(SGD)', width: 150 },
        { field: 'totalCost', headerName: 'Total(SGD)', width: 110 },
        { field: 'financing', headerName: 'Finance Amount(SGD)', width: 170 },
        {
            field: 'payable', headerName: 'Payable(SGD)', width: 130, renderCell: (params) => {
                return (
                    <>
                        {(params.row.totalCost - params.row.financing).toFixed(2)}
                    </>
                )
            }
        },
        {
            field: 'buyer', headerName: 'Buyer', width: 300, renderCell: (params) => {
                return (
                    <>
                        {params.row.buyerEntity.companyName}(<a href={"mailto:" + params.row.buyerEntity.email}>{params.row.buyerEntity.email}</a>)
                    </>
                )
            }
        },
        {
            field: 'seller', headerName: 'Seller', width: 300, renderCell: (params) => {
                return (
                    <>
                        {params.row.commodityEntity.sellerEntity.companyName}(<a href={"mailto:" + params.row.commodityEntity.sellerEntity.email}>{params.row.commodityEntity.sellerEntity.email}</a>)
                    </>
                )
            }
        },
        {
            field: 'dateTime', headerName: 'Date Time', width: 220, renderCell: (params) => {
                return (
                    <>
                        {params.row.dateTime.replace("T", ", ")}
                    </>
                )
            }
        },
    ];

    return (
        <>
            {!isLoading &&
                <>
                    <OngoingTable
                        orders={ongoingOrders}
                        columns={columns}
                    />
                    <Separator />
                    <CompletedTable
                        orders={completedOrders}
                        columns={columns}
                    />
                </>
            }
        </>
    )
}

export default OrderPanel