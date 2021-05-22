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
import { addParametro, deleteParametro, updateParametro } from '../../redux/paramsReducer';

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


const TableParams = ({ data }) => {

    const [open, setOpen] = useState(false)
    const classes = useStyles()
    const [openAdd, setOpenAdd] = useState(false)
    const dispatch = useDispatch()
    const [param, setParam] = useState({})

    return (
        <Card >
            <CardHeader title="Parametros" className={classes.headDark}
                action={
                    <Tooltip title="Agregar Parametro">
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
                                    ID
                                </TableCell>
                                <TableCell className={classes.headTable}>
                                    GRUPO
                                </TableCell>
                                <TableCell className={classes.headTable}>
                                    CODIGO
                                </TableCell>
                                <TableCell className={classes.headTable}>
                                    VALOR
                                </TableCell>
                                <TableCell className={classes.headTable}>
                                    ACCIONES
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {typeof data !== 'undefined' ? data.map((par) => (
                                <TableRow
                                    hover
                                    key={[par.idpar]}
                                >
                                    <TableCell className={classes.row} >
                                        {par.idpar}
                                    </TableCell>
                                    <TableCell className={classes.row} >
                                        {par.grupo}
                                    </TableCell>
                                    <TableCell className={classes.row} >
                                        {par.codpar}
                                    </TableCell>
                                    <TableCell className={classes.row} >
                                        {par.valor}
                                    </TableCell>
                                    <TableCell className={classes.row}>
                                        <IconButton color="secondary" onClick={() => {
                                            dispatch(deleteParametro({'idpar': par.idpar}))
                                        }}>
                                            <Trash size="15" />
                                        </IconButton>
                                        <IconButton color="secondary" onClick={() => {
                                            setParam(par)
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
                                grupo: '',
                                codpar: '',
                                valor: '',
                            }}
                            validationSchema={
                                Yup.object().shape({
                                    grupo: Yup.string().max(50).required('Grupo is required'),
                                    codpar: Yup.string().max(50).required('Codigo is required'),
                                    valor: Yup.string().max(250).required('Valor is required'),
                                })
                            }
                            onSubmit={(values) => {
                                dispatch(addParametro(values))
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
                                            Agregar nuevo Parametro
                                        </Typography>
                                    </Box>
                                    <TextField
                                        error={Boolean(touched.grupo && errors.grupo)}
                                        fullWidth
                                        helperText={touched.grupo && errors.grupo}
                                        label="Grupo"
                                        margin="normal"
                                        name="grupo"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        value={values.grupo}
                                        variant="outlined"
                                    />
                                    <TextField
                                        error={Boolean(touched.codpar && errors.codpar)}
                                        fullWidth
                                        helperText={touched.codpar && errors.codpar}
                                        label="Codigo"
                                        margin="normal"
                                        name="codpar"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        value={values.codpar}
                                        variant="outlined"
                                    />
                                    <TextField
                                        error={Boolean(touched.valor && errors.valor)}
                                        fullWidth
                                        helperText={touched.valor && errors.valor}
                                        label="Valor"
                                        margin="normal"
                                        name="valor"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        value={values.valor}
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
                            initialValues={param}
                            validationSchema={
                                Yup.object().shape({
                                    grupo: Yup.string().max(50).required('Grupo is required'),
                                    codpar: Yup.string().max(50).required('Codigo is required'),
                                    valor: Yup.string().max(250).required('Valor is required'),
                                })
                            }
                            onSubmit={(values) => {
                                dispatch(updateParametro(values))
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
                                            Editar Parametro
                                    </Typography>
                                    </Box>
                                    <TextField
                                        error={Boolean(touched.grupo && errors.grupo)}
                                        fullWidth
                                        helperText={touched.grupo && errors.grupo}
                                        label="Grupo"
                                        margin="normal"
                                        name="grupo"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        value={values.grupo}
                                        variant="outlined"
                                    />
                                    <TextField
                                        error={Boolean(touched.codpar && errors.codpar)}
                                        fullWidth
                                        helperText={touched.codpar && errors.codpar}
                                        label="Codigo"
                                        margin="normal"
                                        name="codpar"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        value={values.codpar}
                                        variant="outlined"
                                    />
                                    <TextField
                                        error={Boolean(touched.valor && errors.valor)}
                                        fullWidth
                                        helperText={touched.valor && errors.valor}
                                        label="Valor"
                                        margin="normal"
                                        name="valor"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        value={values.valor}
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

export default TableParams