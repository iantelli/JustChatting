import { Avatar, Flex, Text } from "@chakra-ui/react";
import { Message } from "../models";

type ChatMessageProps = {
    message: Message;
}

export const ChatMessage = ({message}: ChatMessageProps) => {
    return (
            <Flex key={message.id} w="100%">
            <Avatar
                name={message.userName}
                src="https://avataaars.io/?avatarStyle=Transparent&topType=LongHairStraight&accessoriesType=Blank&hairColor=BrownDark&facialHairType=Blank&clotheType=BlazerShirt&eyeType=Default&eyebrowType=Default&mouthType=Default&skinColor=Light"
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
    );
}