import { Card, Center, Image, Stack, Text } from "@mantine/core";

export const TechnologyCard = ({ name }: { name: string }) => {
  return (
    <Card m={20} w={"clamp(250px,25%, 400px)"}>
      <Stack align="center">
        <Image
          src={`https://static.callummclu.co.uk/main/${name}.webp`}
          height={75}
        ></Image>
        <Text ta="center">{name}</Text>
      </Stack>
    </Card>
  );
};
