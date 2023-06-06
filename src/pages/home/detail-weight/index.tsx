import Layout from '@components/layout';
import { Box, Text } from '@components/ui';

export const HomeDetailWeights = ({ route }: any) => {
  console.log(route.params.data);
  return (
    <Layout isHeader isBottom hasBack={true}>
      <Box
        border={1}
        borderColor="borderColor"
        borderRadius={8}
        color="white"
        bg="white"
        p={8}
        m={8}
        flexDirection="row"
      >
        <Text>Emre</Text>
      </Box>
    </Layout>
  );
};
