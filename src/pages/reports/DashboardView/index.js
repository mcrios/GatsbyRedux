import React, { useEffect } from 'react'
import {
  Container,
  Grid,
  makeStyles
} from '@material-ui/core'
import Page from '../../../component/Page'
import Budget from '../Budget';
import { useDispatch, useSelector } from 'react-redux'
import TableUsers from '../TableUsers'
import { cargarEstados } from '../../../redux/serverReducer'
import Chart from '../Chart';
const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}));

const Dashboard = () => {
  const classes = useStyles();
  const dispatch = useDispatch()
  const data = useSelector(store => store.server.data)

  useEffect(() => {
    dispatch(cargarEstados())
  }, [])

  return (
    <Page
      className={classes.root}
      title="Dashboard"
    >
      <Container maxWidth={false}>
        <Grid
          container
          spacing={3}
        >
          <Grid
            item
            lg={3}
            sm={6}
            xl={3}
            xs={12}
          >
            <Budget />
          </Grid>
          <Grid
            item
            lg={3}
            sm={6}
            xl={3}
            xs={12}
          >
            <Budget />
          </Grid>
          <Grid
            item
            lg={3}
            sm={6}
            xl={3}
            xs={12}
          >
            <Budget />
          </Grid>
          <Grid
            item
            lg={3}
            sm={6}
            xl={3}
            xs={12}
          >
            <Budget />
          </Grid>
          <Grid
            item
            lg={6}
            md={6}
            xl={9}
            xs={6}
          >
            <Chart db={data.DBPLANILLASV} />
          </Grid>
          <Grid
            item
            lg={6}
            md={6}
            xl={9}
            xs={6}
          >
            <Chart db={data.DBPLANILLASV}/>
          </Grid>
          <Grid
            item
            lg={12}
            md={12}
            xl={9}
            xs={12}
          >
            <TableUsers data={data} />
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
};

export default Dashboard;
