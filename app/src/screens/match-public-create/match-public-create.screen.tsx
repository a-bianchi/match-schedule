import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';

import { useMutation } from '@tanstack/react-query';

import { createMatchPublic } from '../../services/api';
import { Alert, Link } from '@mui/material';

export const MatchPublicCreate = () => {
  const { isLoading, isSuccess, isError, error, mutate, data } =
    useMutation(createMatchPublic);

  const newError = error as any;

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const item = new FormData(event.currentTarget);
    const name = item.get('name')?.toString() || '';
    const address = item.get('address')?.toString() || '';
    const time = item.get('time')?.toString() || '';
    const note = item.get('note')?.toString() || '';
    const headlines = [
      {
        name: 'Jugador 1',
        phone: 12345,
      },
    ];
    mutate({
      name,
      address,
      time,
      note,
      headlines,
    });
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}>
        <Typography component="h1" variant="h5">
          Crear partido
        </Typography>
        <div>
          {isSuccess ? (
            <>
              <br />
              <Alert severity="success">
                El partido se ha creado correctamente, el codigo de seguridad
                es: <strong>{data?.security_code}</strong> - Link:{' '}
                <Link
                  href={`http://localhost:3001/match/view/${data?._id}`}
                  color="inherit">
                  {`http://localhost:3001/match/view/${data?._id}`}
                </Link>
              </Alert>
            </>
          ) : null}
          {isError ? (
            <>
              <br />
              <Alert severity="error">Error: {newError.message}</Alert>
            </>
          ) : null}
        </div>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="name"
            label="Nombre"
            name="name"
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="address"
            label="Dirección"
            id="address"
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="time"
            label="Fecha y hora"
            id="time"
          />
          <TextField
            margin="normal"
            fullWidth
            name="note"
            label="Nota"
            id="note"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}>
            Crear
          </Button>
        </Box>
      </Box>
    </Container>
  );
};
