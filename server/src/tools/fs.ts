import * as fs from 'fs';

export namespace FileSystem {

  export async function write(path, data) {
    return new Promise((resolve, reject) => {
      fs.writeFile(path, data, 'utf8', (err) => {
        if (err) {
          return reject(err);
        }

        resolve(undefined);
      });
    });
  }

  export async function remove(path: string) {
    return new Promise((resolve, reject) => {
      fs.unlink(path, (err) => {
        if (err) {
          return reject(err);
        }

        resolve(undefined);
      });
    });
  }

  export async function open(path: string, flags) {
    return new Promise((resolve, reject) => {
      fs.open(path, flags, (err, fd) => {
        if (err) {
          return reject(err);
        }

        resolve(fd);
      });
    });
  }

  export async function exists(path: string) {
    try {
      fs.accessSync(path, fs.constants.R_OK);
      return true;
    } catch (err) {
      return false;
    }
  }

  export async function readString(path: string) {
    return new Promise((resolve, reject) => {
      fs.readFile(path, (err, data) => {
        if (err) {
          return reject(err);
        }

        resolve(data.toString());
      });
    });
  }

  export async function read(path: string) {
    return new Promise((resolve, reject) => {
      fs.readFile(path, (err, data) => {
        if (err) {
          return reject(err);
        }

        resolve(data);
      });
    });
  }
}
