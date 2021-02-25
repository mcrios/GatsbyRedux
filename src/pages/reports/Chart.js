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
  makeStyles,
  CardActions,
  Button
} from '@material-ui/core';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward'
// import { useDispatch, useSelector } from 'react-redux'
// import { contarUsuarios } from '../../redux/usuarioReducer'
import { User } from 'react-feather';
import HighchartsReact from 'highcharts-react-official'
import Highcharts from 'highcharts'

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100%'
  },
  avatar: {
    backgroundColor: colors.blue[600],
    height: 56,
    width: 56
  },
  differenceIcon: {
    color: colors.blue[600]
  },
  differenceValue: {
    color: colors.blue[800],
    marginRight: theme.spacing(1)
  }
}));

const options = {
  chart: {
    type: 'pie'
  },
  title: {
    text: 'DBPLANILLASV'
  },
  series: [
    {
      data: [1, 2, 1, 4, 3, 6]
    }
  ]
};

const Chart = ({ db, name, className, ...rest }) => {
  console.log(db);
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
          justify="center"
          spacing={3}
        >
          <Grid item alignItems="center">
            <Typography
              gutterBottom
              variant="h6"
            >
              GRAFICO MUESTRA
            </Typography>
          </Grid>
        </Grid>
        
          <div>
            <HighchartsReact highcharts={Highcharts} options={options}/>
          </div>
      </CardContent>
      <CardActions>
        <Button size="small" color="primary" >Detalle</Button>
      </CardActions>
    </Card>
  );
};

Chart.propTypes = {
  className: PropTypes.string
};

export default Chart;
