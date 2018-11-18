import parser from "./parser";

const expected = [
  { entry: "A", meaning: "アルファベットのA" },
  { entry: "B", meaning: "アルファベットのB" }
];

it("should parse EIJIRO file", () => {
  const data = "■A : アルファベットのA\n■B : アルファベットのB";
  const parsedContent = parser.parse("eijiro", data);
  expect(parsedContent).toEqual(expected);
});

it("should parse TSV file", () => {
  const data = "A\tアルファベットのA\nB\tアルファベットのB";
  const parsedContent = parser.parse("tsv", data);
  expect(parsedContent).toEqual(expected);
});

it("should parse CSV file", () => {
  const data = "A,アルファベットのA,\nB,アルファベットのB";
  const parsedContent = parser.parse("csv", data);
  expect(parsedContent).toEqual(expected);
});
