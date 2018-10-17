// @flow
import React, { Component } from "react";
import { Input } from "reactstrap";
import AwesomeDebouncePromise from "awesome-debounce-promise";
import WordGroup from "./WordGroup";
import WordService, { type Word } from "../service/word";

type Props = {
  isLoading: boolean
};

type State = {
  words: Word[]
};

const wordService = new WordService();
// Wait 500ms for user input
const serch = text => wordService.getWordByEntry(text);
const serchDebounce = AwesomeDebouncePromise(serch, 500);

export default class Search extends Component<Props, State> {
  state = { words: [] };

  handleChange = async (e: SyntheticInputEvent<HTMLInputElement>) => {
    const { value } = e.target;
    try {
      const words = await serchDebounce(value);
      this.setState({ words });
    } catch (e) {
      console.error(e);
    }
  };

  render() {
    const { isLoading } = this.props;
    const { words } = this.state;
    return (
      <div id="container">
        <Input
          placeholder="Search"
          type="search"
          onChange={this.handleChange}
          disabled={isLoading}
        />
        <WordGroup words={words} limit={100} />
      </div>
    );
  }
}
