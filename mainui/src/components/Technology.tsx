import { Card, Image, Stack, Tooltip } from "@mantine/core";

export const TechnologyCard = ({ name }: { name: string }) => {
  return (
    <Card m={20} w={120} radius="lg" shadow="md">
      <Stack align="center">
        <Tooltip
          label={
            name[0].toUpperCase() + name.substring(1).replace("sharp", "#")
          }
        >
          <Image
            fit="contain"
            src={`https://static.callummclu.co.uk/main/${name}.webp`}
            maw={75}
            height={75}
          ></Image>
        </Tooltip>
      </Stack>
    </Card>
  );
};
