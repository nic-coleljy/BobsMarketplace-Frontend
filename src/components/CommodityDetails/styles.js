import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
    root: {
        justifyContent: 'center',
        padding: theme.spacing(3),
        maxWidth: '1340px',
        margin: "0 auto",
    },
    image: {
        border: 'solid 1px black',
        height: '350px',
        objectFit: 'cover',
    },
    info: {
        height: '100%',
    },
    category: {
        marginBottom: theme.spacing(1),
    },
    infoPrimary: {
        display: 'flex',
        justifyContent: 'space-between',
    },
    purchase: {
        marginTop: 'auto'
    },
    purchaseIcon: {
        marginLeft: '10px',
    },
}));