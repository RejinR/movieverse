import { parse } from 'papaparse';

export const parseCSV = (file): Promise<string[][]> => {
  return new Promise((resolve, reject) => {
    parse<string[]>(file, {
      complete: function (results) {
        resolve(results.data);
      },
      error: function (err) {
        reject(err);
      },
    });
  });
};
