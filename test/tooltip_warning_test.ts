import * as assert from "assert";
import * as QP from "../src/index";
import * as helper from "./helper";
import { plan } from "./plans";

describe("Tooltip Warnings Section", () => {

    it("Is missing for nodes without s:Warnings", () => {

        let container = helper.showPlan(plan.issue39);
        let tableScan = helper.findNodeById(container, "0");
        assert.equal(null, helper.getToolTipSection(tableScan, "Warnings"));

    })

    // TODO: Test when @NoJoinPredicate=true, and @NoJoinPredicate is missing
    it("Shows No Join Predicate when s:Warnings/@NoJoinPredicate=1", () => {
        
        let container = helper.showPlan(plan.issue39);
        let nestedLoops = helper.findNodeById(container, "1");
        assert.equal("No Join Predicate",
            helper.getToolTipSection(nestedLoops, "Warnings"));
        
    })
    
    it("Shows unmatched indexes", () => {

        let container = helper.showPlan(plan.unmatched_index);
        let select = helper.findStatmentElementById(container, "1");
        assert.equal("Unmatched index: [Test].[dbo].[SAMPLE_TABLE].[IX_SAMPLE_TABLE__ID_2]",
            helper.getToolTipSection(select, "Warnings"));

    })

    it("Shows ColumnsWithNoStatistics warning", () => {

        let container = helper.showPlan(plan.columns_with_no_statistics);
        let indexScan = helper.findNodeById(container, "2");
        assert.equal("Unmatched index: [mydb].[myschema].[TestTableA].TestTableB_Id",
            helper.getToolTipSection(indexScan, "Warnings"));

    })

    it("Shows SpillToTempDb warning", () => {

        let container = helper.showPlan(plan.spilltotempdb);
        let sort = helper.findNodeById(container, "2");
        assert.equal("Operator used tempdb to spill data during execution with spill level 2 and 4 spilled thread(s)",
            helper.getToolTipSection(sort, "Warnings"));

    })

})