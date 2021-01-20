import React from 'react';
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import { makeStyles } from '@material-ui/core/styles';
import Popover from '@material-ui/core/Popover';
import IconButton from '@material-ui/core/IconButton';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import Badge from '@material-ui/core/Badge';
import Typography from "@material-ui/core/Typography";
import Divider from '@material-ui/core/Divider';
import ShoppingCartItem from './components/ShoppingCartItem';
import { removeProductFromCart } from "../../redux/cart/cart.actions";
import EmptyCart from "../../assets/empty-cart.svg"

const useStyles = makeStyles((theme) => ({
    paper: {
        border: '1px solid',
        padding: theme.spacing(1),
        backgroundColor: theme.palette.background.paper,
    },
    cartItem: {
        widht: '100%',
        height: '100%'
    }
}));

function ShoppingCart({ products, removeProduct }) {
    const classes = useStyles();

    const [anchorEl, setAnchorEl] = React.useState(null);

    const openShoppingCart = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const closeShoppingCart = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    const countItems = () =>
        products
            .reduce((acc, cur) => {
                return parseFloat(acc + (cur.quantity || 1));
            }, 0)
            .toFixed(0);


    return (
        <React.Fragment>
            <IconButton
                aria-label="open shopping cart"
                color="inherit"
                onClick={openShoppingCart}
            >
                <Badge badgeContent={countItems()} color="secondary">
                    <ShoppingCartIcon />
                </Badge>
            </IconButton>
            <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={closeShoppingCart}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                }}
            >
                <div className={classes.paper}>
                    <div className="header">
                        <Typography variant="subtitle1" gutterBottom>
                            Order Summary ({countItems()})
                        </Typography>
                    </div>
                    <Divider />
                    <div className="cart">
                        {products.length
                            ? products.map((item, index) => {
                                return (
                                    <div key={index} className={classes.cartItem}>
                                        <ShoppingCartItem
                                            product={item}
                                            handleRemoveItem={() => removeProduct(index)}
                                        />
                                    </div>
                                )
                            })
                            :  <img
                                alt="emptycart"
                                src={EmptyCart}
                                height={"100px"}
                                />
                            }
                    </div>
                </div>
            </Popover>
        </React.Fragment>

    );
}

const mapStateToProps = (state) => ({
    products: state.products
})

const mapDispatchToProps = dispatch => {
    return {
        removeProduct: index => dispatch(removeProductFromCart(index))
    };
};

ShoppingCart.propTypes = {
    products: PropTypes.array, 
    removeProduct: PropTypes.func
};

export default connect(mapStateToProps, mapDispatchToProps)(ShoppingCart)