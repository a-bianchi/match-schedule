import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { Box, Button, TextField, Typography } from '@mui/material';
import { MatchSchema } from './match.schema';

type Props = {
  submit: (values: any) => void;
};

export const MatchForm = ({ submit }: Props) => {
  return (
    <Formik
      initialValues={{
        name: '',
        address: '',
        time: '',
        note: '',
      }}
      enableReinitialize
      validationSchema={MatchSchema}
      onSubmit={values => {
        submit({ ...values, headlines: [{ name: 'holis', phone: 12345678 }] });
      }}>
      {({
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        handleSubmit,
      }) => (
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="name"
            label="Nombre"
            name="name"
            onChange={handleChange}
            value={values.name}
            autoFocus
            error={errors.name && touched.name && errors.name ? true : false}
          />
          <ErrorMessage
            name="name"
            render={error => (
              <Typography style={{ color: 'red' }}>{error}</Typography>
            )}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="address"
            label="Dirección"
            id="address"
            onChange={handleChange}
            value={values.address}
            error={
              errors.address && touched.address && errors.address ? true : false
            }
          />
          <ErrorMessage
            name="address"
            render={error => (
              <Typography style={{ color: 'red' }}>{error}</Typography>
            )}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="time"
            label="Fecha y hora"
            id="time"
            onChange={handleChange}
            value={values.time}
            error={errors.time && touched.time && errors.time ? true : false}
          />
          <ErrorMessage
            name="time"
            render={error => (
              <Typography style={{ color: 'red' }}>{error}</Typography>
            )}
          />
          <TextField
            margin="normal"
            fullWidth
            name="note"
            label="Nota"
            id="note"
            onChange={handleChange}
            value={values.note}
            error={errors.note && touched.note && errors.note ? true : false}
          />
          <ErrorMessage
            name="note"
            render={error => (
              <Typography style={{ color: 'red' }}>{error}</Typography>
            )}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}>
            Crear
          </Button>
        </Box>
      )}
    </Formik>
  );
};
