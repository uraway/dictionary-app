// @flow
import React from "react";
import { Tooltip, Input } from "reactstrap";

type Props = {
  onChange: (SyntheticInputEvent<HTMLInputElement>) => Promise<void>,
  isSearching: boolean,
  disabled: boolean
};

export default function SearchInput({
  onChange,
  isSearching,
  disabled
}: Props) {
  return (
    <div>
      <Input
        id="input"
        type="text"
        className="form-control"
        placeholder="英和・和英検索"
        onChange={onChange}
        disabled={disabled}
      />
      <Tooltip isOpen={isSearching} target="input" placement="bottom">
        Searching...
      </Tooltip>
    </div>
  );
}
