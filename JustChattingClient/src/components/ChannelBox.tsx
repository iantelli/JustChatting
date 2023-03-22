import { Channel } from "../models";
import {
    Box,
    Flex,
    Text,
    Button,
} from '@chakra-ui/react';

type ChannelBoxProps = {
    channel: Channel;
    onClick: () => void;
    onDelete: () => void;
}

export const ChannelBox = ({channel, onClick, onDelete}: ChannelBoxProps) => {
    return (
        <Box
            bg={"gray"}
            color="black"
            minW="100px"
            maxW="350px"
            my="1"
            p="3"
        >
            <Flex flexDirection={"column"} justifyContent={"center"} textAlign={"center"}>
                <Text fontSize={"2xl"}>{channel.name}</Text>
                <Button colorScheme="teal" onClick={onClick}>Join</Button>
                <Button colorScheme={"red"} onClick={onDelete}>Delete</Button>
            </Flex>
        </Box>
    );
}