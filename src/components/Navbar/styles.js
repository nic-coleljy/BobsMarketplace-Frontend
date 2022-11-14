import { makeStyles } from '@material-ui/core/styles';

const drawerWidth = 0;

export default makeStyles((theme) => ({
    appBar: {
        boxShadow: 'none',
        borderBottom: '1px solid rgba(0, 0, 0, 0.12)',
        [theme.breakpoints.up('sm')]: {
            width: `calc(100% - ${drawerWidth}px)`,
            marginLeft: drawerWidth,
        },
    },
    logo: {
        width: '100%',
        height: '100%',
        alignItems: 'center',
        display: 'flex',
        textDecoration: 'none',
    },
    button: {
        "&:hover": {
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
            textDecoration: 'none',
            cursor: 'pointer',
        },
    },
    menuItem: {
        zIndex: 1,
    },
    list: {
        width: "100%",
    },
    icon: {
        color: 'white',
    },
    modal: {
        width: '300px',
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        backgroundColor: 'lightgray',
        border: '2px solid #000',
        textAlign: 'center',
        padding: '10px',
    },
    toolbar: {
        justifyContent: 'center',
    },
    toolbarChild: {
        flexGrow: 1,
        maxWidth: '1340px',
    },
    toolbarSpacing: theme.mixins.toolbar,
}));