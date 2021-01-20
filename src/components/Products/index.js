import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import Fade from "react-reveal/Fade";
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Pagination from "@material-ui/lab/Pagination";
import IconButton from '@material-ui/core/IconButton';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import { fetchPhotos } from '../../redux/photos/photos.actions';
import { addProductToCart } from '../../redux/cart/cart.actions';
import PlaceHolder from './components/PlaceHolder';

const useStyles = makeStyles((theme) => ({
    root: {
        textAlign: "center",
        padding: theme.spacing(4)
    },
    card: {
        padding: theme.spacing(2),
        position: "relative",
        [theme.breakpoints.up('sm')]: {
            height: 300,
            width: 300,
        },
    },
    addToCart: {
        position: "absolute",
        bottom: "5px",
        right: "5px",
        cursor: "pointer",
    },
    pagination: {
        display: "flex",
        justifyContent: "center",
        marginLeft: "auto",
        paddingBottom: theme.spacing(2),
        paddingTop: theme.spacing(2),
    },
}));

function Products({
    fetchPhotos,
    addProductToCart,
    errorMessage,
    photos,
    isFetching}) {

    const classes = useStyles();

    const count = Math.ceil(photos.length / 15);
    const [page, setPage] = useState(1);
    const [minimum, setMinimum] = useState(0);
    const [maximum, setMaximum] = useState(15);
    const [pagePhotos, setPagePhotos] = useState([]);

    useEffect(() => {
        fetchPhotos();
    }, [fetchPhotos])

    useEffect(() => {
        setPagePhotos(photos.slice(minimum, maximum));
    }, [page, isFetching, photos, minimum, maximum]);

    const handleChange = (event, value) => {
        setPage(value);
        setMinimum((value - 1) * 15);
        setMaximum(value * 15);
    };

    return (
        <Fade bottom cascade>
        <Box className={classes.root}>
            <Grid container justify={"center"} alignItems={"center"} spacing={2}>
                {
                    pagePhotos.length > 1 || !isFetching ?
                        (
                            pagePhotos.map(photo => (
                                <Grid item xs={10} sm={5} md={3} key={photo.id} >
                                    <Paper className={classes.card} elevation={10}>
                                        {photo.id}
                                        <Typography>{photo.title}</Typography>
                                        <Box style={{ height: "200px" }}>
                                            <img
                                                loading={"eager"}
                                                src={photo.thumbnailUrl}
                                                alt={""}
                                                height={"200px"}
                                            />
                                        </Box>
                                        <div className={classes.addToCart}>
                                            <IconButton
                                                onClick={() => addProductToCart(photo)}
                                                aria-label="add to cart"
                                                color="primary"
                                            >
                                                <AddShoppingCartIcon />
                                            </IconButton>
                                        </div>
                                    </Paper>
                                </Grid>
                            ))
                        )

                        : <PlaceHolder />
                }
            </Grid>
            <Pagination
                count={count}
                page={page}
                onChange={handleChange}
                className={classes.pagination}
                color="primary"
                variant="outlined"
                size="small"
            />
            {
                // A améliorer dans un composant séparé avec son propre css
                errorMessage && <h1>{errorMessage}</h1>
            }
        </Box>
        </Fade>
    );
}

const mapStateToProps = (state) => ({
    photos: state.photos.data,
    isFetching: state.photos.isFetching,
    errorMessage: state.photos.errorMessage
})

const mapDispatchToProps = {
    fetchPhotos,
    addProductToCart,
}

Products.propTypes = {
    fetchPhotos: PropTypes.func,
    addProductToCart: PropTypes.func,
    errorMessage: PropTypes.string,
    photos: PropTypes.array,
    isFetching: PropTypes.bool
};

export default connect(mapStateToProps, mapDispatchToProps)(Products)

