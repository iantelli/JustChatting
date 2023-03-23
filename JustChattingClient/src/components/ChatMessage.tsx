import { Avatar, Flex, Text, Button } from "@chakra-ui/react";
import { Message } from "../models";

type ChatMessageProps = {
    message: Message;
    onDelete: () => void;
}

export const ChatMessage = ({message, onDelete}: ChatMessageProps) => {
    return (
            <Flex flexDirection={"column"} key={message.id} w="100%">
                <Flex flexDirection={"row"} justifyContent={"center"} textAlign={"center"}>
            <Avatar
                name={message.userName}
                src="brokenlink"
                bg="blue.300"
            ></Avatar>
            <Flex
                bg="gray.100"
                color="black"
                minW="100px"
                maxW="350px"
                my="1"
                p="3"
            >
                <Text>{message.text}</Text>
            </Flex>
                </Flex>
                <Flex justifyContent={"center"} textAlign={"center"}>
                <Button colorScheme={"red"} onClick={onDelete}>Delete</Button>
                </Flex>
        </Flex>
    );
}