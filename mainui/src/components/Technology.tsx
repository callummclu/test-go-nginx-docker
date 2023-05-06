import { Card, Center, Image, Stack, Text, Title } from "@mantine/core";

export const TechnologyCard = ({ name }: { name: string }) => {
  return (
    <Card m={20} w={"clamp(250px,25%, 400px)"} radius="xl">
      <Stack align="center">
        <Image
          src={`https://static.callummclu.co.uk/main/${name}.webp`}
          height={75}
        ></Image>
        <Title order={4} ta="center">
          {name[0].toUpperCase() + name.substring(1)}
        </Title>
      </Stack>
    </Card>
  );
};
