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
import TableUser from '../TableUser'
import { cargarRoles, cargarUsuarios } from '../../../redux/usuarioReducer'
import TableRolUser from '../TableRolUSer'
import { RefreshCcw } from 'react-feather'
import TableRol from '../TableRol'
import TableAccesosRol from '../TableAccesosRol'
const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(2),
    paddingTop: theme.spacing(2)
  }
}));

const AdminUsuario = () => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const usuarios = useSelector(store => store.usuario.usuarios)
  const rolesUser = useSelector(store => store.usuario.rolesUsuario)
  const rolesAvial = useSelector(store => store.usuario.rolesAvail)
  const roles = useSelector(store => store.usuario.roles)
  const opcRol = useSelector(store => store.usuario.opcionesRol)
  const opcAvail = useSelector(store => store.usuario.opcionesRolAvail)
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
        title="Usuarios"
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
                <RefreshCcw size={15} />
                &nbsp; Usuarios
              </Button>

              <Button variant="outlined" color="primary" size="small" style={{ marginLeft: '10px' }}
                onClick={(e) => { handleChange(e, "roles") }}>
                <RefreshCcw size={15} />
                &nbsp; Roles
              </Button>
            </Grid>
          </Grid>
          <div hidden={value !== "usuario"}>
            <Grid
              container
              spacing={1}
            >
              <Grid
                item
                lg={8}
                md={8}
                xl={8}
                xs={8}
              >
                <TableUser data={usuarios} />
              </Grid>
              <Grid
                item
                lg={4}
                md={4}
                xl={4}
                xs={4}
              >
                <TableRolUser rolesUser={rolesUser} rolesAvail={rolesAvial} />
              </Grid>
            </Grid>
          </div>
          <div hidden={value !== "roles"}>
            <Grid
              container
              spacing={1}
            >
              <Grid
                item
                lg={4}
                md={4}
                xl={4}
                xs={4}
              >
                <TableRol roles={roles} />
              </Grid>
              <Grid
                item
                lg={8}
                md={8}
                xl={8}
                xs={8}
              >
                <TableAccesosRol accesos={opcRol} accesosAvail={opcAvail} />
              </Grid>
            </Grid>
          </div>
        </Container>
      </Page>
    );
};

export default AdminUsuario