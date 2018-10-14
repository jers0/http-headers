chrome.webRequest.onBeforeSendHeaders.addListener(function headers(details) {

	var xmlhttp = new XMLHttpRequest();
	xmlhttp.open("POST", "http://localhost:3001/send-headers");
	xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
	xmlhttp.send(JSON.stringify(details));

}, {
	urls: ['<all_urls>'],
	types: ['main_frame']
}, ['requestHeaders', 'blocking']);