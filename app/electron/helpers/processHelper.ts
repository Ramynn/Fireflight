import {exec as defaultExec} from 'child_process';

export namespace processHelper {
  export const exec = (command: string): Promise<string> => {
    return new Promise((resolve, reject) => {
      defaultExec(command, (error, stdout, stderr) => {
        if (error) {
          reject(error);
        }
        resolve(stdout ? stdout : stderr);
      });
    });
  };
}
