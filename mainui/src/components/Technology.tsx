import { Card, Image, Stack } from "@mantine/core";

export const TechnologyCard = ({ name }: { name: string }) => {
  return (
    <Card m={20} w={120} radius="lg" shadow="md">
      <Stack align="center">
        <Image
          fit="contain"
          src={`https://static.callummclu.co.uk/main/${name}.webp`}
          maw={75}
          height={75}
        ></Image>
      </Stack>
    </Card>
  );
};
