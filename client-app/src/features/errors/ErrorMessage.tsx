import React from "react";
import { Message } from "semantic-ui-react";

interface Props {
  message: string;
}
export default function ValidationMessageError({ message }: Props) {
  return (
    <Message error>
      <Message.Item> {message}</Message.Item>
    </Message>
  );
}
