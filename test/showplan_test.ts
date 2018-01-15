import * as showplan from "../src/showplan";
import * as assert from "assert";

function parse(xml: string): Element {
    return new DOMParser().parseFromString(xml, 'application/xml').documentElement;
}

describe('RelOp', () => {

    it('Is created from an xml element', () => {
        let xml = '<RelOp xmlns="http://schemas.microsoft.com/sqlserver/2004/07/showplan"></RelOp>';
        let relop = new showplan.RelOp(parse(xml));
    })

    describe('label function', () => {

        it('returns @PhysicalOp', () => {
            let xml = "<RelOp xmlns='http://schemas.microsoft.com/sqlserver/2004/07/showplan' PhysicalOp='Test operation'></RelOp>";
            assert.equal('Test operation', new showplan.RelOp(parse(xml)).label());
        })
        it('returns "Columnstore Index Scan" when storage is columnstore', () => {
            let xml = `<RelOp xmlns='http://schemas.microsoft.com/sqlserver/2004/07/showplan' PhysicalOp='Test operation'>
                    <IndexScan Storage="ColumnStore" /></RelOp>`;
            assert.equal('Columnstore Index Scan', new showplan.RelOp(parse(xml)).label());
        })
        it("returns 'Key Lookup' when index kind is clustered", () => {
            let xml = `<RelOp xmlns='http://schemas.microsoft.com/sqlserver/2004/07/showplan' PhysicalOp='Test operation'>
                <IndexScan><Object IndexKind='Clustered' /></IndexScan></RelOp>`;
            assert.equal('Key Lookup', new showplan.RelOp(parse(xml)).label());
        })

    })

})