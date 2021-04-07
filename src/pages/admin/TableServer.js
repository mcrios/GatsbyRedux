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
  colors
} from '@material-ui/core'
import { Edit, PlusCircle, Trash } from 'react-feather'
import { useDispatch } from 'react-redux'
import * as Yup from 'yup';
import { Formik } from 'formik'
import { agregarServer, cargarUrlServer, eliminarServer, actualizarServer } from '../../redux/serverReducer';

const useStyles = makeStyles(() => ({
  headDark: {
    backgroundColor: colors.blueGrey[900],
    color: "white",
    padding: "10px"
  },
  headTable: {
    backgroundColor: colors.blueGrey[900],
    color: "white",
    textAlign: 'center'
  },
  content: {
    padding: "0px"
  },
  row:{
    fontSize: "11px",
    maxWidth: "5px",
    textAlign: "center",
    wordWrap: "break-word",
  }
}))


const TableServer = ({ data }) => {

  const [open, setOpen] = useState(false)
  const classes = useStyles()
  const [openAdd, setOpenAdd] = useState(false)
  const [server, setServer] = useState({})
  const dispatch = useDispatch()

  return (
    <Card >
      <CardHeader title="Listado Servidores" className={classes.headDark}
        action={
          <Tooltip title="Agregar Server">
            <IconButton variant="contained" color="secondary" onClick={() => {
              setOpenAdd(true)
            }}>
              <PlusCircle />
            </IconButton>
          </Tooltip>
        }
      />
      <Divider />
      <Box >
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell className={classes.headTable}>
                SERVER
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
            {typeof data !== 'undefined' ? data.map((key) => (
              <TableRow
                hover
                key={key.idser}
              >
                <TableCell className={classes.row} onClick={()=> {dispatch(cargarUrlServer(key.idser))}}>
                  {key.nombre}
                </TableCell>
                <TableCell className={classes.row} onClick={()=> {dispatch(cargarUrlServer(key.idser))}}>
                  {key.descripcion}
                </TableCell>
                <TableCell className={classes.row}>
                  <IconButton color="secondary" onClick={() => {
                    dispatch(eliminarServer(key.idser)) 
                  }}>
                    <Trash size="15" />
                  </IconButton>
                  <IconButton color="secondary" onClick={() => {
                    setServer(key)
                    setOpen(true)
                  }}>
                    <Edit size="15" />
                  </IconButton>
                </TableCell>
              </TableRow>
            )) : 
            <TableRow>
              <TableCell colSpan="3" style={{textAlign: 'center'}}> A&uacute;n no hay informaci&oacute;n</TableCell>  
            </TableRow>}
          </TableBody>
        </Table>

        {/* Modal for add server */}
        <Dialog open={openAdd} onClose={() => { setOpenAdd(false) }} aria-labelledby="form-add-server">
          <DialogContent>
            <Formik
              initialValues={{
                nombre: '',
                descripcion: ''
              }}
              validationSchema={
                Yup.object().shape({
                  nombre: Yup.string().max(255).required('Nombre is required'),
                  descripcion: Yup.string().max(255).required('Descripcion is required')
                })
              }
              onSubmit={(values) => {
                dispatch(agregarServer(values))
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
                      Agregar nuevo servidor
                  </Typography>
                  </Box>
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
                  <TextField
                    error={Boolean(touched.descripcion && errors.descripcion)}
                    fullWidth
                    helperText={touched.descripcion && errors.descripcion}
                    label="Descripci&oacute;n"
                    margin="normal"
                    name="descripcion"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.descripcion}
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

        {/* Modal for edit server */}
        <Dialog open={open} onClose={() => { setOpen(false) }} aria-labelledby="form-add-server">
          <DialogContent>
            <Formik
              initialValues={server}
              validationSchema={
                Yup.object().shape({
                  nombre: Yup.string().max(255).required('Nombre is required'),
                  descripcion: Yup.string().max(255).required('Descripcion is required')
                })
              }
              onSubmit={(values) => {
                dispatch(actualizarServer(values))
                setOpen(false)
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
                      Editar servidor
                  </Typography>
                  </Box>
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
                  <TextField
                    error={Boolean(touched.descripcion && errors.descripcion)}
                    fullWidth
                    helperText={touched.descripcion && errors.descripcion}
                    label="Descripci&oacute;n"
                    margin="normal"
                    name="descripcion"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.descripcion}
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
                      Editar
                  </Button>
                  </Box>
                </form>
              )}
            </Formik>
          </DialogContent>

          <DialogActions>
            <Button onClick={() => { setOpen(false) }} color="secondary" variant="outlined">
              Cancel
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </Card>
  )
}

export default TableServer