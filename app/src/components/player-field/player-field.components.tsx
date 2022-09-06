import * as React from 'react';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { Divider } from '@mui/material';

type Props = {
  key: number;
};

export const PlayerFields = ({ key }: Props) => {
  return (
    <>
      <Typography
        sx={{ mt: 1, ml: 0, mb: 1 }}
        color="text.secondary"
        display="block"
        variant="caption"
        fontSize={16}>
        Jugador {key + 1}
      </Typography>
      <Divider />
      <div key={`${key}-player`}>
        <TextField
          margin="normal"
          required
          fullWidth
          name={`${key}-name`}
          label="Nombre"
          id={`${key}-name`}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          name={`${key}-phone`}
          label="Telefono"
          id={`${key}-phone`}
        />
      </div>
    </>
  );
};
