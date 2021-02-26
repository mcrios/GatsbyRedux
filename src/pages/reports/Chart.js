import React, { useState } from "react";
import clsx from "clsx";
import PropTypes from "prop-types";
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
  Button,
  Modal,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableSortLabel,
  TextField,
  Tooltip,
} from "@material-ui/core";
import ArrowDownwardIcon from "@material-ui/icons/ArrowDownward";
// import { useDispatch, useSelector } from 'react-redux'
// import { contarUsuarios } from '../../redux/usuarioReducer'
import { User } from "react-feather";
import HighchartsReact from "highcharts-react-official";
import Highcharts from "highcharts";

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

const options = {
  chart: {
    type: "pie",
  },
  title: {
    text: "DBPLANILLASV",
  },
  series: [
    {
      data: [1, 2, 1, 4, 3, 6],
    },
  ],
};

const Chart = ({ db, name, className, ...rest }) => {
  console.log(db);
  const classes = useStyles();
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
            <Typography gutterBottom variant="h6">
              GRAFICO MUESTRA
            </Typography>
          </Grid>
        </Grid>

        <div>
          <HighchartsReact highcharts={Highcharts} options={options} />
        </div>
      </CardContent>
      <CardActions>
        <div className={styles.container}>
          <Button
            size="small"
            color="primary"
            onClick={() => abrirCerrarModal()}
          >
            Detalle
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
