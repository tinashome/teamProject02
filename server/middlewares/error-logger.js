import fs from 'fs';

function errorLogger(error, req, res, next) {
  const current_datetime = new Date();

  const dateFormatted =
    current_datetime.getFullYear() +
    '-' +
    (current_datetime.getMonth() + 1) +
    '-' +
    current_datetime.getDate() +
    ' ' +
    current_datetime.getHours() +
    ':' +
    current_datetime.getMinutes() +
    ':' +
    current_datetime.getSeconds();

  const method = req.method;
  const url = req.url;
  const errorContent = error.stack;

  const errorLog = `[${dateFormatted}] ${method}:${url}\n${errorContent}\n\n`;

  fs.appendFile('error.log', errorLog, (err) => {
    if (err) {
      console.log(err);
    }
  });
  next(error);
}

export { errorLogger };
