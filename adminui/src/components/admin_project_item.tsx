import {
  Badge,
  Card,
  Group,
  Title,
  Text,
  Avatar,
  Stack,
  Button,
  Menu,
  Anchor,
  ActionIcon,
} from "@mantine/core";
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
      style={{ position: "relative", overflow: "visible" }}
      my="xs"
      className="project-item admin"
      withBorder
      w={"100%"}
    >
      <div style={{ position: "absolute", top: 15, right: 15 }}>
        <Menu shadow="md" width={200}>
          <Menu.Target>
            <ActionIcon>
              <BsThreeDotsVertical color="gray" />
            </ActionIcon>
          </Menu.Target>

          <Menu.Dropdown ml="xl">
            <Menu.Label>Post Settings</Menu.Label>
            <Anchor
              href={`${window.location.origin}/posts/${id}`}
              style={{ textDecoration: "none" }}
            >
              <Menu.Item>Edit</Menu.Item>
            </Anchor>
            <Anchor
              href={`${window.location.origin}/posts/${id}?action=delete`}
              style={{ textDecoration: "none" }}
            >
              <Menu.Item color="red">Delete</Menu.Item>
            </Anchor>
          </Menu.Dropdown>
        </Menu>
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
