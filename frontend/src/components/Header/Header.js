import classes from './Header.module.css';
import Restaurant from '@material-ui/icons/Restaurant';

const Header = () => {

    return (
        <>
            <div className={classes.header}>
                <a href="#" className={classes.logo}>
                    <Restaurant />
                    FoodApp<span>.</span>
                </a>
                <ul className={classes.navigation}>
                    <li><a href="#">Sign Up</a></li>
                    <li><a href="#">Login</a></li>
                </ul>
            </div>
            <div className={classes.root}>
                <div className={classes.content}>
                    <h2>Nothing brings people together like good food..</h2>
                    <p>
                        foodApp provides you best restaurant of town and the restaurant we have contain best quality food and food is also very good in taste. And we also ensure you that we have best service and fastest delivery.
                    </p>
                    <a href="#" className={classes.btn}>Our Menu</a>
                </div>
            </div>
        </>
    )
}

export default Header;
