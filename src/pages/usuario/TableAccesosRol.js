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
  FormControl,
  InputLabel,
  MenuItem,
  Select
} from '@material-ui/core'
import {  PlusCircle, Trash } from 'react-feather'
import { useDispatch, useSelector } from 'react-redux'
import * as Yup from 'yup';
import { Formik } from 'formik'
import { agregarOpcionRol, eliminarOpcionRol } from '../../redux/usuarioReducer';

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
  row:{
    fontSize: "12px",
    maxWidth: "5px",
    textAlign: "center",
    wordWrap: "break-word",
  }
}))


const TableAccesosRol = ({ accesos, accesosAvail}) => {

  const classes = useStyles()
  const [openAdd, setOpenAdd] = useState(false)
  const codrol = useSelector(store => store.usuario.codrol)
  const dispatch = useDispatch()

  return (
    <Card >
      <CardHeader title={"Menu Opciones"} className={classes.headDark}
        action={
          <Tooltip title="Agregar Opcion">
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
                ACTION
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {typeof accesos !== 'undefined' && accesos.length > 0 ? accesos.map((opc) => (
              <TableRow
                hover
                key={opc.idopr}
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
                  <IconButton color="secondary" onClick={() => {
                    dispatch(eliminarOpcionRol(opc)) 
                  }}>
                    <Trash size="15" />
                  </IconButton>
                  
                </TableCell>
              </TableRow>
            )) : 
            <TableRow>
              <TableCell colSpan="5" style={{textAlign: 'center'}}>A&uacute;n no posee accesos</TableCell>  
            </TableRow>}
          </TableBody>
        </Table>

        {/* Modal for add rol */}
        <Dialog open={openAdd} onClose={() => { setOpenAdd(false) }} aria-labelledby="form-add-rol">
          <DialogContent>
            <Formik
              initialValues={{
                codrol: codrol,
                idopc: ''
              }}
              validationSchema={
                Yup.object().shape({
                  idopc: Yup.number().required('Opcion is required')
                })
              }
              onSubmit={(values) => {
                dispatch(agregarOpcionRol(values))
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
                      Agregar nuevo acceso
                  </Typography>
                  </Box>
                  <FormControl fullWidth className={classes.formControl}>
                    <InputLabel >Seleccione </InputLabel>
                    <Select
                      error={Boolean(touched.idopc && errors.idopc)}
                      fullWidth
                      id="idopc"
                      value={values.idopc}
                      name="idopc"
                      onChange={handleChange}
                    >
                      {typeof accesosAvail !== 'undefined' && accesosAvail.length > 0 ? accesosAvail.map((acceso) => (
                        <MenuItem value={acceso.idopc} key={acceso.idopc} selected>{acceso.titulo}</MenuItem>
                      )) : <MenuItem value="" > Ya posee todos los accesos </MenuItem>}
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

export default TableAccesosRol