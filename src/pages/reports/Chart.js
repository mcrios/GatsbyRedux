import React from 'react'
import clsx from 'clsx';
import PropTypes from 'prop-types';
import {
  Card,
  CardContent,
  Grid,
  Typography,
  colors,
  makeStyles,
  CardActions,
  Button
} from '@material-ui/core'
import HighchartsReact from 'highcharts-react-official'
import HighchartsStockChart from 'highcharts'

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

const Chart = ({ db, name, className, ...rest }) => {

  const options = {
    chart: {
      plotBackgroundColor: null,
      plotBorderWidth: null,
      plotShadow: false,
      type: 'pie'
    },
    title: {
      text: name
    },
    tooltip: {
      pointFormat: '{series.name}: <b>{point.y} GB</b>'
    },
    accessibility: {
      point: {
        valueSuffix: '%'
      }
    },
    plotOptions: {
      pie: {
        allowPointSelect: true,
        cursor: 'pointer',
        dataLabels: {
          enabled: false
        },
        showInLegend: true
      }
    },
    legend: {
      labelFormatter: function () {
        console.log(this);
        return this.name + ': ' + this.y + ' GB';
      }
    },
    series: [{
      name: 'Almacenamiento',
      colorByPoint: true,
      data: [{
        name: 'Disponible',
        color: '#1D7BFA',
        y: Number(typeof db !== 'undefined' && typeof db["/u01"] !== 'undefined' ? parseFloat(db["/u01"]["AVAIL"] / 1024 / 1024).toFixed(2) : 0)
      }, {
        name: 'Usado',
        color: '#FB306A',
        y: Number(typeof db !== 'undefined' && typeof db["/u01"] !== 'undefined' ? parseFloat(db["/u01"]["USED"] / 1024 / 1024).toFixed(2) : 0)
      }]
    }]
  }

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
              Estado de disco en: {name}
            </Typography>
          </Grid>
        </Grid>

        <div>
          <HighchartsReact highcharts={HighchartsStockChart} options={options} />
        </div>
      </CardContent>
      <CardActions>
        <Button size="small" color="primary" >Table Space</Button>
      </CardActions>
    </Card>
  );
};

Chart.propTypes = {
  className: PropTypes.string
};

export default Chart;
