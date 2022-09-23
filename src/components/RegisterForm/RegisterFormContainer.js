import React, { useState } from 'react';
import axios from 'axios'
import * as Yup from 'yup'
import RegisterForm from './RegisterForm'

function RegisterFormContainer() {
  const [errorStatus, setErrorStatus] = useState(null)

  const onSubmitForm = async (values) => {
    try {
      axios
        .post(`${process.env.REACT_APP_API_DOMAIN}/auth/register`, {
          firstName: values.firstName,
          lastName: values.lastName,
          email: values.email,
          password: values.password,
        })
        .catch((error) => {
          setErrorStatus(error.response.status)
        })
    } catch (error) {
      setErrorStatus(error.response)
    }
  }

  const initialValues = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  }
  const validationSchema = Yup.object({
    firstName: Yup.string()
      .required('Obligatorio'),
    lastName: Yup.string()
      .min(3, 'Debe tener al menos 6 caracteres')
      .max(40, 'Debe tener como mucho 40 caracteres')
      .required('Obligatorio'),
    email: Yup.string().email('Dirección de mail inválida').required('Obligatorio'),
    password: Yup.string()
      .min(6, 'Debe tener al menos 6 caracteres')
      .required('Obligatorio'),
  })

  return (
    <RegisterForm
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmitForm={onSubmitForm}
      error={errorStatus}
    />
  )
}

export default RegisterFormContainer
