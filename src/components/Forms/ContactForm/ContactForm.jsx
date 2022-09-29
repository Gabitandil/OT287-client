import React from 'react'
import {
  Container, CssBaseline, Box, Typography, Grid, Button, Alert,
} from '@mui/material'
import { Formik, Form } from 'formik'
import PropTypes from 'prop-types'
import FormInputField from '../../Layout/FormInputField'

const ContactForm = (props) => {
  const {
    initialValues, validationSchema, onSubmitForm, errorStatus, navigate,
    setErrorStatus, contactCreated, setContactCreated,
  } = props
  return (
    <>
      <Container component="main" maxWidth="sm">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 2,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            justifyContent: 'center',
          }}
        >
          <Typography component="h1" variant="h5" sx={{ fontWeight: 'bold' }}>¡Contactate con nosotros!</Typography>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={(values, actions) =>
              onSubmitForm(values, actions)}
          >
            <Box sx={{ mt: 4 }}>
              <Form>
                <Grid container spacing={1}>
                  <Grid item xs={12}>
                    <FormInputField label="Nombre" name="name" type="text" variant="outlined" autoFocus sx={{ h: 10 }} />
                  </Grid>
                  <Grid item xs={12}>
                    <FormInputField label="Email" name="email" type="email" variant="outlined" />
                  </Grid>
                  <Grid item xs={12}>
                    <FormInputField label="Escribe tu consulta..." name="message" variant="outlined" multiline rows={6} />
                  </Grid>
                  <Grid item xs={4}>
                    <Button
                      type="submit"
                      variant="contained"
                      color="secondary"
                      sx={{
                        mt: 1, mb: 1, h: 10,
                      }}
                    >
                      Enviar Consulta
                    </Button>
                  </Grid>
                  <Grid item>
                    {errorStatus && (
                    <Alert severity="error" sx={{ width: '100%' }} onClose={() => { setErrorStatus(null) }}>
                      No se ha podido enviar su consulta —
                    </Alert>
                    )}
                  </Grid>
                  <Grid item>
                    {contactCreated === true ? (
                      <Alert
                        severity="success"
                        sx={{ width: '100%' }}
                        onClose={() => {
                          setContactCreated(false)
                        }}
                      >
                        Su consulta ha sido enviada! —
                      </Alert>
                    ) : null}
                  </Grid>
                  <Grid item xs={12}>
                    <Button
                      onClick={() => navigate('/')}
                      variant="outlined"
                      sx={{
                        mt: 1, mb: 1, h: 10, color: 'black', borderColor: 'black',
                      }}
                    >
                      Ir al inicio
                    </Button>
                  </Grid>
                </Grid>
              </Form>
            </Box>
          </Formik>
        </Box>
      </Container>

    </>
  )
}

ContactForm.propTypes = {
  initialValues: PropTypes.shape({
    name: PropTypes.string,
    email: PropTypes.string,
    message: PropTypes.string,
  }).isRequired,
  validationSchema: PropTypes.oneOfType([PropTypes.object]).isRequired,
  onSubmitForm: PropTypes.func.isRequired,
  setErrorStatus: PropTypes.func.isRequired,
  contactCreated: PropTypes.bool.isRequired,
  setContactCreated: PropTypes.func.isRequired,
  navigate: PropTypes.func.isRequired,
  errorStatus: PropTypes.string,

}
ContactForm.defaultProps = {
  errorStatus: null,
}

export default ContactForm
