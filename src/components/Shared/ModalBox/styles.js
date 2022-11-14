import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(() => ({
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
}));