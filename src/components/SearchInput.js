import React from "react";
import { Tooltip, Input } from "reactstrap";

export default function SearchInput({ onChange, isSearching }) {
  return (
    <div>
      <Input
        id="input"
        type="text"
        className="form-control"
        placeholder="Search"
        onChange={onChange}
      />
      <Tooltip isOpen={isSearching} target="input" placement="bottom">
        Searching...
      </Tooltip>
    </div>
  );
}
