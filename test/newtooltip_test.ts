import * as assert from 'assert';
import * as tt from '../src/newtooltip';
import { RelOp } from '../src/showplan';

describe("tooltip", () => {
    
    it("Has the .qp-tt class", () => {
        let relop = {
            label: () => "Test label",
            description: () => ""
        };
        let html = tt.tooltip(<RelOp>relop);
        assert.equal(" qp-tt", html.className);
    })

    it("Shows the node label in the header", () => {
        let relop = {
            label: () => "Test label",
            description: () => ""
        };
        let html = tt.tooltip(<RelOp>relop);
        let header = html.querySelector(".qp-tt-header");
        assert.equal("Test label", header.textContent);
    })

    it("Shows the description below the header", () => {
        let relop = {
            label: () => "Test label",
            description: () => "Test description"
        };
        let html = tt.tooltip(<RelOp>relop);
        assert.equal("Test description", html.children[1].textContent);
    })

})