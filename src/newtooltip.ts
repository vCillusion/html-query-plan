import * as showplan from "./showplan";

export function tooltipHeader(node: showplan.RelOp) {
    let div = document.createElement('div');
    div.classList.add('qp-tt-header');
    div.textContent = node.label();
    return div;
}

export function tooltip(node: showplan.RelOp) {
    let div = document.createElement("div");
    div.classList.add('qp-tt');
    div.appendChild(tooltipHeader(node));
    return div;
}