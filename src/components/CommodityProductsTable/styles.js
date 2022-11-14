import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
    table: {
        width: '100%',
        height: 430,
    },
    tableHeader: {
        display: 'flex',
        justifyContent: 'space-between',
        padding: theme.spacing(3),
    },
}));