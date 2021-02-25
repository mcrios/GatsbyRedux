import React from 'react'
import clsx from 'clsx';
import PropTypes from 'prop-types';
import {
  Avatar,
  Box,
  Card,
  CardContent,
  Grid,
  Typography,
  colors,
  makeStyles
} from '@material-ui/core';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward'
// import { useDispatch, useSelector } from 'react-redux'
// import { contarUsuarios } from '../../redux/usuarioReducer'
import { User } from 'react-feather';

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100%'  
  },
  avatar: {
    backgroundColor: colors.red[600],
    height: 56,
    width: 56
  },
  differenceIcon: {
    color: colors.red[900]
  },
  differenceValue: {
    color: colors.red[900],
    marginRight: theme.spacing(1)
  }
}));

const Budget = ({ className, ...rest }) => {
  const classes = useStyles()
  // const dispatch = useDispatch()
  // const conteo = useSelector(store => store.usuario.contador)

  // useEffect(()=>{
  //   dispatch(contarUsuarios())

  //   let id = setInterval(() => {
  //     dispatch(contarUsuarios())
  //   }, 5000)
  //   return () => clearInterval(id)
  // }, [])

  return (
    <Card
      className={clsx(classes.root, className)}
      {...rest}
    >
      <CardContent>
        <Grid
          container
          justify="space-between"
          spacing={3}
        >
          <Grid item>
            <Typography
              color="textSecondary"
              gutterBottom
              variant="h6"
            >
              USUARIOS ACTIVOS
            </Typography>
            <Typography
              color="textPrimary"
              variant="h3"
            >
              5
            </Typography>
          </Grid>
          <Grid item>
            <Avatar className={classes.avatar}>
              <User />
            </Avatar>
          </Grid>
        </Grid>
        <Box
          mt={2}
          display="flex"
          alignItems="center"
        >
          <ArrowDownwardIcon className={classes.differenceIcon} />
          <Typography
            className={classes.differenceValue}
            variant="body2"
          >
            12%
          </Typography>
          <Typography
            color="textSecondary"
            variant="caption"
          >
            Since last month
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

Budget.propTypes = {
  className: PropTypes.string
};

export default Budget;
