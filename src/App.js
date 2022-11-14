import React, { useEffect, useMemo, useState } from 'react';
import { BrowserRouter } from 'react-router-dom';

import { Navbar, AppRoutes, Loading, Error } from './components';

import { UserContext } from './helpers/Contexts';
import { MuiThemeProvider } from '@material-ui/core';
import { theme } from './theme';

const App = () => {
    const [currentUser, setCurrentUser] = useState(JSON.parse(window.localStorage.getItem('currentUser')) || null);
    const [searchTerm, setSearchTerm] = useState('');
    const [sort, setSort] = useState(null);
    const [categories, setCategories] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState(null);
    const userValue = useMemo(
        () => ({ currentUser, setCurrentUser, searchTerm, setSearchTerm, sort, setSort, categories, setCategories, isLoading, setIsLoading, errorMessage, setErrorMessage }),
        [currentUser, searchTerm, sort, categories, isLoading, errorMessage]
    );

    useEffect(() => {
        window.localStorage.setItem('currentUser', JSON.stringify(currentUser));
    }, [currentUser]);

    return (
        <MuiThemeProvider theme={theme}>
            <UserContext.Provider value={userValue}>
                <BrowserRouter>
                    <Navbar />
                    <Loading />
                    <Error />
                    <AppRoutes />
                </BrowserRouter>
            </UserContext.Provider>
        </MuiThemeProvider>
    )
};

export default App;
