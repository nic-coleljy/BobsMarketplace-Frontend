import React, { useContext, useState } from 'react'
import { Button, CircularProgress, Collapse, Grid, List, ListItem, ListItemIcon, ListItemText, Toolbar } from '@material-ui/core'
import { Delete, LocalShipping, Person } from '@material-ui/icons';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import { RoleEnum } from '../../helpers/Role';
import { Inventory, Login } from '@mui/icons-material';
import LogoutIcon from '@mui/icons-material/Logout';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../helpers/Contexts';
import { handleDeleteAdmin, handleDeleteBuyer, handleDeleteSeller } from '../../helpers/BackendAPICalls';
import useStyles from './styles';
import { ModalBoxText } from '..';

const DropdownMenu = ({ isMenuOpen, setIsMenuOpen, handleLogout }) => {
    const classes = useStyles();
    const navigate = useNavigate();
    const { currentUser } = useContext(UserContext);
    const [isLoading, setIsLoading] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleClick = (to) => {
        navigate(to);
        window.scrollTo(0, 0);
        setIsMenuOpen(false)
    }

    const handleDelete = () => {
        setIsLoading(true);
        switch (currentUser.role) {
            case RoleEnum.ADMIN:
                handleDeleteAdmin(currentUser.email).then((response) => {
                    handleLogout();
                    setIsModalOpen(false);
                    setIsLoading(false);
                })
                break;
            case RoleEnum.BUYER:
                handleDeleteBuyer(currentUser.email).then((response) => {
                    handleLogout();
                    setIsModalOpen(false);
                    setIsLoading(false);
                })
                break;
            case RoleEnum.SELLER:
                handleDeleteSeller(currentUser.email).then((response) => {
                    handleLogout();
                    setIsModalOpen(false);
                    setIsLoading(false);
                })
                break;
            default:
                console.log("Invalid role!");
        }
    };

    return (
        <>
            <Collapse in={isMenuOpen}>
                <Toolbar className={classes.toolbar}>
                    <List className={classes.toolbarChild}>
                        {currentUser ? (
                            <>
                                <ListItem
                                    onClick={() => handleClick("/profile")}
                                    color="inherit"
                                    className={classes.button}
                                >
                                    <ListItemIcon>
                                        <Person className={classes.icon} />
                                    </ListItemIcon>
                                    <ListItemText primary="Profile" />
                                </ListItem>
                                {currentUser.role === RoleEnum.SELLER && (
                                    <ListItem
                                        onClick={() => handleClick("/product")}
                                        color="inherit"
                                        className={classes.button}
                                    >
                                        <ListItemIcon>
                                            <Inventory className={classes.icon} />
                                        </ListItemIcon>
                                        <ListItemText primary="Products" />
                                    </ListItem>
                                )}
                                {currentUser.role !== RoleEnum.ADMIN && (
                                    <ListItem
                                        onClick={() => handleClick("/order")}
                                        color="inherit"
                                        className={classes.button}
                                    >
                                        <ListItemIcon>
                                            <LocalShipping className={classes.icon} />
                                        </ListItemIcon>
                                        <ListItemText primary="Orders" />
                                    </ListItem>
                                )}
                                <ListItem
                                    onClick={() => setIsModalOpen(true)}
                                    color="inherit"
                                    className={classes.button}
                                >
                                    <ListItemIcon>
                                        <Delete className={classes.icon} />
                                    </ListItemIcon>
                                    <ListItemText primary="Delete Account" />
                                </ListItem>
                                <ListItem
                                    onClick={handleLogout}
                                    color="inherit"
                                    className={classes.button}
                                >
                                    <ListItemIcon>
                                        <LogoutIcon className={classes.icon} />
                                    </ListItemIcon>
                                    <ListItemText primary="Logout" />
                                </ListItem>
                            </>
                        ) : (
                            <>
                                <ListItem
                                    onClick={() => handleClick("/login")}
                                    color="inherit"
                                    className={classes.button}
                                >
                                    <ListItemIcon>
                                        <Login className={classes.icon} />
                                    </ListItemIcon>
                                    <ListItemText primary="Login" />
                                </ListItem>
                                <ListItem
                                    onClick={() => handleClick("/register")}
                                    color="inherit"
                                    className={classes.button}
                                >
                                    <ListItemIcon>
                                        <AppRegistrationIcon className={classes.icon} />
                                    </ListItemIcon>
                                    <ListItemText primary="Registration" />
                                </ListItem>
                            </>
                        )}
                    </List>
                </Toolbar>
            </Collapse>
            <ModalBoxText
                isOpen={isModalOpen}
                setIsOpen={setIsModalOpen}
                title="Delete Account"
                content="Are you sure you want to delete this account?"
                Buttons={() => {
                    return (
                        <>
                            {isLoading ?
                                <CircularProgress />
                                :
                                <Grid container justifyContent="space-around">
                                    <Grid item>
                                        <Button
                                            color='primary'
                                            variant="contained"
                                            onClick={handleDelete}
                                        >
                                            Delete
                                        </Button>
                                    </Grid>
                                    <Grid item>
                                        <Button
                                            variant="outlined"
                                            onClick={() => setIsModalOpen(false)}
                                        >
                                            Cancel
                                        </Button>
                                    </Grid>
                                </Grid>
                            }
                        </>
                    )
                }}
            />
        </>
    )
}

export default DropdownMenu