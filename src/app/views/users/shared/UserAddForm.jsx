import { Formik } from 'formik'
import { useState, Fragment } from 'react'
import Button from '@mui/material/Button'

import {
  TextField,
} from '@mui/material'
import { LoadingButton } from '@mui/lab'
import * as Yup from 'yup'

const phoneRegExp = /[+7][0-9]{10}$/

// initial login credentials
const initialValues = {
  email: '',
  phone: '',
  password: '',
}

// form field validation schema
const validationSchema = Yup.object().shape({
  password: Yup.string()
    .min(6, 'Минимальная длина пароля 6 символов')
    .required('Обязательное поле!'),
  email: Yup.string()
    .email('Неверный формат email')
    .required('Обязательное поле!'),
  phone: Yup.string()
    .required('Обязательное поле!')
    .matches(phoneRegExp, 'Телефон должен соответствовать виду: 79999999999'),
})

export default function UserAddForm({ handleClose, onSubmit, errorForm }) {
  const [loading, setLoading] = useState(false)

  const handleFormSubmit = async (values) => {
    setLoading(true)
    try {
      onSubmit(values.email, values.phone, values.password)
      setLoading(false)
    } catch (e) {
      console.log(e)
      setLoading(false)
    }
  }

  return (
    <Fragment>
      <Formik
        onSubmit={handleFormSubmit}
        initialValues={initialValues}
        validationSchema={validationSchema}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
        }) => (
          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              size='small'
              type='email'
              name='email'
              label='Email'
              variant='outlined'
              onBlur={handleBlur}
              value={values.email}
              onChange={handleChange}
              helperText={touched.email && errors.email}
              error={Boolean(errors.email && touched.email)}
              sx={{ mb: 3, mt: 1 }}
            />
            <TextField
              fullWidth
              size='small'
              type='phone'
              name='phone'
              label='Phone'
              variant='outlined'
              onBlur={handleBlur}
              value={values.phone}
              onChange={handleChange}
              helperText={touched.phone && errors.phone}
              error={Boolean(errors.phone && touched.phone)}
              sx={{ mb: 3 }}
            />
            <TextField
              fullWidth
              size='small'
              name='password'
              type='password'
              label='Password'
              variant='outlined'
              autoComplete='true'
              onBlur={handleBlur}
              value={values.password}
              onChange={handleChange}
              helperText={touched.password && errors.password}
              error={Boolean(errors.password && touched.password)}
              sx={{ mb: 2 }}
            />
            <div>{errorForm}</div>
            <LoadingButton
              type='submit'
              color='primary'
              loading={loading}
              variant='contained'
              sx={{ mb: 2, mt: 3 }}
            >
              Добавить
            </LoadingButton>
            <Button
              sx={{ mb: 2, mt: 3, ml:1 }}
              variant='outlined'
              color='secondary'
              onClick={handleClose}
            >
              Закрыть
            </Button>
          </form>
        )}
      </Formik>
    </Fragment>
  )
}
