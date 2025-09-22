import { Importer } from '../../service/importer.js';
import fs from 'fs';
import { parse } from 'csv-parse/sync';
import { jest } from '@jest/globals';

describe('Importer', () => {
  let importer;

  beforeEach(() => {
    importer = new Importer();
    jest.restoreAllMocks();
  });

  test('parses CSV files correctly', async () => {
    const csv = 'id,name\n1,Test\n2,Test2';
    jest.spyOn(fs, 'existsSync').mockReturnValue(true);
    jest.spyOn(fs, 'readFileSync').mockReturnValue(csv);

    const result = await importer.fromCSV(['some.csv']);

    const expected = parse(csv, { columns: true, skip_empty_lines: true });

    expect(Array.isArray(result)).toBe(true);
    expect(result).toHaveLength(1);
    expect(result[0]).toEqual(expected);
  });

  test('throws synchronously for empty path', () => {
    expect(() => importer.fromCSV(['   '])).toThrow('Invalid file path');
  });

    test('throws synchronously for non existent path', () => {
    const inputPath = '/foo'
    expect(() => importer.fromCSV([inputPath])).toThrow(`${inputPath} does not exist`);
  });
});