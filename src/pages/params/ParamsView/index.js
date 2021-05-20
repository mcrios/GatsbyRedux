import React, { useEffect } from 'react'
import {
  Button,
  Container,
  Grid,
  makeStyles,
} from '@material-ui/core'
import Page from '../../../component/Page'
import { useDispatch, useSelector } from 'react-redux'
import { showLoader } from '../../../redux/serverReducer'
import HashLoader from 'react-spinners/HashLoader'
import { cargarRoles, cargarUsuarios } from '../../../redux/usuarioReducer'
import { List, Users } from 'react-feather'
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
  const usuarios = useSelector(store => store.usuario.usuarios)
  const loading = useSelector((store) => store.usuario.loading)

  const [value, setValue] = React.useState("usuario");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    if (typeof usuarios === 'undefined' || usuarios.length <= 0) {
      dispatch(showLoader())
    }
    dispatch(cargarUsuarios())
    dispatch(cargarRoles())
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
              <Button variant="outlined" color="primary" size="small" onClick={(e) => { handleChange(e, "usuario") }}>
                <Users size={15} />
                &nbsp; Usuarios
              </Button>

              <Button variant="outlined" color="primary" size="small" style={{ marginLeft: '10px' }}
                onClick={(e) => { handleChange(e, "roles") }}>
                <List size={15} />
                &nbsp; Roles
              </Button>
            </Grid>
          </Grid>
        </Container>
      </Page>
    );
};

export default Params