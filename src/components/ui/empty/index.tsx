import React, { memo } from 'react';
import Box from '../box';
import Text from '../text';

const UiEmpy = (props: any) => {
  return (
    <Box {...props} borderRadius={8}>
      <Text color={props.textType}>{props.text}</Text>
    </Box>
  );
};

export default memo(UiEmpy);
