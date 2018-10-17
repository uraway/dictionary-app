// @flow
import React, { Component } from "react";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";
import FileTypeSelect from "./ui/FileTypeSelect";
import { alert, confirm } from "../utils";
import WordService from "../service/word";
import type { FileType } from "../utils/parser";

const wordService = new WordService();

type Props = {
  addWords: ({ blob: Blob, fileType: FileType }) => Promise<void>
};

type State = {
  files: Array<Blob>,
  fileType: FileType
};

export default class Options extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { files: [], fileType: "tsv" };
  }

  handleDelete = async () => {
    const isConfirmed = await confirm({
      title: "辞書データの削除",
      content: "登録した辞書データをすべて削除します。よろしいですか？"
    });

    if (!isConfirmed) return;

    try {
      await wordService.clear();
    } catch (e) {
      alert({
        title: "エラー",
        content: e.message
      });
    }
    alert({
      title: "辞書データの削除",
      content: "辞書データの削除に成功しました"
    });
  };

  handleLoad = () => {
    const { addWords } = this.props;
    const { files, fileType } = this.state;
    addWords({
      blob: files[0],
      fileType
    });
  };

  handleChange = (key: $Keys<State>, value: any) => {
    this.setState({ [key]: value });
  };

  render() {
    const { files } = this.state;
    return (
      <Form id="container">
        <FormGroup>
          <Label for="file">辞書データファイル</Label>
          <Input
            type="file"
            id="file"
            onChange={e => this.handleChange("files", e.target.files)}
          />
        </FormGroup>
        <FileTypeSelect
          onChange={value => this.handleChange("fileType", value)}
        />
        <Button
          color="info"
          disabled={files.length === 0}
          onClick={this.handleLoad}
        >
          LOAD
        </Button>{" "}
        <Button color="info" onClick={this.handleDelete}>
          DELETE
        </Button>
      </Form>
    );
  }
}
