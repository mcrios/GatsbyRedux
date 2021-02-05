import React from 'react';
import * as Yup from 'yup';
import { Formik } from 'formik';
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  makeStyles,
  MenuItem,
  Select,
  InputLabel,
} from '@material-ui/core';
import Page from '../component/Page';
import { useDispatch } from 'react-redux';
import { agregarUsuario } from '../redux/usuarioReducer';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    height: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  }
}));

const RegisterView = () => {
  const classes = useStyles()
  const dispatch = useDispatch()

  return (
    <Page
      className={classes.root}
      title="Register"
    >
      <Box
        display="flex"
        flexDirection="column"
        height="100%"
        justifyContent="center"
      >
        <Container maxWidth="sm">
          <Formik
            initialValues={{
              correo: '',
              nombre: '',
              clave: '',
              genero: 'Femenino',
              role: {id: 1}
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
                <InputLabel className={classes.formControl}>G&eacute;nero</InputLabel>
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
        </Container>
      </Box>
    </Page>
  );
};

export default RegisterView;
