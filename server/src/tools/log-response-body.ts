export namespace Middlewares {
  export function responseBody(req, res, next) {
    const oldWrite = res.write;
    const oldEnd = res.end;

    const chunks = [];

    res.write = function responseWrite(chunk) {
      if (chunk instanceof Buffer) {
        chunks.push(chunk);
      }

      oldWrite.apply(res, arguments);
    };

    res.end = function responseEnd(chunk) {
      if (chunk instanceof Buffer) {
        chunks.push(chunk);
      }

      if (chunks.length) {
        const body = Buffer.concat(chunks).toString('utf8');

        if (body) {
          try {
            res.body = JSON.parse(body);
          } catch (err) {
            console.log('Response body is not parsable. Skipping...');
          }
        }
      }

      oldEnd.apply(res, arguments);
    };

    next();
  }
}
