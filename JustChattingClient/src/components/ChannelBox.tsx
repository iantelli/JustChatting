import { Channel } from "../models";
import {
    Box,
    Flex,
    Text,
    Button,
} from '@chakra-ui/react';

type ChannelBoxProps = {
    channel: Channel;
    currentChannelId: number;
    onJoin: () => void;
    onDelete: () => void;
}

export const ChannelBox = ({channel, onJoin, onDelete, currentChannelId}: ChannelBoxProps) => {
    return (
        <Box
            bg={"gray"}
            color="black"
            minW="100px"
            maxW="350px"
            my="1"
            mr={"2"}
            p="3"
        >
            <Flex flexDirection={"column"} justifyContent={"center"} textAlign={"center"}>
                <Text fontSize={"2xl"}>{channel.name}</Text>
                {currentChannelId !== channel.id ? (
                    <Button colorScheme={"green"} onClick={onJoin}>Join</Button>
                    ) : (
                    <Text fontSize={"xl"}>Joined</Text>
                )}
                <Button colorScheme={"red"} onClick={onDelete}>Delete</Button>
            </Flex>
        </Box>
    );
}