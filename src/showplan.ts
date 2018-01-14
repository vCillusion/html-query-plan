import * as xpath from 'xpath';

function nsResolver(prefix) {
    var ns = {
        's' : 'http://schemas.microsoft.com/sqlserver/2004/07/showplan',
        'showplan' : 'http://schemas.microsoft.com/sqlserver/2004/07/showplan'
    };
    return ns[prefix] || null;
}
nsResolver["lookupNamespaceURI"] = nsResolver;

export class RelOp {
    constructor(public xml: Element) {}
    
    evaluate(expression: string): XPathResult {
        return xpath.evaluate(expression, this.xml, <any>nsResolver, 0 /* XPathResult.ANY_TYPE */, null);
    }

    label(): string {
        if (this.evaluate("boolean(s:IndexScan/@Storage='ColumnStore')").booleanValue) return "Columnstore Index Scan";
        return this.xml.attributes["PhysicalOp"].value;
    }
}

export class ShowPlan {
    constructor(public xml: XMLDocument) {}
 
    public getNode(statementId: string, nodeId: string) {
        let xml = this.xml.evaluate(
            `//showplan:*[@StatementId='${statementId}']//showplan:RelOp[@NodeId='${nodeId}']`,
            this.xml, <any>nsResolver, XPathResult.ANY_TYPE, null).iterateNext();
        return new RelOp(<Element>xml);
    }
}