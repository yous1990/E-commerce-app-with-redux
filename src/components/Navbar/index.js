import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Search from './components/Search';
import ShoppingCart from '../ShoppingCart/index';


const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  cartSection: {
    display: 'flex',
  },
}));

export default function Navbar() {
  const classes = useStyles();

  return (
    <div className={classes.grow}>
      <AppBar position="static">
        <Toolbar>
          <Typography className={classes.title} variant="h6" noWrap>
            MAIIA
          </Typography>
          <Search/>
          <div className={classes.grow} />
          <div className={classes.cartSection}>
            <ShoppingCart />
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
}
