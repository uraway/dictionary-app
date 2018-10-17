// @flow
export type FileType = "tsv" | "csv";

const parse = (type: FileType, data: string) => {
  switch (type) {
    case "tsv":
      const result = [];
      data.split("\n").forEach((row, idx) => {
        const d = row.split("\t");
        result.push({ entry: d[0], meaning: d[1] });
      });
      return result;

    default:
      throw new Error("Parse Type Invalid");
  }
};

export default { parse };
