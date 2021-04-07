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
    Chip,
    TableContainer,
    Paper
} from '@material-ui/core'
import { Edit, PlusCircle, Trash } from 'react-feather'
import { useDispatch } from 'react-redux'
import * as Yup from 'yup';
import { Formik } from 'formik'
import { actualizarUsuario, agregarUsuario, cargarRolesAvail, cargarRolesUsuario, eliminarUsuario } from '../../redux/usuarioReducer'

const useStyles = makeStyles(() => ({
    tabla: {
        minWidth: 650
    },
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


const TableUser = ({ data }) => {

    const [open, setOpen] = useState(false)
    const classes = useStyles()
    const [openAdd, setOpenAdd] = useState(false)
    const [usuario, setUsuario] = useState()
    const dispatch = useDispatch()

    return (
        <Card >
            <CardHeader title="Usuarios" className={classes.headDark}
                action={
                    <Tooltip title="Agregar Usuario">
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
                <TableContainer component={Paper}>
                    <Table size="small" className={classes.tabla}>
                        <TableHead>
                            <TableRow>
                                <TableCell className={classes.headTable}>
                                    CODUSR
                                </TableCell>
                                <TableCell className={classes.headTable}>
                                    NOMBRE
                                </TableCell>
                                <TableCell className={classes.headTable}>
                                    CORREO
                                </TableCell>
                                <TableCell className={classes.headTable}>
                                    ESTADO
                                </TableCell>
                                <TableCell className={classes.headTable}>
                                    FECHA VENCIMIENTO
                                </TableCell>
                                <TableCell className={classes.headTable}>
                                    ACTION
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {typeof data !== 'undefined' ? data.map((key) => (
                                <TableRow
                                    selected={typeof usuario != 'undefined' ? (usuario.idusr === key.idusr) : false}
                                    hover
                                    key={key.idusr}
                                >
                                    <TableCell className={classes.row} onClick={() => {
                                        dispatch(cargarRolesUsuario(key.idusr))
                                        setUsuario({ ...usuario, idusr: key.idusr })
                                        dispatch(cargarRolesAvail(key.idusr))
                                    }}>
                                        {key.codusr}
                                    </TableCell>
                                    <TableCell className={classes.row} onClick={() => {
                                        dispatch(cargarRolesUsuario(key.idusr))
                                        setUsuario({ ...usuario, idusr: key.idusr })
                                        dispatch(cargarRolesAvail(key.idusr))
                                    }}>
                                        {key.nombre}
                                    </TableCell>
                                    <TableCell className={classes.row} onClick={() => {
                                        dispatch(cargarRolesUsuario(key.idusr))
                                        setUsuario({ ...usuario, idusr: key.idusr })
                                        dispatch(cargarRolesAvail(key.idusr))
                                    }}>
                                        {key.correo}
                                    </TableCell>
                                    <TableCell className={classes.row} onClick={() => {
                                        dispatch(cargarRolesUsuario(key.idusr))
                                        setUsuario({ ...usuario, idusr: key.idusr })
                                        dispatch(cargarRolesAvail(key.idusr))
                                    }}>
                                        <Chip
                                            color="primary"
                                            label={key.estado}
                                            size="small"
                                        />
                                    </TableCell>
                                    <TableCell className={classes.row} onClick={() => {
                                        dispatch(cargarRolesUsuario(key.idusr))
                                        setUsuario({ ...usuario, idusr: key.idusr })
                                        dispatch(cargarRolesAvail(key.idusr))
                                    }}>
                                        {key.fecha_vencimiento}
                                    </TableCell>
                                    <TableCell className={classes.row}>
                                        <IconButton color="secondary" onClick={() => {
                                            dispatch(eliminarUsuario(key.idusr))
                                        }}>
                                            <Trash size="15" />
                                        </IconButton>
                                        <IconButton color="secondary" onClick={() => {
                                            setUsuario(key)
                                            setOpen(true)
                                        }}>
                                            <Edit size="15" />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            )) :
                                <TableRow>
                                    <TableCell colSpan="3" style={{ textAlign: 'center' }}> A&uacute;n no hay informaci&oacute;n</TableCell>
                                </TableRow>}
                        </TableBody>
                    </Table>
                </TableContainer>
                {/* Modal for add usuario */}
                <Dialog open={openAdd} onClose={() => { setOpenAdd(false) }} aria-labelledby="form-add-usuario">
                    <DialogContent>
                        <Formik
                            initialValues={{
                                codusr: '',
                                nombre: '',
                                correo: '',
                                clave: ''
                            }}
                            validationSchema={
                                Yup.object().shape({
                                    nombre: Yup.string().max(255).required('Nombre is required'),
                                    codusr: Yup.string().max(50).required('Codusr is required'),
                                    correo: Yup.string().email().max(300).required('Correo is required'),
                                    clave: Yup.string().max(300).required('Clave is required'),
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
                                            Agregar nuevo Usuario
                                        </Typography>
                                    </Box>
                                    <TextField
                                        error={Boolean(touched.codusr && errors.codusr)}
                                        fullWidth
                                        helperText={touched.codusr && errors.codusr}
                                        label="Codusr"
                                        margin="normal"
                                        name="codusr"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        value={values.codusr}
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
                                    <TextField
                                        error={Boolean(touched.correo && errors.correo)}
                                        fullWidth
                                        helperText={touched.correo && errors.correo}
                                        label="Correo"
                                        margin="normal"
                                        name="correo"
                                        type="email"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        value={values.correo}
                                        variant="outlined"
                                    />
                                    <TextField
                                        error={Boolean(touched.clave && errors.clave)}
                                        fullWidth
                                        helperText={touched.clave && errors.clave}
                                        label="Clave"
                                        margin="normal"
                                        name="clave"
                                        type="password"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        value={values.clave}
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

                {/* Modal for edit usuario */}
                <Dialog open={open} onClose={() => { setOpen(false) }} aria-labelledby="form-edit-usuario">
                    <DialogContent>
                        <Formik
                            initialValues={usuario}
                            validationSchema={
                                Yup.object().shape({
                                    nombre: Yup.string().max(255).required('Nombre is required'),
                                    codusr: Yup.string().max(50).required('Codusr is required'),
                                    correo: Yup.string().email().max(300).required('Correo is required'),
                                    clave: Yup.string().max(300).required('Clave is required'),
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
                                    <Box mb={3}>
                                        <Typography
                                            color="textPrimary"
                                            variant="h5"
                                            align="center"
                                        >
                                            Editar Usuario
                                    </Typography>
                                    </Box>
                                    <TextField
                                        error={Boolean(touched.codusr && errors.codusr)}
                                        fullWidth
                                        helperText={touched.codusr && errors.codusr}
                                        label="Codusr"
                                        margin="normal"
                                        name="codusr"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        value={values.codusr}
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
                                    <TextField
                                        error={Boolean(touched.correo && errors.correo)}
                                        fullWidth
                                        helperText={touched.correo && errors.correo}
                                        label="Correo"
                                        margin="normal"
                                        name="correo"
                                        type="email"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        value={values.correo}
                                        variant="outlined"
                                    />
                                    <TextField
                                        error={Boolean(touched.clave && errors.clave)}
                                        fullWidth
                                        helperText={touched.clave && errors.clave}
                                        label="Clave"
                                        margin="normal"
                                        name="clave"
                                        type="password"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        value={values.clave}
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

export default TableUser