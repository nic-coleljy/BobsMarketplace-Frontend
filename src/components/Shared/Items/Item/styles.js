import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(() => ({
    root: {
        maxWidth: '100%',
    },
    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
    },
    cardContent: {
        textDecoration: 'none',
        display: 'block',
        "&:hover": {
            textDecoration: 'none',
        }
    },
    cardContentPrimary: {
        display: 'flex',
        justifyContent: 'space-between',
    },
    cardActions: {
        display: 'flex',
        justifyContent: 'space-between',
    },
}));