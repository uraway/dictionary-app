// @flow
import { DATA_TYPE, COL_OPTION, Column } from "jsstore";
import idbCon from "./idb";

export default class BaseService {
  dbName = "";

  constructor() {
    this.dbName = "words_db";
    this.initJsStore();
  }

  get connection() {
    return idbCon;
  }

  initJsStore() {
    this.connection
      .isDbExist(this.dbName)
      .then(exist => {
        if (exist) {
          this.connection.openDb(this.dbName);
        } else {
          this.connection.createDb(this.getDbSchema());
        }
      })
      .catch(err => {
        console.error(err);
      });
  }

  getDbSchema() {
    const wordsTable = {
      name: "words",
      columns: [
        new Column("id").options([
          COL_OPTION.PrimaryKey,
          COL_OPTION.AutoIncrement
        ]),
        new Column("entry")
          .options([COL_OPTION.NotNull])
          .setDataType(DATA_TYPE.String),
        new Column("meaning")
          .options([COL_OPTION.NotNull])
          .setDataType(DATA_TYPE.String)
      ]
    };

    return {
      name: this.dbName,
      tables: [wordsTable]
    };
  }
}
