import React, { useEffect } from 'react'
import {
  Container,
  Grid,
  makeStyles
} from '@material-ui/core'
import Page from '../../../component/Page'
import { useDispatch, useSelector } from 'react-redux'
import { cargarServidores, showLoader } from '../../../redux/serverReducer'
import TableServer from '../TableServer'
import TableServerUrl from '../TableServerUrl'
import HashLoader from 'react-spinners/HashLoader'
const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(2),
    paddingTop: theme.spacing(2)
  }
}));

const AdminServer = () => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const servidores = useSelector(store => store.server.servidores)
  const url = useSelector(store => store.server.urlServer)
  const loading = useSelector((store) => store.server.loading)

  useEffect(() => {
    if (typeof servidores === 'undefined' || servidores.length <= 0) {
      dispatch(showLoader())
    }
    dispatch(cargarServidores())
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
        title="Administraci&oacute;n"
      >
        <Container maxWidth={false}>
          <Grid
            container
            spacing={2}
          >
            <Grid
              item
              lg={6}
              md={6}
              xl={6}
              xs={6}
            >
              <TableServer data={servidores} />
            </Grid>
            <Grid
              item
              lg={6}
              md={6}
              xl={6}
              xs={6}
            >
              <TableServerUrl data={url} server={servidores} />
            </Grid>
          </Grid>
        </Container>
      </Page>
    );
};

export default AdminServer