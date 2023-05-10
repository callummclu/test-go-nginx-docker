import { Card, Image, Stack, Tooltip } from "@mantine/core";

export const TechnologyCard = ({ name }: { name: string }) => {
  return (
    <Tooltip
      label={name[0].toUpperCase() + name.substring(1).replace("sharp", "#")}
    >
      <Card m={20} mb={50} w={120} radius="lg">
        <Stack align="center">
          <Image
            fit="contain"
            src={`https://static.callummclu.co.uk/main/${name}.webp`}
            maw={70}
            height={75}
          ></Image>
        </Stack>
      </Card>
    </Tooltip>
  );
};
