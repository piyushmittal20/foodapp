import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import RestaurantIcon from '@material-ui/icons/Restaurant';

const Header = () => {
    const useStyles = makeStyles((theme) => ({
        root: {
            flexGrow: 1,
        },
        navbar: {
            backgroundColor: "#7a57d1",
        },
        title: {
            flexGrow: 1,
            margin: theme.spacing(1),
            fontSize: "25px",
            fontWeight: 700,
        },
        button: {
            color: "black",
            margin: theme.spacing(1),
            backgroundColor: "#fff",
        },
    }));

    const classes = useStyles();

    return (
        <>
            <div className={classes.root}>
                <AppBar position="static" className={classes.navbar}>
                    <Toolbar>
                        <RestaurantIcon />
                        <Typography variant="h6" className={classes.title}>
                            FoodApp.
                        </Typography>
                        <Button variant="contained" className={classes.button}>SignUp</Button>
                        <Button variant="contained" className={classes.button}>Login</Button>
                    </Toolbar>
                </AppBar>
            </div>
        </>
    )
}

export default Header;
