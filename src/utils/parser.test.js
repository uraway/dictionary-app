import parser from "./parser";

it("should parse TSV file", () => {
  const data = "A	アルファベットのA";
  const parsedContent = parser.parse("tsv", data);
  expect(parsedContent).toEqual([{ entry: "A", meaning: "アルファベットのA" }]);
});
