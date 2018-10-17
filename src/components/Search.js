// @flow
import React, { Component } from "react";
import AwesomeDebouncePromise from "awesome-debounce-promise";
import WordGroup from "./WordGroup";
import SearchInput from "./SearchInput";
import WordService, { type Word } from "../service/word";

type State = {
  words: Word[],
  isSearching: boolean
};

const wordService = new WordService();
// Wait 500ms for user input
const serch = text => wordService.getWordByEntry(text);
const serchDebounce = AwesomeDebouncePromise(serch, 500);

export default class Search extends Component<{}, State> {
  state = { words: [], isSearching: false };

  handleChange = async (e: SyntheticInputEvent<HTMLInputElement>) => {
    const { value } = e.target;
    if (!value) return;
    /**
     * Search Starts
     */
    this.setState({
      isSearching: true
    });
    try {
      const words = await serchDebounce(value);
      this.setState({
        words
      });
    } catch (e) {
      console.error(e);
    }
    /**
     * Search Ends
     */
    this.setState({
      isSearching: false
    });
  };

  render() {
    const { words, isSearching } = this.state;
    return (
      <div id="container">
        <SearchInput onChange={this.handleChange} isSearching={isSearching} />
        <WordGroup words={words} limit={100} />
      </div>
    );
  }
}
