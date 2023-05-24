import { memo } from 'react';
import { View } from 'react-native';
import styled from 'styled-components';
import {
  background,
  border,
  borderRadius,
  color,
  compose,
  flexbox,
  grid,
  layout,
  size,
  space,
} from 'styled-system';

const Box: any = styled(View)(
  compose(flexbox, space, grid, layout, border, color, size, borderRadius, background)
);

export default memo(Box);
