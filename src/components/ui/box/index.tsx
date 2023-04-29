import { View } from 'react-native';
import styled from 'styled-components';
import { border, borderRadius, color, compose, flexbox, layout, size, space, background } from 'styled-system';

const Box: any = styled(View)(compose(flexbox, space, layout, border, color, size, borderRadius, background));

export default Box;
