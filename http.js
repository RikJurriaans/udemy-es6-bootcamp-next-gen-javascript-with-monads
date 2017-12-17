import Task from './vendor/data.task.umd.min.js';

export const GETRequest = url =>
      new Task((rej, res) => {
          const HTTP = new XMLHttpRequest();
          HTTP.open('GET', url);
          HTTP.onreadystatechange = () =>
              (HTTP.readyState == XMLHttpRequest.DONE && HTTP.status == 200) ?
              res(JSON.parse(HTTP.responseText)) :
              rej(HTTP.status);
          HTTP.send();
      });
