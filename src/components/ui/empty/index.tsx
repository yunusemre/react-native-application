import React, { memo } from 'react';
import Box from '../box';
import Text from '../text';

const UiEmpy = ({ textType = 'textColor', text, ...props }: any) => {
  return (
    <Box {...props} borderRadius={8}>
      <Text color={textType}>{text}</Text>
    </Box>
  );
};

export default memo(UiEmpy);
