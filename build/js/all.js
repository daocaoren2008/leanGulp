"use strict";

var render = function render(html, dom) {
    dom.innerHTML = html;
};
'use strict';

render('<h1>hello</h1>', document.getElementById('app'));