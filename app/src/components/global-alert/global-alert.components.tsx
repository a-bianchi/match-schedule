import * as React from 'react';
import { Alert } from '@mui/material';
import { GlobalAlertContext } from '../../context';

type Props = {
  test?: string;
};

export const GlobalAlert = ({ test }: Props) => {
  const { hidden, node, message, onHidden } =
    React.useContext(GlobalAlertContext);

  return (
    <>
      {!hidden ? (
        !node ? (
          <Alert severity={message?.severity || 'success'} onClose={onHidden}>
            {message?.message || 'Success'}
          </Alert>
        ) : (
          node
        )
      ) : null}
    </>
  );
};
