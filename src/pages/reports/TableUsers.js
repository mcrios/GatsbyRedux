import React, { useState } from 'react'
import {
  Box,
  Button,
  Card,
  CardHeader,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableSortLabel,
  TextField,
  Tooltip,
  Typography,
} from '@material-ui/core'

import {
  Edit,
  UserMinus,
  UserPlus
} from 'react-feather'
import { useDispatch, useSelector } from 'react-redux'
import { actualizarUsuario, agregarUsuario, configurarUsuario, eliminarUsuario } from '../../redux/usuarioReducer'
import * as Yup from 'yup';
import { Formik } from 'formik'

const TableUsers = ({ users }) => {
  const [open, setOpen] = useState(false)
  const [openAdd, setOpenAdd] = useState(false)
  const dispatch = useDispatch()
  const usuario = useSelector(store => store.usuario.usuarioConfig)

  return (
    <Card>
      <CardHeader title="Usuarios Activos"
        action={
          <IconButton variant="contained" color="primary" onClick={() => {
            setOpenAdd(true)
          }}>
            <UserPlus />
          </IconButton>
        }
      />
      <Divider />
      <Box minWidth={800}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                Id
              </TableCell>
              <TableCell>
                Nombre
              </TableCell>
              <TableCell sortDirection="desc">
                <Tooltip
                  enterDelay={300}
                  title="Sort"
                >
                  <TableSortLabel
                    active
                    direction="desc"
                  >
                    Correo
                  </TableSortLabel>
                </Tooltip>
              </TableCell>
              <TableCell>
                Estado
              </TableCell>
              <TableCell>
                Genero
              </TableCell>
              <TableCell>
                Acciones
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow
                hover
                key={user.id}
              >
                <TableCell>
                  {user.id}
                </TableCell>
                <TableCell>
                  {user.nombre}
                </TableCell>
                <TableCell>
                  {user.correo}
                </TableCell>
                <TableCell>
                  <Chip
                    color="primary"
                    label={user.estado}
                    size="small"
                  />
                </TableCell>
                <TableCell>
                  {user.genero}
                </TableCell>
                <TableCell>
                  <IconButton color="secondary" onClick={() => { 
                    dispatch(eliminarUsuario(user.id)) 
                  }}>
                    <UserMinus size="20" />
                  </IconButton>
                  <IconButton color="secondary" onClick={() => {
                    setOpen(true)
                    dispatch(configurarUsuario(user))
                  }}>
                    <Edit size="20" />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {/* Modal for add user */}
        <Dialog open={openAdd} onClose={() => { setOpenAdd(false) }} aria-labelledby="form-dialog-title">
          <DialogContent>
            <Formik
              initialValues={{
                correo: '',
                nombre: '',
                clave: '',
                genero: 'Femenino',
                role: { id: 1 }
              }}
              validationSchema={
                Yup.object().shape({
                  correo: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
                  nombre: Yup.string().max(255).required('First name is required'),
                  clave: Yup.string().max(255).required('Password is required'),
                  genero: Yup.string().max(255).required('Genero is required')
                })
              }
              onSubmit={(values) => {
                dispatch(agregarUsuario(values))
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
                      Create new account
                  </Typography>
                    <Typography
                      color="textSecondary"
                      gutterBottom
                      variant="body2"
                      align="center"
                    >
                      Use your email to create new account
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
                    error={Boolean(touched.correo && errors.correo)}
                    fullWidth
                    helperText={touched.correo && errors.correo}
                    label="Correo"
                    margin="normal"
                    name="correo"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    type="correo"
                    value={values.correo}
                    variant="outlined"
                  />
                  <TextField
                    error={Boolean(touched.clave && errors.clave)}
                    fullWidth
                    helperText={touched.clave && errors.clave}
                    label="Password"
                    margin="normal"
                    name="clave"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    type="password"
                    value={values.clave}
                    variant="outlined"
                  />
                  <br />
                  <InputLabel >G&eacute;nero</InputLabel>
                  <Select
                    error={Boolean(touched.genero && errors.genero)}
                    helperText={touched.genero && errors.genero}
                    fullWidth
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={values.genero}
                    name="genero"
                    onChange={handleChange}
                    variant="outlined"
                  >
                    <MenuItem value="Femenino">Femenino</MenuItem>
                    <MenuItem value="Masculino">Masculino</MenuItem>
                  </Select>
                  <Box my={2}>
                    <Button
                      color="primary"
                      disabled={isSubmitting}
                      fullWidth
                      size="large"
                      type="submit"
                      variant="contained"
                    >
                      Registrarse
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

        {/* Modal for edit user */}
        <Dialog open={open} onClose={() => { setOpen(false) }} aria-labelledby="form-dialog-title">
          <DialogTitle id="form-dialog-title">
            <Typography variant="h5">
              Editar Usuario
            </Typography>
          </DialogTitle>
          <DialogContent>
            <DialogContentText>
              El siguiente formulario contiene los campos para Editar usuario.
            </DialogContentText>

            <Formik
              initialValues={usuario}
              validationSchema={
                Yup.object().shape({
                  correo: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
                  nombre: Yup.string().max(255).required('First name is required'),
                  clave: Yup.string().max(255).required('Password is required'),
                  genero: Yup.string().max(255).required('Genero is required')
                })
              }
              onSubmit={(values) => {
                dispatch(actualizarUsuario(values))
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
                    error={Boolean(touched.correo && errors.correo)}
                    fullWidth
                    helperText={touched.correo && errors.correo}
                    label="Correo"
                    margin="normal"
                    name="correo"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    type="correo"
                    value={values.correo}
                    variant="outlined"
                  />
                  <TextField
                    error={Boolean(touched.clave && errors.clave)}
                    fullWidth
                    helperText={touched.clave && errors.clave}
                    label="Password"
                    margin="normal"
                    name="clave"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    type="password"
                    value={values.clave}
                    variant="outlined"
                  />
                  <br />
                  <InputLabel >G&eacute;nero</InputLabel>
                  <Select
                    error={Boolean(touched.genero && errors.genero)}
                    helperText={touched.genero && errors.genero}
                    fullWidth
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={values.genero}
                    name="genero"
                    onChange={handleChange}
                    variant="outlined"
                  >
                    <MenuItem value="Femenino">Femenino</MenuItem>
                    <MenuItem value="Masculino">Masculino</MenuItem>
                  </Select>
                  <Box my={2}>
                    <Button
                      color="primary"
                      disabled={isSubmitting}
                      fullWidth
                      size="large"
                      type="submit"
                      variant="contained"
                    >
                      Guardar
                  </Button>
                    <Button onClick={() => { setOpen(false) }}
                      color="secondary"
                      fullWidth
                      style={{ marginTop: '14px' }}>
                      Cancel
                    </Button>
                  </Box>
                </form>
              )}
            </Formik>

          </DialogContent>
        </Dialog>
      </Box>
    </Card>
  )
}

export default TableUsers