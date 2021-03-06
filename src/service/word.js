// @flow
import axios from "axios";
import BaseService from "./base";
import parser, { type FileType } from "../utils/parser";

export type Word = { entry: string, meaning: string };

const defaultFilePath =
  process.env.NODE_ENV === "production"
    ? "/dictionary-app/ejdic-hand-utf8.txt"
    : "/ejdic-hand-utf8.txt";

export default class WordService extends BaseService {
  tableName = "";

  constructor() {
    super();
    this.tableName = "words";
  }

  getWords() {
    return this.connection.select({
      from: this.tableName
    });
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
      limit: 10,
      where: {
        entry: {
          like: `${query}%`
        },
        or: {
          meaning: {
            like: `${query}%`
          }
        }
      },
      order: {
        by: "entry",
        type: "asc"
      }
    });
  }

  clear() {
    return this.connection.clear(this.tableName);
  }

  addDefaultWords = async () => {
    const { data } = await axios.get(defaultFilePath);
    const parsedWords = parser.parse("tsv", data);
    return this.addWords(parsedWords);
  };

  addWordsFromFile = async (payload: { blob: Blob, fileType: FileType }) => {
    const { blob, fileType } = payload;
    const content = await this.getFileContent(blob);
    const parsedWords = parser.parse(fileType, content);
    return this.addWords(parsedWords);
  };

  getChunks = (words: Word[]): Array<Word[]> => {
    const chunks = [];
    const size = 1000;
    for (var i = 0, l = words.length; i < l; i += size) {
      const end = i + size > words.length ? words.length : i + size;
      chunks.push(words.slice(i, end));
    }
    return chunks;
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
