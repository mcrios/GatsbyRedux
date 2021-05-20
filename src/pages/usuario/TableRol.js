import React, { useState } from 'react'
import {
  Box,
  Button,
  Card,
  CardHeader,
  Dialog,
  DialogActions,
  DialogContent,
  Divider,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  Tooltip,
  Typography,
  makeStyles,
  colors,
  Snackbar
} from '@material-ui/core'
import { PlusCircle, Trash, X } from 'react-feather'
import { useDispatch, useSelector } from 'react-redux'
import * as Yup from 'yup';
import { Formik } from 'formik'
import { agregarRol, cargarOpcionesRoles, eliminarRol } from '../../redux/usuarioReducer'
import { hideAlert } from '../../redux/alertReducer'

const useStyles = makeStyles(() => ({
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


const TableRolUser = ({ roles }) => {

  const classes = useStyles()
  const [openAdd, setOpenAdd] = useState(false)
  const dispatch = useDispatch()
  const alert = useSelector((store) => store.alert.data)
  const [r, setR] = useState()

  return (
    <Card >
      <CardHeader title={"Roles"} className={classes.headDark}
        action={
          <Tooltip title="Agregar Rol">
            <Button variant="text" color="secondary"
                size="small" style={{ marginLeft: '10px', marginTop: '10px' }}
                startIcon={<PlusCircle />}
                onClick={() => {
                  setOpenAdd(true)
                }}>
              </Button>
          </Tooltip>
        }
      />
      <Divider />
      <Box >
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell className={classes.headTable}>
                CODROL
              </TableCell>
              <TableCell className={classes.headTable}>
                DESCRIPCION
              </TableCell>
              <TableCell className={classes.headTable}>
                ACTION
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {typeof roles !== 'undefined' && roles.length > 0 ? roles.map((rol) => (
              <TableRow
                selected={typeof r != 'undefined' ? (r.codrol === rol.codrol) : false}
                hover
                key={rol.codrol}
              >
                <TableCell className={classes.row} onClick={() => {
                  dispatch(cargarOpcionesRoles(rol.codrol))
                  setR({ ...r, codrol: rol.codrol })
                }}>
                  {rol.codrol}
                </TableCell>
                <TableCell className={classes.row} onClick={() => {
                  dispatch(cargarOpcionesRoles(rol.codrol))
                  setR({ ...r, codrol: rol.codrol })
                }}>
                  {rol.nombre}
                </TableCell>
                <TableCell className={classes.row}>
                  <IconButton color="secondary" onClick={() => {
                    dispatch(eliminarRol(rol.codrol))
                  }}>
                    <Trash size="15" />
                  </IconButton>
                </TableCell>
              </TableRow>
            )) :
              <TableRow>
                <TableCell colSpan="3" style={{ textAlign: 'center' }}> No existen roles</TableCell>
              </TableRow>}
          </TableBody>
        </Table>

        {/* Modal for add rol */}
        <Dialog open={openAdd} onClose={() => { setOpenAdd(false) }} aria-labelledby="form-add-rol">
          <DialogContent>
            <Formik
              initialValues={{
                codrol: '',
                nombre: '',
              }}
              validationSchema={
                Yup.object().shape({
                  codrol: Yup.string().max(50).required('Rol is required'),
                  nombre: Yup.string().max(255).required('Nombre Rol is required')
                })
              }
              onSubmit={(values) => {
                dispatch(agregarRol(values))
                setOpenAdd(false)
              }}
            >
              {({
                errors,
                handleBlur,
                handleChange,
                handleSubmit,
                isSubmitting,
                touched,
                values
              }) => (
                <form onSubmit={handleSubmit}>
                  <Box mb={3}>
                    <Typography
                      color="textPrimary"
                      variant="h5"
                      align="center"
                    >
                      Agregar nuevo Rol
                  </Typography>
                  </Box>
                  <TextField
                    error={Boolean(touched.codrol && errors.codrol)}
                    fullWidth
                    helperText={touched.codrol && errors.codrol}
                    label="C&oacute;digo"
                    margin="normal"
                    name="codrol"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.codrol}
                    variant="outlined"
                  />
                  <TextField
                    error={Boolean(touched.nombre && errors.nombre)}
                    fullWidth
                    helperText={touched.nombre && errors.nombre}
                    label="Nombre"
                    margin="normal"
                    name="nombre"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.nombre}
                    variant="outlined"
                  />

                  <Box my={2}>
                    <Button
                      color="primary"
                      disabled={isSubmitting}
                      fullWidth
                      size="large"
                      type="submit"
                      variant="contained"
                    >
                      Agregar
                  </Button>
                  </Box>
                </form>
              )}
            </Formik>
          </DialogContent>

          <DialogActions>
            <Button onClick={() => { setOpenAdd(false) }} color="secondary" variant="outlined">
              Cancel
            </Button>
          </DialogActions>
        </Dialog>

        <div>
          <Snackbar
            anchorOrigin={{
              vertical: typeof alert !== 'undefined' ? alert.vertical : "top",
              horizontal: typeof alert !== 'undefined' ? alert.horizontal : "center"
            }}
            autoHideDuration={6000}
            message={typeof alert !== 'undefined' ? alert.message : ""}
            open={typeof alert !== 'undefined' ? alert.open : false}
            onClose={() => { dispatch(hideAlert()) }}
            action={
              <React.Fragment>
                <IconButton size="small" aria-label="close" color="inherit"
                  onClick={() => { dispatch(hideAlert()) }}>
                  <X size="20" />
                </IconButton>
              </React.Fragment>
            }
          />
        </div>
      </Box>
    </Card>
  )
}

export default TableRolUser