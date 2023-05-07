import { Card, Image, Stack, Title } from "@mantine/core";

export const TechnologyCard = ({ name }: { name: string }) => {
  return (
    <Card m={20} w={"clamp(120px,25%, 400px)"} radius="lg" shadow="md">
      <Stack align="center">
        <Image
          fit="contain"
          src={`https://static.callummclu.co.uk/main/${name}.webp`}
          maw={70}
          height={75}
        ></Image>
        <Title order={4} ta="center" fw={400}>
          {(name[0].toUpperCase() + name.substring(1)).replace("sharp", "#")}
        </Title>
      </Stack>
    </Card>
  );
};
