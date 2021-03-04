import React, { useEffect } from 'react'
import {
  Container,
  Grid,
  makeStyles
} from '@material-ui/core'
import Page from '../../../component/Page'
import { useDispatch, useSelector } from 'react-redux'
import {cargarServidores} from '../../../redux/serverReducer'
import TableServer from '../TableServer'
import TableServerUrl from '../TableServerUrl'
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

  useEffect(() => {
    dispatch(cargarServidores())
  }, [])

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
            lg={5}
            md={5}
            xl={3}
            xs={5}
          >
            <TableServer data={servidores} />
          </Grid>
          <Grid
            item
            lg={7}
            md={7}
            xl={3}
            xs={7}
          >
            <TableServerUrl data={url} server={servidores} />
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
};

export default AdminServer