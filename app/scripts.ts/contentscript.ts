//http://stackoverflow.com/questions/9515704/building-a-chrome-extension-inject-code-in-a-page-using-a-content-script/9517879#9517879

var s = document.createElement('script');
s.type = "text/javascript";
s.text = GetSource("scripts/vendor/jquery.min.js");
s.onload = function() {
    this.parentNode.removeChild(this);
};
(document.head||document.documentElement).appendChild(s);

var s = document.createElement('script');
s.type = "text/javascript";
s.text = GetSource("scripts/injectionscript.js");
s.onload = function() {
    this.parentNode.removeChild(this);
};
(document.head||document.documentElement).appendChild(s);

function GetSource(chromePath) {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("GET", chrome.extension.getURL(chromePath), false);
    xmlhttp.send();

    return xmlhttp.responseText;
}