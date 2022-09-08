import React from 'react';
import { Formik, ErrorMessage } from 'formik';
import { Box, Button, TextField, Typography } from '@mui/material';
import { MatchSchema } from './match.schema';
import { PlayerFields } from '../../components';

type Props = {
  submit: (values: any) => void;
};

export const MatchForm = ({ submit }: Props) => {
  const [players, setPlayers] = React.useState(['']);

  const handleAddPlayer = (): void => {
    setPlayers([...players, '']);
  };

  const handleRemovePlayer = (index: number): void => {
    setPlayers(players.filter((_, i) => i !== index));
  };

  const getHeadlines = () => {
    const item = new FormData();
    return players.map((player, index) => {
      const newPlayer = {
        name: item.get(`${index}-name`)?.toString() || '',
        phone: Number(item.get(`${index}-phone`)) || 0,
        attend: true,
      };
      return newPlayer;
    });
  };

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
        // TODO: Agregar jugadores ver como implementar
        const headlines = getHeadlines();
        console.log('headlines', headlines);
        submit({ ...values, headlines });
      }}>
      {({ values, errors, touched, handleChange, handleSubmit }) => (
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
            <PlayerFields key={`${index}-player-field`} index={index} />
          ))}
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
