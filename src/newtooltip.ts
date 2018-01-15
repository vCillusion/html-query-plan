import * as showplan from "./showplan";

function tooltipHeader(node: showplan.RelOp) {
    let div = document.createElement('div');
    div.className += ' qp-tt-header';
    div.textContent = node.label();
    return div;
}

function description(node: showplan.RelOp) {
    let div = document.createElement('div');
    div.textContent = node.description();
    return div;
}

export function tooltip(node: showplan.RelOp) {
    let div = document.createElement("div");
    div.className += ' qp-tt';
    div.appendChild(tooltipHeader(node));
    div.appendChild(description(node));
    return div;
}