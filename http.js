export default class http {
    // string -> Promise jsObject
    static fetchData(url) {
        return new Promise((resolve, reject) => {
            setInterval(() => {
                resolve({weather : '10'});
            }, 1000);
            // const HTTP = new XMLHttpRequest();
            // HTTP.open('GET', url);
            // HTTP.onreadystatechange = function() {
            //     if (HTTP.readyState === XMLHttpRequest.DONE && HTTP.status === 200) {
            //         const RESPONSE_DATA = JSON.parse(HTTP.responseText);
            //         resolve(RESPONSE_DATA);
            //     } else if (HTTP.readyState === XMLHttpRequest.DONE) {
            //         reject('Something went wrong');
            //     }
            // };
            // HTTP.send();
        });
    }
}
