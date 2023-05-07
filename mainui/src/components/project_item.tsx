import {
  Anchor,
  Avatar,
  Badge,
  Box,
  Card,
  Container,
  Group,
  Stack,
  Text,
  Title,
} from "@mantine/core";

import { getTechnologyBadgeContent } from "../helpers/technologyBadges";
import styles from "../styles/sass/projects.module.scss";
import { useEffect, useState } from "react";
export interface ProjectPost {
  title: string;
  key: string;
  description: string;
  image: string;
  id: string | number;
  technologies?: string[];
  isorganisation?: boolean;
  smaller?: boolean;
  isspotlight?: boolean;
  organisation_dependencies?: string[];
}

export const ProjectItem = ({
  title,
  description,
  image,
  id,
  smaller,
  key,
  technologies,
  isorganisation,
}: ProjectPost) => {
  const [origin, setOrigin] = useState<string>("");
  useEffect(() => {
    if (window !== undefined) {
      setOrigin(window.location.origin);
    }
  }, []);
  return (
    <>
      <div className={styles.card}>
        <Card
          radius="lg"
          mb={"xl"}
          shadow="md"
          className={styles["project-item"]}
        >
          <Container px="xs">
            <div className={styles.description}>
              <Group>
                <Avatar
                  size="xl"
                  bg="white"
                  alt={title}
                  src={image ? image : ""}
                  radius="xl"
                />
                <Stack spacing={0} mb="md">
                  <Title order={2} style={{ margin: 0 }}>
                    <Anchor
                      sx={{ color: "rgb(60,60,60)" }}
                      href={`${origin}/${
                        isorganisation ? "organisation" : "project"
                      }/${title.replaceAll(" ", "-")}`}
                    >
                      {title}
                    </Anchor>
                  </Title>
                  <Text
                    className={
                      smaller
                        ? styles["text-elipsis-smaller"]
                        : styles["text-elipsis"]
                    }
                    color="dimmed"
                  >
                    {description}
                  </Text>
                  <Box
                    mt="sm"
                    key={`key-badge-${key}}`}
                    className={
                      smaller ? styles.badgeWrap : styles.badgeWrapSmaller
                    }
                  >
                    {technologies &&
                      technologies
                        .map((technology) =>
                          getTechnologyBadgeContent(technology)
                        )
                        .map((technology) => (
                          <Badge
                            key={technology.technology}
                            leftSection={technology.icon}
                            color={technology.color}
                            px="sm"
                            mx={5}
                            variant="light"
                          >
                            {technology.technology}
                          </Badge>
                        ))}
                  </Box>
                </Stack>
              </Group>
            </div>
          </Container>
        </Card>
      </div>
    </>
  );
};
