import * as React from 'react';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { Divider } from '@mui/material';

type Props = {
  index: number;
};

export const PlayerFields = ({ index }: Props) => {
  return (
    <>
      <Typography
        sx={{ mt: 1, ml: 0, mb: 1 }}
        color="text.secondary"
        display="block"
        variant="caption"
        fontSize={16}>
        Jugador {index + 1}
      </Typography>
      <Divider />
      <div key={`${index}-player`}>
        <TextField
          margin="normal"
          required
          fullWidth
          name={`${index}-name`}
          label="Nombre"
          id={`${index}-name`}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          name={`${index}-phone`}
          label="Telefono"
          id={`${index}-phone`}
        />
      </div>
    </>
  );
};
