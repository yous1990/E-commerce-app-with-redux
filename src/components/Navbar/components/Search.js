import React, {useState} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux'
import { fade, makeStyles } from '@material-ui/core/styles';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';
import {searchPhotos, fetchPhotos} from '../../../redux/photos/photos.actions';

const useStyles = makeStyles((theme) => ({
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: fade(theme.palette.common.white, 0.25),
        },
        marginRight: theme.spacing(2),
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(3),
            width: 'auto',
        },
    },
    searchIcon: {
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputRoot: {
        color: 'inherit',
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: '20ch',
        },
    },
}));

function Search({photos, searchPhotos}) {
    const classes = useStyles();

    const [search, setSearch] = useState("")

    const handleSearch = (e) => {
        e.preventDefault();
        setSearch(e.target.value)
        searchPhotos(search)
    }

    return (
        <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Search…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ 'aria-label': 'search' }}
              onChange={handleSearch}
            />
        </div>
    );
}

const mapStateToProps = (state) => ({
    photos: state.photos,
})

const mapDispatchToProps = {
    searchPhotos,
    fetchPhotos
}

Search.propTypes = {
    photos: PropTypes.object,
    searchPhotos: PropTypes.func,
};
export default connect(mapStateToProps, mapDispatchToProps)(Search)