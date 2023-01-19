import { Center, Stack, Text, Title } from "@mantine/core";

interface ErrorProps{
    code:number;
    message:string;
    icon?:any;
}

export const Error = ({code,message,icon}:ErrorProps) => {
    return (
        <Stack justify={'center'} h="100vh" spacing={0}>
            <Center>
                {icon}
            </Center>
            <Center>
                <Title>{code}</Title>
            </Center>
            <Center>
                <Text>{message}</Text>
            </Center>
        </Stack>
    )
}