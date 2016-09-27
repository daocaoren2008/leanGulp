render('<h1>hello</h1>',document.getElementById('app'));
function render(html,dom){
    dom.innerHTML = html;
}