// @flow
export type FileType = "tsv" | "csv";

const parse = (type: FileType, data: string) => {
  switch (type) {
    case "tsv":
      return data.split("\n").map<{ entry: string, meaning: string }>(row => {
        const d = row.split("\t");
        return { entry: d[0], meaning: d[1] };
      });

    case "csv":
      return data.split("\n").map<{ entry: string, meaning: string }>(row => {
        const d = row.split(",");
        return { entry: d[0], meaning: d[1] };
      });

    default:
      throw new Error("Parse Type Invalid");
  }
};

export default { parse };
