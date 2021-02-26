import React, { useState } from "react";
import clsx from "clsx";
import PropTypes from "prop-types";
import {
  Card,
  CardContent,
  Grid,
  Typography,
  colors,
  makeStyles,
  CardActions,
  Button,
  Table,
  TableHead,
  TableRow,
  TableCell,
  Modal,
  TableBody
} from '@material-ui/core'
import HighchartsReact from 'highcharts-react-official'
import HighchartsStockChart from 'highcharts'

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100%",
  },
  avatar: {
    backgroundColor: colors.blue[600],
    height: 56,
    width: 56,
  },
  differenceIcon: {
    color: colors.blue[600],
  },
  differenceValue: {
    color: colors.blue[800],
    marginRight: theme.spacing(1),
  },
  modal: {
    position: "absolute",
    width: 800,
    backgroundColor: "white",
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    //padding: theme.spacing(2,4,3,4),
    padding: "16px 32px 24px",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
  },
  textfield: {
    width: "100%",
  },
  container: {
    //textAlign: 'center',
  },
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

  const styles = useStyles();

  const [modal, setModal] = useState(false);

  const abrirCerrarModal = () => {
    setModal(!modal);
  };

  

  const body = (
    <div className={styles.modal}>
      <div align="center">
        <h2>Detalle</h2>
      </div>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>TABLESPACE</TableCell>
            <TableCell>USED GB</TableCell>
            <TableCell>FREE GB</TableCell>
            <TableCell>TOTAL GB</TableCell>
            <TableCell>PCT FREE</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
        {typeof db !== 'undefined' ? db.lstTablespace.map((key) => (
              <TableRow
                hover
                key={key}
              >
                
                <TableCell>
                {key.TABLESPACE}
                </TableCell>
                <TableCell>
                {key["USED GB"]}
                </TableCell>
                <TableCell>
                {key.FREE_GB}
                </TableCell>
                <TableCell>
                {key.TOTAL_GB}
                </TableCell>
                <TableCell>
                {key.PCT_FREE}
                </TableCell>
              </TableRow>
            )): <TableRow>
               <TableCell>No hay data</TableCell>
              </TableRow>}
        </TableBody>
      </Table>
      <br /> <br />
      <div align="right">
        <Button onClick={() => abrirCerrarModal()}>Cerrar</Button>
      </div>
    </div>
  );

  return (
    <Card className={clsx(classes.root, className)} {...rest}>
      <CardContent>
        <Grid container justify="center" spacing={3}>
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
        <div className={styles.container}>
          <Button
            size="small"
            color="primary"
            onClick={() => abrirCerrarModal()}
          >
            Table Space
          </Button>
          <Modal open={modal} onClose={abrirCerrarModal}>
            {body}
          </Modal>
        </div>
      </CardActions>
    </Card>
  );
};

Chart.propTypes = {
  className: PropTypes.string,
};

export default Chart;
