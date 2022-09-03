import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';

import { useQuery } from '@tanstack/react-query';

import { getMatchPublicById } from '../../services/api';

import { Link as LinkRouter, useParams } from 'react-router-dom';

export const MatchPublicView = () => {
  let { id } = useParams();

  const { isLoading, isError, error, data } = useQuery([id], () =>
    getMatchPublicById(id),
  );

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
        {data ? <div>{JSON.stringify(data)}</div> : null}
      </Box>
    </Container>
  );
};
