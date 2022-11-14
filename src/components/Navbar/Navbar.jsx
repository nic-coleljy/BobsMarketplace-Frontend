import React, { useContext, useState } from 'react';
import { AppBar, Toolbar, Icon, Link, Grid, IconButton } from '@material-ui/core';
import SearchBar from "material-ui-search-bar";
import { useLocation, useNavigate } from 'react-router-dom';

import logo from '../../assets/bobs_marketplace.png';
import useStyles from './styles';
import { UserContext } from '../../helpers/Contexts';
import LogoutIcon from '@mui/icons-material/Logout';
import { Login } from '@mui/icons-material';
import { Menu, MenuOpen } from '@material-ui/icons';
import DropdownMenu from './DropdownMenu';

const Navbar = () => {
    const classes = useStyles();
    const location = useLocation();
    const navigate = useNavigate();
    const { currentUser, setCurrentUser, searchTerm, setSearchTerm, sort, categories } = useContext(UserContext);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const searchBarPlaceHolder = "Search for commodity...";
    const isNotLoginRegister = location.pathname !== '/login' && location.pathname !== '/register';

    const handleLogout = () => {
        setCurrentUser(null);
        navigate('/');
        window.scrollTo(0, 0);
        setIsMenuOpen(false);
    }

    const onSearch = () => {
        var url = `/search=${searchTerm}`;
        if (sort) {
            url += `&sort=${sort}`;
        }
        if (categories) {
            url += `&categories=`;
            categories.forEach((category) => url += `${category}_`);
            if (categories.length > 0) {
                url = url.slice(0, -1);
            }
        }
        navigate(url);
        window.scrollTo(0, 0);
        setIsMenuOpen(false);
    }

    return (
        <>
            <AppBar position="fixed" className={classes.appBar} color="primary">
                <Toolbar className={classes.toolbar}>
                    <Grid
                        container
                        className={classes.toolbarChild}
                        justify="space-between"
                        spacing={24}
                    >
                        <Grid item>
                            {isNotLoginRegister &&
                                <IconButton
                                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                                    color="inherit"
                                >
                                    {isMenuOpen ? <MenuOpen /> : <Menu />}
                                </IconButton>
                            }
                        </Grid>
                        <Grid item>
                            <Icon className={classes.logo} aria-label="Bob's Marketplace Home" color="inherit">
                                <Link href="/" >
                                    <img src={logo} alt="Bob's Marketplace" height="40px" />
                                </Link>
                            </Icon>
                        </Grid>
                        <Grid item>
                            {currentUser ?
                                <IconButton
                                    onClick={handleLogout}
                                    color="inherit"
                                    className={classes.button}
                                >
                                    <LogoutIcon />
                                </IconButton>
                                : isNotLoginRegister && (
                                    <IconButton
                                        href="/login"
                                        color="inherit"
                                        className={classes.button}
                                    >
                                        <Login />
                                    </IconButton>
                                )
                            }
                        </Grid>
                    </Grid>
                </Toolbar>
                {currentUser &&
                    <Toolbar className={classes.toolbar} >
                        <SearchBar
                            className={classes.toolbarChild}
                            value={searchTerm}
                            placeholder={searchBarPlaceHolder}
                            onChange={(value) => setSearchTerm(value)}
                            onRequestSearch={onSearch}
                        />
                    </Toolbar>
                }
                <DropdownMenu
                    isMenuOpen={isMenuOpen}
                    setIsMenuOpen={setIsMenuOpen}
                    currentUser={currentUser}
                    handleLogout={handleLogout}
                />
            </AppBar>
            {
                currentUser &&
                <div className={classes.toolbarSpacing} />
            }
            <div className={classes.toolbarSpacing} />
        </>
    )
};

export default Navbar;
