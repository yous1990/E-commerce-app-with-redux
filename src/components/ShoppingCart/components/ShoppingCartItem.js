import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import RemoveShoppingCartIcon from '@material-ui/icons/RemoveShoppingCart';

const useStyles = makeStyles((theme) => ({
    root: {
        maxWidth: "100%",
        display: 'flex',
        margin: theme.spacing(3),
    },
    avatar: {
        width: theme.spacing(3),
        height: theme.spacing(3),
        marginTop: 10,
    },
    itemTitle: {
        margin: 10,
    }
}));

export default function ShoppingCartItem({product, handleRemoveItem}) {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <img
                loading={"eager"}
                alt="thumbnail"
                src={product.thumbnailUrl}
                height={"50px"}
            />
            <Typography className={classes.itemTitle} variant="caption"  gutterBottom>{product.title}</Typography>
            <Avatar className={classes.avatar}>{product.quantity ? product.quantity : '1'}</Avatar>
            <IconButton
                onClick={handleRemoveItem}
                data-id={product.id}
                aria-label="remove from cart"
                color="primary"
                size="small"
                className={classes.removeButton}
            >
                <RemoveShoppingCartIcon />
            </IconButton>
        </div>
    );
}

ShoppingCartItem.propTypes = {
    product: PropTypes.object,
    handleRemoveItem: PropTypes.func,
};