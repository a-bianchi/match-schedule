import * as React from 'react';
import { BottomNavigation, BottomNavigationAction } from '@mui/material';
import ElectricBoltIcon from '@mui/icons-material/ElectricBolt';
export const Footer = () => {
  return (
    <BottomNavigation
      showLabels
      style={{
        flexGrow: 1,
        position: 'fixed',
        bottom: 0,
        width: '100%',
      }}>
      <BottomNavigationAction
        label="Random"
        value="Random"
        icon={<ElectricBoltIcon />}
      />
    </BottomNavigation>
  );
};
