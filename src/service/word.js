// @flow
import axios from "axios";
import BaseService from "./base";
import parser, { type FileType } from "../utils/parser";

export type Word = { entry: string, meaning: string };

export default class WordService extends BaseService {
  tableName = "";

  constructor() {
    super();
    this.tableName = "words";
  }

  getWords() {
    return this.connection.select({ from: this.tableName });
  }

  addWord(word: Word) {
    return this.connection.insert({
      into: this.tableName,
      values: [word],
      return: true
    });
  }

  addWords(words: Word[]) {
    return this.connection.insert({
      into: this.tableName,
      values: words,
      return: true
    });
  }

  getWordByEntry(query: string) {
    return this.connection.select({
      from: this.tableName,
      where: {
        entry: {
          like: `%${query}%`
        }
      }
    });
  }

  clear() {
    return this.connection.clear(this.tableName);
  }

  addDefaultWords = async () => {
    const { data } = await axios.get("/ejdic-hand-utf8.txt");
    const parsedWords = parser.parse("tsv", data);
    return this.addWords(parsedWords);
  };

  addWordsFromFile = async (payload: { blob: Blob, fileType: FileType }) => {
    const { blob, fileType } = payload;
    const content = await this.getFileContent(blob);
    const parsedWords = parser.parse(fileType, content);
    return this.addWords(parsedWords);
  };

  getFileContent = (blob: Blob, encoding: "utf8" = "utf8") => {
    return new Promise<string>(resolve => {
      const reader = new FileReader();
      reader.readAsText(blob, encoding);
      reader.onload = () => {
        if (typeof reader.result !== "string") return;
        resolve(reader.result);
      };
    });
  };
}
