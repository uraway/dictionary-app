// @flow
import React from "react";
import { ListGroup, ListGroupItem } from "reactstrap";
import { type Word } from "../service/word";

type Props = {|
  words: Word[],
  limit: number
|};

export default function WordGroup({ words, limit }: Props) {
  if (!words) return <div />;
  return (
    <ListGroup>
      {words.slice(0, limit).map(word => (
        <ListGroupItem key={word.entry + word.meaning}>
          {word.entry}: {word.meaning}
        </ListGroupItem>
      ))}
    </ListGroup>
  );
}
