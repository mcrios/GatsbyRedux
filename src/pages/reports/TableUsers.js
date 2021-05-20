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
  InputLabel,
  MenuItem,
  Select,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  Tooltip,
  Typography,
} from '@material-ui/core'

import {
  Mail
} from 'react-feather'
import { useDispatch} from 'react-redux'
import { agregarUsuario} from '../../redux/usuarioReducer'
import * as Yup from 'yup';
import { Formik } from 'formik'

const TableUsers = ({ data }) => {
  const [openAdd, setOpenAdd] = useState(false)
  const dispatch = useDispatch()
   
  return (
    <Card>
      <CardHeader title="Estado de disco de Servidores"
        action={
          <Tooltip title="Agregar Server">
          <IconButton variant="contained" color="primary" onClick={() => {
            setOpenAdd(true)
          }}>
            <Mail />
          </IconButton>
          </Tooltip>
        }
      />
      <Divider />
      <Box minWidth={800}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                SERVER
              </TableCell>
              <TableCell>
                AVAIL
              </TableCell>
              <TableCell >
                FILESYSTEM
              </TableCell>
              <TableCell>
                SIZE
              </TableCell>
              <TableCell>
                USED
              </TableCell>
              <TableCell>
                % USE
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Object.keys(data).map((db) => (
              typeof data[db].listFileSystem !== 'undefined' && data[db].listFileSystem !== null ?
              Object.keys(data[db].listFileSystem).map((fs) => (
              <TableRow
                hover
                key={db + fs}
              >
                <TableCell>
                  {db}
                </TableCell>
                <TableCell>
                  {typeof data[db].listFileSystem[fs] !== 'undefined' ? (parseInt(data[db].listFileSystem[fs]["AVAIL"])/1024/1024).toFixed(2) + " GB": ""}
                </TableCell>
                <TableCell>
                  {typeof fs !== 'undefined' ? fs : ""}
                </TableCell>
                <TableCell>
                  {typeof data[db].listFileSystem[fs] !== 'undefined' ? (parseInt(data[db].listFileSystem[fs]["SIZE"])/1024/1024).toFixed(2) + " GB" : ""}
                </TableCell>
                <TableCell>
                  {typeof data[db].listFileSystem[fs] !== 'undefined' ? (parseInt(data[db].listFileSystem[fs]["USED"])/1024/1024).toFixed(2) + " GB" : ""}
                </TableCell>
                <TableCell>
                  {typeof data[db].listFileSystem[fs] !== 'undefined' ? data[db].listFileSystem[fs]["USE_PORC"] : "0"}
                </TableCell>
                {/* <TableCell>
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
                </TableCell> */}
              </TableRow>
            )): <></>))}
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

      </Box>
    </Card>
  )
}

export default TableUsers