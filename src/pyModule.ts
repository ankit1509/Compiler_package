import { exec } from 'child_process';
import fs from 'fs';
import { v4 as uuid, v4 } from 'uuid'
import path from "path";


// Creating, Compiling and executing the Python file.
export const compilerPy = async(language: string, code: string, envData: any) => {

    // creating source file
    var filename = uuid()
    const temppath = './temp'
    const filepath = path.join(temppath, `${filename}.${language}`);

    //creating temp0
    fs.writeFileSync(filepath, code)

    //Compiling the code
    const command = `python ${filepath}`
    return new Promise((resolve, reject) => {
        exec(
          command,
          async(error, stdout, stderr) => {
            error && reject({ error, stderr });
            stderr && reject(stderr);
            resolve(stdout);
          }
        );
      });
}

// Creating, Compiling and executing the Python file with Input.
export const compilerPyWithInput = async(language: string, code: string, envData: any, input: any) => {

    // creating source file
    var filename = uuid()
    const temppath = './temp'
    const filepath = path.join(temppath, `${filename}.${language}`);
    const outputpath = path.join(temppath,`${filename}.out`);
    const inputfilepath = path.join(temppath,`input.txt`);

    //creating temp0
    fs.writeFileSync(filepath, code)

    //creating Input file
    fs.writeFileSync(inputfilepath, input)

    //Compiling the code
    const command = `python ${filepath} < ${inputfilepath}`
    return new Promise((resolve, reject) => {
        exec(
          command,
          async(error, stdout, stderr) => {
            error && reject({ error, stderr });
            stderr && reject(stderr);
            resolve(stdout);
          }
        );
      });
}