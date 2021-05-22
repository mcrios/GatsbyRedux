import React, { useEffect } from 'react'
import {
  Container,
  Grid,
  makeStyles,
} from '@material-ui/core'
import Page from '../../../component/Page'
import { useDispatch, useSelector } from 'react-redux'
import HashLoader from 'react-spinners/HashLoader'
import { cargarParametros } from '../../../redux/paramsReducer'
import { showLoader } from '../../../redux/alertReducer'
import TableParams from '../TableParams'

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(2),
    paddingTop: theme.spacing(2)
  }
}));

const Params = () => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const params = useSelector((store) => store.parametro.parametros)
  const loading = useSelector((store) => store.alert.loading)

  useEffect(() => {
    if (typeof params === 'undefined' || params.length <= 0) {
      dispatch(showLoader())
    }
    dispatch(cargarParametros())
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
        title="Parametros"
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
              <TableParams data={params} />
            </Grid>
          </Grid>
        </Container>
      </Page>
    );
};

export default Params