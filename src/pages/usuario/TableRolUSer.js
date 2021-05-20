import React from 'react'
import {
  Box,
  Card,
  CardHeader,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  makeStyles,
  colors,
  TableContainer,
  Paper,
  Switch
} from '@material-ui/core'
import { useDispatch, useSelector } from 'react-redux'
import { agregarRolUsuario, eliminarRolUsuario } from '../../redux/usuarioReducer'

const useStyles = makeStyles((theme) => ({
  headDark: {
    backgroundColor: colors.blueGrey[900],
    color: "white",
    padding: "10px",
    textAlign: 'center'
  },
  headTable: {
    backgroundColor: colors.blueGrey[900],
    color: "white",
    textAlign: 'center'
  },
  content: {
    padding: "0px"
  },
  row: {
    fontSize: "12px",
    maxWidth: "5px",
    textAlign: "center",
    wordWrap: "break-word",
  }
}))


const TableRol = ({ rolesAvail, rolesUser }) => {
  const classes = useStyles()
  const idusr = useSelector(store => store.usuario.idusr)
  const dispatch = useDispatch()


  return (
    <Card >
      <CardHeader title={"Roles por Usuario"} className={classes.headDark} />
      <Divider />
      <Box >
        <TableContainer component={Paper}>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell className={classes.headTable}>
                  CODIGO
                </TableCell>
                <TableCell className={classes.headTable}>
                  DESCRIPCION
                </TableCell>
                <TableCell className={classes.headTable}>
                  ESTADO
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {typeof rolesUser !== 'undefined' && rolesUser.length > 0 ? rolesUser.map((rol) => (
                <TableRow
                  hover
                  key={rol.codrol}
                >
                  <TableCell className={classes.row}>
                    {rol.codrol}
                  </TableCell>
                  <TableCell className={classes.row}>
                    {rol.nombre}
                  </TableCell>
                  <TableCell className={classes.row}>
                    <Switch
                      checked={rol.activo}
                      color="primary"
                      name="activo"
                      onClick={
                        () => {
                          if (rol.activo) {
                            dispatch(eliminarRolUsuario(rol))
                          } else {
                            dispatch(agregarRolUsuario({ "idusr": idusr, "codrol": rol.codrol }))
                          }
                        }
                      }
                      inputProps={{ 'aria-label': 'primary checkbox' }}
                    />
                  </TableCell>
                </TableRow>
              )) :
                <TableRow>
                  <TableCell colSpan="3" style={{ textAlign: 'center' }}> El usuario a&uacute;n no posee roles</TableCell>
                </TableRow>}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Card>
  )
}

export default TableRol