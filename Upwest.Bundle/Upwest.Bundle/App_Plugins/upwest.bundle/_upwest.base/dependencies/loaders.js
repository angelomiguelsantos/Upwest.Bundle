function loadCss(src) {
    var id = src.split('/').pop().replace(/[^a-zA-Z ]/g, "");
    if (!document.getElementById(id)) {
        var head = document.getElementsByTagName("head")[0];
        var s = document.createElement("link");
        s.href = src;
        s.id = id;
        s.rel = "stylesheet";
        head.appendChild(s);

    }
}



