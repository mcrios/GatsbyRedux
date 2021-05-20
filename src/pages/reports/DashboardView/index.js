import React, { useEffect } from 'react'
import {
  Button,
  Card,
  CardContent,
  Container,
  Grid,
  makeStyles,
  Typography
} from '@material-ui/core'
import Page from '../../../component/Page'
import { useDispatch, useSelector } from 'react-redux'
import TableUsers from '../TableUsers'
import { cargarEstados, showLoader } from '../../../redux/serverReducer'
import Chart from '../Chart'
import ChartDark from '../ChartDark'
import HashLoader from 'react-spinners/HashLoader'
import { RefreshCcw } from 'react-feather'
import TableSpace from '../TableSpace'

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  },
  tittle: {
    textAlign: 'center'
  }
}));

const Dashboard = () => {

  const classes = useStyles();
  const dispatch = useDispatch()
  const data = useSelector(store => store.server.data)
  const loading = useSelector((store) => store.server.loading)

  useEffect(() => {
    if (typeof data === 'undefined' || data.length <= 0) {
      dispatch(showLoader())
    }
    dispatch(cargarEstados())
  }, [])

  const handleRefresh = () => {
    dispatch(showLoader())
    dispatch(cargarEstados())
  }
  // console.log(Object.keys(data).map((db) => (
  //   typeof data[db].listFileSystem !== 'undefined' && data[db].listFileSystem !== null ?
  //     Object.keys(data[db].listFileSystem).map((fs) => Object.keys(data[db].listFileSystem[fs]).map((d) => data[db].listFileSystem[fs][d])) : ''
  // )))

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
            spacing={1}
          >
            <Grid
              item
              lg={12}
              md={12}
              xl={12}
              xs={12}
              style={{ textAlign: 'center' }}
            >
              <Button variant="outlined" color="primary" onClick={handleRefresh} size="small">
                <RefreshCcw size={15} />
                &nbsp; Refresh
              </Button>
            </Grid>
            {Object.keys(data).map((db) => (
              <>
                <Grid
                  key={db}
                  item
                  lg={12}
                  md={12}
                  xl={12}
                  xs={12}
                >
                  <Card variant="outlined">
                    <CardContent className={classes.tittle}>
                      <Typography variant="h5" component="h2">
                        Estado de server {db}
                      </Typography>
                      <br />
                      <Container maxWidth={false}>
                        <Grid
                          container
                          spacing={2}
                        >
                          {typeof data[db].listFileSystem !== 'undefined' && data[db].listFileSystem !== null ?
                            Object.keys(data[db].listFileSystem).map((fs) => (
                              <Grid
                                key={db + fs}
                                item
                                lg={4}
                                md={4}
                                xl={4}
                                xs={4}
                              >
                                
                                {Number(data[db].listFileSystem[fs].AVAIL/ 1024 / 1024).toFixed(2) > 100 ?
                                  <Chart db={data[db].listFileSystem[fs]} name={'FILESYSTEM ' + fs} /> :
                                  <ChartDark db={data[db].listFileSystem[fs]} name={'FILESYSTEM ' + fs} />
                                }
                              </Grid>
                            )) : <></>}

                          <Grid
                            key={db + 'TS'}
                            item
                            lg={4}
                            md={4}
                            xl={4}
                            xs={4}
                          >
                            <TableSpace db={data[db]} name={db} />
                          </Grid>
                        </Grid>
                      </Container>
                    </CardContent>
                  </Card>
                </Grid>
              </>
            ))}
            <Grid
              item
              lg={12}
              md={12}
              xl={12}
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
