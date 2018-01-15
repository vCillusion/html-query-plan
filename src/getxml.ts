import { RelOp, ShowPlan } from './showplan';
import { hasClass, findAncestor } from './utils';

export function getPlanXml(container: Element): XMLDocument {
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

export function getNodeXml(node: HTMLElement) {
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