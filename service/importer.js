import { parse } from "csv-parse/sync";
import fs from "fs";
import path from "path";

export class Importer {
  /**
   *
   * @param {string[]} paths
   */
  fromCSV(paths) {
    paths.forEach(this.#validatePath);
    return Promise.all(paths.map(this.#importCSVFromPathStream));
  }

  /**
   *
   * @param {string} csvPath Valid path to CSV file
   * @returns ReadStream
   */
  #importCSVFromPathStream(csvPath) {
    return parse(fs.readFileSync(csvPath), { columns: true, skip_empty_lines: true });
  }

  /**
   *
   * @param {string} inputPath
   */
  #validatePath(inputPath) {
    if (inputPath.trim() === "") {
      throw new Error("Invalid file path");
    }

    const normalized = path.normalize(inputPath);

    if (!fs.existsSync(normalized)) {
      throw `${inputPath} does not exist`;
    }

    return;
  }
}
