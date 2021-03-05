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
  Select,
  MenuItem,
  Grid
} from '@material-ui/core'
import { Edit, PlusCircle, Trash } from 'react-feather'
import { useDispatch, useSelector } from 'react-redux'
import * as Yup from 'yup'
import { Formik } from 'formik'
import { agregarUrlServer, actualizarUrlServer, eliminarUrlServer } from '../../redux/serverReducer'

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
  row: {
    fontSize: "11px",
    maxWidth: "5px",
    textAlign: "center",
    wordWrap: "break-word",
  }
}))


const TableServerUrl = ({ data, server }) => {

  const [open, setOpen] = useState(false)
  const classes = useStyles()
  const [openAdd, setOpenAdd] = useState(false)
  const dispatch = useDispatch()
  const [urlServer, setUrlServer] = useState({})
  const idser = useSelector(store => store.server.idser)

  return (
    <Card >
      <CardHeader title="Url por servidor" className={classes.headDark}
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
      <Box>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell className={classes.headTable}>
                SERVER
              </TableCell>
              <TableCell className={classes.headTable}>
                TIPO
              </TableCell>
              <TableCell className={classes.headTable}>
                URL
              </TableCell>
              <TableCell className={classes.headTable}>
                USUARIO
              </TableCell>
              <TableCell className={classes.headTable}>
                ACTION
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {typeof data !== 'undefined' && data.length > 0 ? data.map((key) => (
              <TableRow
                hover
                key={key.idcon}
              >
                <TableCell className={classes.row}>
                  {key.nombre}
                </TableCell>
                <TableCell className={classes.row}>
                  {key.tipo}
                </TableCell>
                <TableCell className={classes.row} width="200px">
                  {key.url}
                </TableCell>
                <TableCell className={classes.row}>
                  {key.usuario}
                </TableCell>
                <TableCell className={classes.row} width="100px">
                  <IconButton color="secondary" onClick={() => {
                    dispatch(eliminarUrlServer(key.idcon))
                  }}>
                    <Trash size="15" />
                  </IconButton>
                  <IconButton color="secondary" onClick={() => {
                    setUrlServer(key)
                    setOpen(true)
                  }}>
                    <Edit size="15" />
                  </IconButton>
                </TableCell>
              </TableRow>
            )) :
              <TableRow>
                <TableCell colSpan="5" style={{textAlign: 'center'}}> A&uacute;n no hay informaci&oacute;n</TableCell>
              </TableRow>}
          </TableBody>
        </Table>

        {/* Modal for add server */}
        <Dialog open={openAdd} onClose={() => { setOpenAdd(false) }} aria-labelledby="form-add-server">
          <DialogContent>
            <Formik
              initialValues={{
                tipo: '',
                url: '',
                idser: typeof data !== 'undefined' &&  typeof data[0] !== 'undefined' ? data[0].idser : idser,
                usuario: '',
                contrasena: ''
              }}
              validationSchema={
                Yup.object().shape({
                  tipo: Yup.string().max(255).required('Tipo Url is required'),
                  url: Yup.string().max(255).required('Url is required'),
                  usuario: Yup.string().max(255).required('Usuario is required'),
                  contrasena: Yup.string().max(255).required('Contraseña is required')
                })
              }
              onSubmit={(values) => {
                dispatch(agregarUrlServer(values))
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
                      Agregar nueva url a servidor
                  </Typography>
                  </Box>
                  <Grid
                    container
                    spacing={1}
                  >
                    <Grid
                      item
                      lg={12}
                      md={12}
                      xl={6}
                      xs={12}
                    >
                      <TextField
                        error={Boolean(touched.url && errors.url)}
                        helperText={touched.url && errors.url}
                        fullWidth
                        label="Url"
                        margin="normal"
                        name="url"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.url}
                        variant="outlined"
                      />
                    </Grid>

                    <Grid
                      item
                      lg={6}
                      md={6}
                      xl={4}
                      xs={6}
                    >
                      <Select
                        error={Boolean(touched.tipo && errors.tipo)}
                        helperText={touched.idser && errors.tipo}
                        fullWidth
                        label="Tipo"
                        id="tipo"
                        value={values.tipo}
                        name="tipo"
                        onChange={handleChange}
                        variant="outlined"
                      >
                        <MenuItem value="SSH">SSH</MenuItem>
                        <MenuItem value="JDBC">JDBC</MenuItem>
                      </Select>
                    </Grid>

                    <Grid
                      item
                      lg={6}
                      md={6}
                      xl={4}
                      xs={6}
                    >
                      <Select
                        error={Boolean(touched.idser && errors.idser)}
                        helperText={touched.idser && errors.idser}
                        fullWidth
                        disabled
                        id="server"
                        value={values.idser}
                        name="server"
                        onChange={handleChange}
                        variant="outlined"
                      >
                        {typeof data !== 'undefined' && data.length > 0 ? data.slice(0,1).map((servidor) => (
                          <MenuItem value={servidor.idser} key={servidor.idser}>{servidor.nombre}</MenuItem>
                        )) : typeof server !== 'undefined' ? server.filter((ser) => ser.idser === idser).map((servidor) => (
                          <MenuItem value={servidor.idser} key={servidor.idser}>{servidor.nombre}</MenuItem>
                        )) : <MenuItem value="0">Seleccione Servidor</MenuItem>}
                      </Select>
                    </Grid>

                    <Grid
                      item
                      lg={6}
                      md={6}
                      xl={4}
                      xs={6}
                    >
                      <TextField
                        error={Boolean(touched.usuario && errors.usuario)}
                        helperText={touched.usuario && errors.usuario}
                        fullWidth
                        label="Usuario"
                        margin="normal"
                        name="usuario"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.usuario}
                        variant="outlined"
                      />
                    </Grid>

                    <Grid
                      item
                      lg={6}
                      md={6}
                      xl={4}
                      xs={6}
                    >
                      <TextField
                        error={Boolean(touched.contrasena && errors.contrasena)}
                        helperText={touched.contrasena && errors.contrasena}
                        fullWidth
                        label="Contraseña"
                        margin="normal"
                        name="contrasena"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.contrasena}
                        variant="outlined"
                      />
                    </Grid>
                  </Grid>
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
              initialValues={urlServer}
              validationSchema={
                Yup.object().shape({
                  tipo: Yup.string().max(255).required('Tipo Url is required'),
                  url: Yup.string().max(255).required('Url is required'),
                  usuario: Yup.string().max(255).required('Usuario is required'),
                  contrasena: Yup.string().max(255).required('Contraseña is required')
                })
              }
              onSubmit={(values) => {
                dispatch(actualizarUrlServer(values))
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
                      Editar url de servidor
                  </Typography>
                  </Box>
                  <Grid
                    container
                    spacing={1}
                  >
                    <Grid
                      item
                      lg={12}
                      md={12}
                      xl={6}
                      xs={12}
                    >
                      <TextField
                        error={Boolean(touched.url && errors.url)}
                        helperText={touched.url && errors.url}
                        fullWidth
                        label="Url"
                        margin="normal"
                        name="url"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.url}
                        variant="outlined"
                      />
                    </Grid>

                    <Grid
                      item
                      lg={6}
                      md={6}
                      xl={4}
                      xs={6}
                    >
                      <Select
                        error={Boolean(touched.tipo && errors.tipo)}
                        helperText={touched.idser && errors.tipo}
                        fullWidth
                        label="Tipo"
                        id="tipo"
                        value={values.tipo}
                        name="tipo"
                        onChange={handleChange}
                        variant="outlined"
                      >
                        <MenuItem value="SSH">SSH</MenuItem>
                        <MenuItem value="JDBC">JDBC</MenuItem>
                      </Select>
                    </Grid>

                    <Grid
                      item
                      lg={6}
                      md={6}
                      xl={4}
                      xs={6}
                    >
                      <Select
                        error={Boolean(touched.idser && errors.idser)}
                        helperText={touched.idser && errors.idser}
                        fullWidth
                        disabled
                        id="server"
                        value={values.idser}
                        name="server"
                        onChange={handleChange}
                        variant="outlined"
                      >
                        {typeof data !== 'undefined' ? data.slice(0,1).map((servidor) => (
                          <MenuItem value={servidor.idser} key={servidor.idser}>{servidor.nombre}</MenuItem>
                        )) : <MenuItem value="0">Seleccione Servidor</MenuItem>}
                      </Select>
                    </Grid>

                    <Grid
                      item
                      lg={6}
                      md={6}
                      xl={4}
                      xs={6}
                    >
                      <TextField
                        error={Boolean(touched.usuario && errors.usuario)}
                        helperText={touched.usuario && errors.usuario}
                        fullWidth
                        label="Usuario"
                        margin="normal"
                        name="usuario"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.usuario}
                        variant="outlined"
                      />
                    </Grid>

                    <Grid
                      item
                      lg={6}
                      md={6}
                      xl={4}
                      xs={6}
                    >
                      <TextField
                        error={Boolean(touched.contrasena && errors.contrasena)}
                        helperText={touched.contrasena && errors.contrasena}
                        fullWidth
                        label="Contraseña"
                        margin="normal"
                        name="contrasena"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.contrasena}
                        variant="outlined"
                      />
                    </Grid>
                  </Grid>
                  <Box my={2}>
                    <Button
                      color="primary"
                      disabled={isSubmitting}
                      fullWidth
                      size="large"
                      type="submit"
                      variant="contained"
                    >
                      Actualizar
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

export default TableServerUrl