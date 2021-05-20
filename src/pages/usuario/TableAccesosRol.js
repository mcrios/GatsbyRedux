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
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Tooltip,
  Typography,
  makeStyles,
  colors,
  TextField,
  Switch,
  IconButton
} from '@material-ui/core'
import { PlusCircle, Trash } from 'react-feather'
import { useDispatch, useSelector } from 'react-redux'
import * as Yup from 'yup';
import { Formik } from 'formik'
import { agregarMenu, agregarOpcionRol, eliminarMenu, eliminarOpcionRol } from '../../redux/usuarioReducer';

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


const TableAccesosRol = ({ accesos, accesosAvail }) => {

  const classes = useStyles()
  const [openAddMenu, setOpenAddMenu] = useState(false)
  const codrol = useSelector(store => store.usuario.codrol)
  const dispatch = useDispatch()

  return (
    <Card >
      <CardHeader title={"Menu Opciones"} className={classes.headDark}
        action={
          <div >
            <Tooltip title="Nuevo Menu">
              <Button variant="outlined" color="secondary"
                size="small" style={{ marginLeft: '10px', marginTop: '10px' }}
                startIcon={<PlusCircle />}
                onClick={() => {
                  setOpenAddMenu(true)
                }}> Menu
              </Button>
            </Tooltip>
          </div>
        }
      />
      <Divider />
      <Box >
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell className={classes.headTable}>
                CODIGO
              </TableCell>
              <TableCell className={classes.headTable}>
                TITULO
              </TableCell>
              <TableCell className={classes.headTable}>
                URL
              </TableCell>
              <TableCell className={classes.headTable}>
                ICONO
              </TableCell>
              <TableCell className={classes.headTable}>
                ESTADO
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {typeof accesos !== 'undefined' && accesos.length > 0 ? accesos.map((opc) => (
              <TableRow
                hover
                key={opc.cod_opc}
              >
                <TableCell className={classes.row} >
                  {opc.cod_opc}
                </TableCell>
                <TableCell className={classes.row} >
                  {opc.titulo}
                </TableCell>
                <TableCell className={classes.row} >
                  {opc.url}
                </TableCell>
                <TableCell className={classes.row} >
                  {opc.icono}
                </TableCell>
                <TableCell className={classes.row}>
                  <Switch
                    checked={opc.activo}
                    color="primary"
                    name="activo"
                    onClick={
                      () => {
                        if (opc.activo) {
                          opc.codrol = codrol
                          dispatch(eliminarOpcionRol(opc))
                        } else {
                          dispatch(agregarOpcionRol({ "codrol": codrol, "idopc": opc.idopc }))
                        }
                      }
                    }
                    inputProps={{ 'aria-label': 'primary checkbox' }}
                  />
                  <IconButton color="secondary" onClick={() => {
                    opc.codrol = codrol
                    dispatch(eliminarMenu(opc))
                  }}>
                    <Trash size="15" />
                  </IconButton>
                </TableCell>
                
              </TableRow>
            )) :
              <TableRow>
                <TableCell colSpan="5" style={{ textAlign: 'center' }}>A&uacute;n no posee accesos</TableCell>
              </TableRow>}
          </TableBody>
        </Table>

        {/* Modal for add menu */}
        <Dialog open={openAddMenu} onClose={() => { setOpenAddMenu(false) }} aria-labelledby="form-add-menu">
          <DialogContent>
            <Formik
              initialValues={{
                codrol: codrol,
                cod_opc: '',
                titulo: '',
                descripcion: '',
                url: '',
                icono: ''
              }}
              validationSchema={
                Yup.object().shape({
                  cod_opc: Yup.string().max(50).required('Nombre is required'),
                  titulo: Yup.string().max(50).required('Codusr is required'),
                  descripcion: Yup.string().max(300).required('Correo is required'),
                  url: Yup.string().max(300).required('Clave is required'),
                  icono: Yup.string().max(50).required('Codusr is required'),
                })
              }
              onSubmit={(values) => {
                dispatch(agregarMenu(values))
                setOpenAddMenu(false)
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
                      Agregar nuevo menu
                    </Typography>
                  </Box>
                  <TextField
                    error={Boolean(touched.cod_opc && errors.cod_opc)}
                    fullWidth
                    helperText={touched.cod_opc && errors.cod_opc}
                    label="Codigo"
                    margin="normal"
                    name="cod_opc"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.cod_opc}
                    variant="outlined"
                  />
                  <TextField
                    error={Boolean(touched.titulo && errors.titulo)}
                    fullWidth
                    helperText={touched.titulo && errors.titulo}
                    label="Titulo"
                    margin="normal"
                    name="titulo"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.titulo}
                    variant="outlined"
                  />
                  <TextField
                    error={Boolean(touched.descripcion && errors.descripcion)}
                    fullWidth
                    helperText={touched.descripcion && errors.descripcion}
                    label="Descripcion"
                    margin="normal"
                    name="descripcion"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.descripcion}
                    variant="outlined"
                  />
                  <TextField
                    error={Boolean(touched.url && errors.url)}
                    fullWidth
                    helperText={touched.url && errors.url}
                    label="Url"
                    margin="normal"
                    name="url"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.url}
                    variant="outlined"
                  />
                  <TextField
                    error={Boolean(touched.icono && errors.icono)}
                    fullWidth
                    helperText={touched.icono && errors.icono}
                    label="Icono"
                    margin="normal"
                    name="icono"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.icono}
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
            <Button onClick={() => { setOpenAddMenu(false) }} color="secondary" variant="outlined">
              Cancel
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </Card>
  )
}

export default TableAccesosRol