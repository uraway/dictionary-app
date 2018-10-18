// @flow
import React, { Component } from "react";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";
import FileTypeSelect from "./ui/FileTypeSelect";
import EncodingSelect from "./ui/EncodingSelect";
import type { FileType, Encoding } from "../utils/parser";

type Props = {|
  addWords: ({ blob: Blob, fileType: FileType }) => void,
  clearWords: () => Promise<void>,
  isBusy: boolean
|};

type State = {
  files: Array<Blob>,
  fileType: FileType,
  encoding: Encoding
};

export default class Options extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { files: [], fileType: "eijiro", encoding: "shift-jis" };
  }

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
    const { clearWords, isBusy } = this.props;
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
        <EncodingSelect
          onChange={value => this.handleChange("encoding", value)}
        />
        <FileTypeSelect
          onChange={value => this.handleChange("fileType", value)}
        />
        <Button
          color="info"
          disabled={files.length === 0 || isBusy}
          onClick={this.handleLoad}
        >
          LOAD
        </Button>{" "}
        <Button color="info" disabled={isBusy} onClick={clearWords}>
          DELETE
        </Button>
      </Form>
    );
  }
}
