import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
    root: {
        maxWidth: '1340px',
        margin: "0 auto",
    },
    header: {
        display: 'flex',
        justifyContent: 'space-between',
        padding: theme.spacing(3),
    },
}));