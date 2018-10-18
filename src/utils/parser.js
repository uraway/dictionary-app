// @flow
export type FileType = "eijiro" | "tsv" | "csv";
export type Encoding = "shift-jis" | "utf-8";

const parse = (type: FileType, data: string) => {
  switch (type) {
    case "eijiro":
      return data.split("\n").map<{ entry: string, meaning: string }>(row => {
        const d = row.split(" : ");
        if (d[0][0] === "■") {
          d[0] = d[0].slice(1, d[0].length);
        }
        return { entry: d[0], meaning: d[1] };
      });

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
