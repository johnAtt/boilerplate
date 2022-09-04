/* eslint-disable prefer-promise-reject-errors */
/* eslint-disable no-await-in-loop */
import { exec, execFile } from 'child_process';

const fs = require('fs');
const { promisify } = require('util');

const readdir = promisify(fs.readdir);

export namespace Shell {

  export async function clearDir(path) {
    const files = await readdir(path);
    const command = 'rm';

    for (const file of files) {
      const args = ['-rf', `${path}/${file}`];

      await executeFile(command, args);
    }
  }

  export async function execute(command: string) {
    return new Promise((resolve, reject) => {
      exec(command, (error, stdout, stderr) => {
        if (error) {
          reject({ error, stderr });
        }

        resolve(stdout);
      });
    });
  }

  export async function executeFile(command: string, args: string[] = []) {
    return new Promise((resolve, reject) => {
      execFile(command, args, (error, stdout, stderr) => {
        if (error) {
          reject({ error, stderr });
        }

        resolve(stdout);
      });
    });
  }
}
