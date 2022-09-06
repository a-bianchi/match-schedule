import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';

import { useMutation } from '@tanstack/react-query';

import { createMatchPublic } from '../../services/api';
import { Alert, CircularProgress, Link } from '@mui/material';
import { MatchForm } from '../../forms';

export const MatchPublicCreate = () => {
  const { isLoading, isSuccess, isError, error, mutate, data } =
    useMutation(createMatchPublic);

  const newError = error as any;

  const redirect_url = window.location.href + `match/view/${data?._id}`;

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      {isLoading ? <CircularProgress /> : null}
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
                <Link href={`${redirect_url}`} color="inherit">
                  {`${redirect_url}`}
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
        <MatchForm submit={mutate} />
      </Box>
    </Container>
  );
};

{
  // Ver como integras la parte de agregar jugadores
  /* <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
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
  onClick={() => handleRemovePlayer(players.length - 1)}
  variant="contained"
  sx={{ mt: 3, mb: 2 }}>
  Sacar Jugador -
</Button>{' '}
<Button
  onClick={handleAddPlayer}
  variant="contained"
  sx={{ mt: 3, mb: 2 }}>
  Agregar Jugador +
</Button>
{players.map((player, index) => (
  <PlayerFields key={index} />
))}
<Button
  type="submit"
  fullWidth
  variant="contained"
  sx={{ mt: 3, mb: 2 }}>
  Crear
</Button>
</Box> */
}
