import { Request, Response } from 'express';
import * as path from 'path';

export namespace StaticCtrl {
  export function handleRoot(req: Request, res: Response) {
    const staticPath = path.join(__dirname, '../../client/dist/index.html');

    console.log(`handle root. path : ${staticPath}`);
    res.sendFile(staticPath);
  }
}
