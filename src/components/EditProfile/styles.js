import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
    root: {
        padding: 20,
        width: 300,
        margin: "0 auto",
    },
    avatar: {
        backgroundColor: theme.palette.secondary.main,
    },
    button: {
        margin: '8px 0',
        display: 'block',
    },
    register: {
        textAlign: 'center',
    },
    error: {
        color: 'red',
    },
}));