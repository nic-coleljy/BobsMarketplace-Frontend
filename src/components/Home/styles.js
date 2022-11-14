import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
    hero: {
        width: '100vw',
        height: '100vh',
        top: 0,
        left: 0,
        position: 'fixed',
        backgroundImage: `url(https://images.unsplash.com/photo-1630683924997-fe27050a0416?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80)`,
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        filter: 'blur(3px) brightness(40%)',
        textAlign: 'center',
        verticalAlign: 'center',
        zIndex: -1,
    },
    title: {
        color: 'white',
        textAlign: 'center',
    },
}));