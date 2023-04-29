import { Text as T } from 'react-native';
import styled from 'styled-components';
import { color, compose, size, space, typography } from 'styled-system';

const Text: any = styled(T)(compose(typography, space, color, size));

export default Text;
