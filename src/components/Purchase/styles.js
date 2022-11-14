import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
    root: {
        margin: "0 auto",
        padding: theme.spacing(3),
        width: 300,
    },
    stepper: {
        padding: theme.spacing(3, 0, 5),
    },
    image: {
        border: '2px solid darkgrey',
    },
}));