import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';

import { useQuery } from '@tanstack/react-query';

import { getMatchPublicById } from '../../services/api';

import { useNavigate, useParams } from 'react-router-dom';
import {
  Avatar,
  Button,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from '@mui/material';

export const MatchPublicView = () => {
  let { id } = useParams();

  const { isLoading, isError, error, data } = useQuery([id], () =>
    getMatchPublicById(id),
  );

  const navigate = useNavigate();

  const newError = error as any;

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error! {newError.message}</div>;
  }

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
        <div>
          <p>
            <Button
              variant="contained"
              onClick={() => console.log('Hace tu magia rey!')}>
              Armar Equipos
            </Button>{' '}
            <Button
              variant="contained"
              onClick={() => navigate(`/match/update/${data._id}`)}>
              Modificar
            </Button>
          </p>
        </div>
        {data ? (
          <>
            <h1>{data.name}</h1>
            <p>Direccion: {data.address}</p>
            <p>Horario: {data.time}</p>
            <p>{data.note}</p>
            <List
              sx={{
                width: '100%',
                maxWidth: 360,
                bgcolor: 'background.paper',
              }}>
              {data.headlines.map((headline, index) => {
                return (
                  <ListItem
                    key={`${index}-${headline.name}`}
                    alignItems="flex-start">
                    <ListItemAvatar>
                      <Avatar
                        alt={headline.name}
                        src="/static/images/avatar/1.jpg"
                      />
                    </ListItemAvatar>
                    <ListItemText
                      primary={headline.name}
                      secondary={
                        <React.Fragment>
                          <Typography
                            sx={{ display: 'inline' }}
                            component="span"
                            variant="body2"
                            color="text.primary">
                            {headline.attend
                              ? ' Asistirá - '
                              : ' No asistirá - '}
                            {`Telefono: ${
                              headline.phone
                                ? headline.phone
                                : 'No especificado'
                            }`}
                          </Typography>
                        </React.Fragment>
                      }
                    />
                  </ListItem>
                );
              })}
            </List>
          </>
        ) : null}
      </Box>
    </Container>
  );
};
