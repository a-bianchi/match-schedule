import { AlertColor } from '@mui/material';
import React, { useEffect } from 'react';
import { createContext } from 'react';

interface ContextProps {
  onHidden: () => void;
  offHidden: () => void;
  setHidden: (state: boolean) => void;
  setNode: (node: React.ReactNode) => void;
  setMessage: (props: Message) => void;
  setTime: (timeout: number) => void;
  message?: Message;
  node?: React.ReactNode;
  hidden: boolean;
}

interface Message {
  message: string;
  severity: AlertColor;
}

export const GlobalAlertContext = createContext({} as ContextProps);

export const GlobalAlertProvider = ({ children }: any) => {
  const [hidden, _setHidden] = React.useState(true);
  const [node, _setNode] = React.useState<React.ReactNode>();
  const [message, _setMessage] = React.useState<Message>();
  const [time, _setTime] = React.useState<number>(5000);

  let timerHiddenAlert = setTimeout(() => _setHidden(true), time);

  useEffect(() => {
    return () => {
      return clearTimeout(timerHiddenAlert);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hidden]);

  const setTime = (timeout: number) => {
    _setTime(timeout);
  };

  const onHidden = () => {
    _setHidden(true);
  };

  const offHidden = () => {
    _setHidden(false);
  };

  const setHidden = (state: boolean) => {
    _setHidden(state);
  };

  const setNode = (_node: React.ReactNode): void => {
    _setNode(_node);
    offHidden();
  };

  const setMessage = (props: Message): void => {
    _setMessage(props);
    offHidden();
  };

  return (
    <GlobalAlertContext.Provider
      value={{
        setNode,
        node,
        onHidden,
        offHidden,
        setHidden,
        hidden,
        setMessage,
        message,
        setTime,
      }}>
      {children}
    </GlobalAlertContext.Provider>
  );
};
