var form_id_js = "subscribe_form";
var result_id = "subscribe_result";

var data_js = {
    "access_token": "ztx1kd5wiv9mgqufxnrtkj35"
};

function js_onSuccess() {
    var message = "Thank you! We will be in touch shortly.";
    var color = "text-white";
    js_onResult(message, color, "Subscribed.");
}

function js_onError(error) {
  var message = "There was a problem. Please try again.";
  var color = "text-danger";
  js_onResult(message, color, "Subscribe");
  document.getElementById("subscribe_button").disabled=false;
}

function js_onResult(message, color, button_text) {
  var resultDom = document.getElementById(result_id);
  resultDom.appendChild(document.createTextNode(message));
  resultDom.className += " " + color;
  document.getElementById("subscribe_button").textContent = button_text;
}

var sendButton = document.getElementById("subscribe_button");

function js_send() {
    sendButton.value='Submitting…';
    sendButton.textContent='Submitting…';
    sendButton.disabled=true;
    var request = new XMLHttpRequest();
    request.onreadystatechange = function() {
        if (request.readyState == 4 && request.status == 200) {
            js_onSuccess();
        } else
        if(request.readyState == 4) {
            js_onError(request.response);
        }
    };

    var subject = 'Provenire: Someone has sent you their email address.';
    var message = 'Email address: ' + document.querySelector("#" + form_id_js + " [type='email']").value;
    data_js['subject'] = subject;
    data_js['text'] = message;
    var params = toParams(data_js);

    request.open("POST", "https://postmail.invotes.com/send", true);
    request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

    request.send(params);

    return false;
}

sendButton.onclick = js_send;

function toParams(data_js) {
    var form_data = [];
    for ( var key in data_js ) {
        form_data.push(encodeURIComponent(key) + "=" + encodeURIComponent(data_js[key]));
    }

    return form_data.join("&");
}

var js_form = document.getElementById(form_id_js);
js_form.addEventListener("submit", function (e) {
    e.preventDefault();
});
