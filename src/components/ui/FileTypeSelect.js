// @flow
import React from "react";
import { FormGroup, Label, Input } from "reactstrap";

type Menu = { label: string, payload: string };

const menuItems: Menu[] = [
  {
    label: "TSV",
    payload: "tsv"
  },
  {
    label: "CSV",
    payload: "csv"
  }
];

type Props = {
  onChange: (payload: string) => void
};

export default function FileTypeSelectField({ onChange }: Props) {
  const handleChange = e => {
    const { value } = e.target;
    const menuItem = menuItems.find(o => o.label === value);
    if (menuItem) {
      onChange(menuItem.payload);
    }
  };

  return (
    <FormGroup>
      <Label for="fileType">辞書データの形式</Label>
      <Input type="select" id="fileType" onChange={handleChange}>
        {menuItems.map(m => (
          <option key={m.payload}>{m.label}</option>
        ))}
      </Input>
    </FormGroup>
  );
}
