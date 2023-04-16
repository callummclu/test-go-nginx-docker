import { Badge, Card, Group, Title, Text, Avatar, Stack } from "@mantine/core";
import { BsThreeDotsVertical } from "react-icons/bs";

export interface ProjectPost {
  title: string;
  description: string;
  image: string;
  id: string | number;
}

export const AdminProjectItem = ({
  title,
  description,
  image,
  id,
}: ProjectPost) => {
  return (
    <Card
      my="xs"
      className="project-item admin"
      withBorder
      w={"100%"}
      style={{ position: "relative" }}
    >
      <div style={{ position: "absolute", top: 15, right: 15 }}>
        <BsThreeDotsVertical color="gray" />
      </div>
      <div
        className="image"
        style={image ? { backgroundImage: `url(${image})` } : {}}
      />
      <div className="description">
        <Group>
          <Avatar src={image} />
          <Stack maw="calc(100% - 80px)" spacing={0}>
            <Title
              style={{
                textOverflow: "ellipsis",
                overflow: "hidden",
                whiteSpace: "nowrap",
              }}
              order={2}
            >
              {title}
            </Title>
            <Text
              style={{
                textOverflow: "ellipsis",
                overflow: "hidden",
                whiteSpace: "nowrap",
              }}
              color="dimmed"
            >
              {description}
            </Text>
          </Stack>
        </Group>
      </div>
    </Card>
  );
};
