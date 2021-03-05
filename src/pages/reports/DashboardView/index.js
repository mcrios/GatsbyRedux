import React, { useEffect } from 'react'
import {
  Container,
  Grid,
  makeStyles
} from '@material-ui/core'
import Page from '../../../component/Page'
import { useDispatch, useSelector } from 'react-redux'
import TableUsers from '../TableUsers'
import { cargarEstados, showLoader } from '../../../redux/serverReducer'
import Chart from '../Chart'
import HashLoader from 'react-spinners/HashLoader'

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
  const loading = useSelector((store) => store.server.loading)

  useEffect(() => {
    if(typeof data === 'undefined' || data.length <= 0){
      dispatch(showLoader())
    }
    dispatch(cargarEstados())
  }, [])
  
  if (loading)
    return (
      <HashLoader color="#4A90E2" loading={loading} size={80} css={{
        margin: "0 auto",
        minHeight: '90vh',
        marginTop: '0%',
        display: 'block'
      }} />
    )
  else
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
            {Object.keys(data).map((db) => (
              <Grid
                key={db}
                item
                lg={4}
                md={4}
                xl={3}
                xs={4}
              >
                <Chart db={data[db]} name={db} />
              </Grid>
            ))}
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
