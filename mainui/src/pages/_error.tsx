import { Anchor, Button, Center, Stack, Text, Title } from "@mantine/core";
import { useEffect, useState } from "react";
import { BiError } from "react-icons/bi";

interface ErrorProps {
  code: number;
  message: string;
  icon?: any;
}

export default function Error({
  code = 404,
  message = "Page not found.",
  icon = <BiError size={80} />,
}: ErrorProps) {
  const [origin, setOrigin] = useState<string>("");

  useEffect(() => {
    if (window !== undefined) {
      setOrigin(window.location.origin);
    }
  }, []);

  return (
    <Stack justify={"center"} h="calc(100vh - 60px)" spacing={0}>
      <Center>{icon}</Center>
      <Center>
        <Title>{code}</Title>
      </Center>
      <Center>
        <Text>{message}</Text>
      </Center>
      <Center mt="sm">
        <Anchor href={origin}>
          <Button variant="outline" color="teal">
            Return home
          </Button>
        </Anchor>
      </Center>
    </Stack>
  );
}
