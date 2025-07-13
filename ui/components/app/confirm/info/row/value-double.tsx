import React from 'react';
import { Box, Text } from '../../../../component-library';
import { useRowContext } from './hook';
import { ConfirmInfoRowVariant } from './row';

const LEFT_TEXT_COLORS = {
  [ConfirmInfoRowVariant.Default]: 'textMuted',
  [ConfirmInfoRowVariant.Critical]: 'errorAlternative',
  [ConfirmInfoRowVariant.Warning]: 'warningDefault',
};

const ConfirmInfoRowValueDouble = ({ left, right }) => {
  const { variant } = useRowContext();
  return (
    <Box display="flex" flexDirection="row" alignItems="center" gap={1}>
      {typeof left === 'string' ? (
        <Text color={LEFT_TEXT_COLORS[variant]}>{left}</Text>
      ) : (
        left
      )}
      {typeof right === 'string' ? (
        <Text>{right}</Text>
      ) : (
        right
      )}
    </Box>
  );
};
