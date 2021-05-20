import React, { useState } from 'react'
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  makeStyles,
  Snackbar,
  IconButton
} from '@material-ui/core'
import * as Yup from 'yup'
import { Formik } from 'formik'
import Page from '../component/Page'
import { useDispatch, useSelector } from 'react-redux'
import { obtenerToken } from '../redux/usuarioReducer'
import { X } from 'react-feather'
import { hideAlert } from '../redux/alertReducer'

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    height: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}))

const IndexPage = () => {

  const classes = useStyles()
  const dispatch = useDispatch()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const alert = useSelector((store) => store.alert.data)
  const [usuario] = useState({
    username: 'mcruz',
    password: '12345'
  })

  return (
    <Page
      className={classes.root}
      title="Login"
    >
      <Box
        display="flex"
        flexDirection="column"
        height="100%"
        justifyContent="center"
      >
        <Container maxWidth="sm">
          <Formik
            initialValues={usuario}
            validationSchema={Yup.object().shape({
              username: Yup.string().max(255).required('Username is required'),
              password: Yup.string().max(255).required('Password is required')
            })}
            onSubmit={(values) => {
              setIsSubmitting(true)
              dispatch(obtenerToken(values, setIsSubmitting))
            }}
          >
            {({
              values,
              errors,
              handleBlur,
              handleSubmit,
              handleChange,
              touched
            }) => (
              <form onSubmit={handleSubmit}>
                <Box mb={3}>
                  <Typography
                    color="textPrimary"
                    variant="h2"
                  >
                    Sign in
                  </Typography>
                  <Typography
                    color="textSecondary"
                    gutterBottom
                    variant="body2"
                  >
                    Sign in on the internal platform
                  </Typography>
                </Box>

                <TextField
                  error={Boolean(touched.username && errors.username)}
                  fullWidth
                  helperText={touched.username && errors.username}
                  label="Username"
                  margin="normal"
                  name="username"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  type="text"
                  value={values.username}
                  variant="outlined"
                />
                <TextField
                  error={Boolean(touched.password && errors.password)}
                  fullWidth
                  helperText={touched.password && errors.password}
                  label="Password"
                  margin="normal"
                  name="password"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  type="password"
                  value={values.password}
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
                    Sign in
                  </Button>
                </Box>
              </form>
            )}
          </Formik>
        </Container>
        <div>
          <Snackbar
            anchorOrigin={{
              vertical: typeof alert !== 'undefined' ? alert.vertical : "top",
              horizontal: typeof alert !== 'undefined' ? alert.horizontal : "center"
            }}
            autoHideDuration={6000}
            message={typeof alert !== 'undefined' ? alert.message : ""}
            open={typeof alert !== 'undefined' ? alert.open : false}
            onClose={() => { dispatch(hideAlert()) }}
            action={
              <React.Fragment>
                <IconButton size="small" aria-label="close" color="inherit"
                  onClick={() => { dispatch(hideAlert()) }}>
                  <X size="20" />
                </IconButton>
              </React.Fragment>
            }
          />
        </div>
      </Box>
    </Page>
  )
}
export default IndexPage