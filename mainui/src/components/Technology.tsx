import { Card, Center, Stack, Text } from "@mantine/core";
import { ReactNode } from "react";

export const TechnologyCard = ({
  name,
  icon,
}: {
  name: string;
  icon: ReactNode;
}) => {
  return (
    <Card m={20} w={"clamp(250px,25%, 400px)"}>
      <Stack align="center">
        {icon}
        <Text ta="center">{name}</Text>
      </Stack>
    </Card>
  );
};
