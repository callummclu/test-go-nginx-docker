import { Anchor, Button, Group, Menu, Text } from "@mantine/core";
import { BiLogOut } from "react-icons/bi";
import { IoMdSettings } from "react-icons/io";
import useAuth from "../hooks/useAuth";

export const AdminNav = () => {
  const { logout, user } = useAuth();

  const logoutAndLeave = () => {
    logout();
    window.location.replace(window.location.origin);
  };

  return (
    <>
      <Group position="apart">
        <Group>
          <Menu shadow="md" width={200}>
            <Menu.Target>
              <Button variant="light" color="gray">
                <IoMdSettings color="gray" />
              </Button>
            </Menu.Target>

            <Menu.Dropdown ml="xl">
              <Menu.Label>Danger zone</Menu.Label>
              <Menu.Item
                onClick={logoutAndLeave}
                color="red"
                icon={<BiLogOut size={14} />}
              >
                Logout
              </Menu.Item>
            </Menu.Dropdown>
          </Menu>
          <Text color={"gray"}>Welcome to the Admin Area, {user?.name}</Text>
        </Group>

        <Anchor href={window.location.origin}>
          <Button variant="disabled">Home</Button>
        </Anchor>
      </Group>
    </>
  );
};
