import * as transform from './transform';
import { DOMParser as dom } from 'xmldom';
import { drawSvgLines } from './svgLines';
import { initTooltip } from './tooltip';
import { hasClass, findAncestor } from './utils';
import { RelOp, ShowPlan } from './showplan';

declare function require(path: string) : any;
let qpXslt = require('raw-loader!./qp.xslt');

interface Options {
    jsTooltips?: boolean
}

function showPlan(container: Element, planXml: string, options?: Options) {
    options = setDefaults(options, {
        jsTooltips: true
    });

    transform.setContentsUsingXslt(container, planXml, qpXslt);
    drawSvgLines(container);

    let xml = new DOMParser().parseFromString(planXml, "text/xml");
    container["qp-xml"] = xml;

    if (options.jsTooltips) {
        initTooltip(container);
    }
}

function getPlanXml(container: Element): XMLDocument {
    return container["qp-xml"];
}

function findContainer(node: Element) {
    let root = findAncestor(node, "qp-root");
    return root ? root.parentElement : null;
}

function findStatementId(node: HTMLElement) {
    while ((node = node.parentElement) && node && !node.dataset["statementId"]);
    return node ? node.dataset["statementId"] : null;
}

function getNodeXml(node: HTMLElement) {
    if (!hasClass(node, "qp-node")) {
        return null;
    }
    let container = findContainer(node);
    if (container == null) {
        return null;
    }
    let statementId = findStatementId(node);
    let nodeId = node.dataset["nodeId"];
    let relOp = new ShowPlan(getPlanXml(container)).getNode(statementId, nodeId);
    return {
        nodeId,
        statementId,
        relOp
    }
}

function setDefaults(options: Options, defaults: Options) {
    let ret = {};
    for (let attr in defaults) {
        if (defaults.hasOwnProperty(attr)) {
            ret[attr] = defaults[attr];
        }
    }
    for (let attr in options) {
        if (options.hasOwnProperty(attr)) {
            ret[attr] = options[attr];
        }
    }
    return ret;
}

export {
    drawSvgLines as drawLines,
    showPlan,
    getPlanXml,
    getNodeXml
}