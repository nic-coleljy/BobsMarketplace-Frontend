import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
    content: {
        padding: theme.spacing(3),
        maxWidth: '1340px',
        width: '90vw',
        margin: "0 auto",
    },
    roots: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.default,
    }
}));