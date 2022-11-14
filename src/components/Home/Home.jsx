import React, { useContext, useEffect, useState } from 'react';

import { UserContext } from '../../helpers/Contexts';

import { fetchSellableCommodities } from '../../helpers/BackendAPICalls';
import AdminPanel from './AdminPanel/AdminPanel';
import { RoleEnum } from '../../helpers/Role';
import { Items, Commodity } from '..';
import NoUserHome from './NoUserHome.';

const Home = () => {
    const { currentUser, setIsLoading } = useContext(UserContext);
    const [commodities, setCommodities] = useState(null);

    useEffect(() => {
        if (currentUser) {
            setIsLoading(true);
            fetchSellableCommodities().then((commodities) => {
                setCommodities(commodities);
                setIsLoading(false);
            });
        }
    }, [currentUser, setIsLoading]);

    return (
        <>
            {!currentUser ? (
                <NoUserHome />
            ) : currentUser.role === RoleEnum.ADMIN ? (
                <AdminPanel />
            ) : commodities && (
                <Items
                    items={commodities}
                    Item={Commodity}
                />
            )}
        </>
    )
};

export default Home;
