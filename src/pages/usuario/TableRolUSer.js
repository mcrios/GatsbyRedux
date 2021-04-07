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
  Tooltip,
  Typography,
  makeStyles,
  colors,
  TableContainer,
  Paper,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Input
} from '@material-ui/core'
import { PlusCircle, Trash } from 'react-feather'
import { useDispatch, useSelector } from 'react-redux'
import { Formik } from 'formik'
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
  const [openAdd, setOpenAdd] = useState(false)
  const idusr = useSelector(store => store.usuario.idusr)
  const dispatch = useDispatch()


  return (
    <Card >
      <CardHeader title={"Roles por Usuario"} className={classes.headDark}
        action={
          <Tooltip title="Agregar Rol">
            <IconButton variant="contained" color="secondary" onClick={() => {
              console.log(idusr);
              if(typeof idusr === 'undefined')
                return 
              setOpenAdd(true)
            }}>
              <PlusCircle />
            </IconButton>
          </Tooltip>
        }
      />
      <Divider />
      <Box >
        <TableContainer component={Paper}>
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
                    <IconButton color="secondary" onClick={() => {
                      dispatch(eliminarRolUsuario(rol))
                    }}>
                      <Trash size="15" />
                    </IconButton>
                  </TableCell>
                </TableRow>
              )) :
                <TableRow>
                  <TableCell colSpan="3" style={{ textAlign: 'center' }}> El usuario a&uacute;n no posee roles</TableCell>
                </TableRow>}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Modal for add rol */}
        <Dialog open={openAdd} onClose={() => { setOpenAdd(false) }} aria-labelledby="form-add-rol">
          <DialogContent>
            <Formik
              initialValues={{
                codrol: '',
                idusr: idusr
              }}
              onSubmit={(values) => {
                dispatch(agregarRolUsuario(values))
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
                      Agregar rol
                  </Typography>
                  </Box>

                  <FormControl fullWidth className={classes.formControl}>
                    <InputLabel >Seleccione </InputLabel>
                    <Select
                      error={Boolean(touched.codrol && errors.codrol)}
                      fullWidth
                      id="codrol"
                      value={values.codrol}
                      name="codrol"
                      onChange={handleChange}
                      input={<Input />}
                    >
                      {typeof rolesAvail !== 'undefined' && rolesAvail.length > 0 ? rolesAvail.map((r) => (
                        <MenuItem value={r.codrol} key={r.codrol} selected>{r.nombre}</MenuItem>
                      )) : <MenuItem value="" > Ya posee todos los roles </MenuItem>}
                    </Select>
                  </FormControl>
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

      </Box>
    </Card>
  )
}

export default TableRol