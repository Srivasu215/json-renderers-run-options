import runSingleInstructions from "json-instruction-single";
import instructionsWithTargets from "./instructionsWithTargets/index.js";

export const runOptions = ({
    base,
    options = {},
    optionDefs = {},
    showLog = false
} = {}) => {
    if (!base) return base;

    const context = { base };

    // 1. Search Bar Option
    if (options.showSearch && optionDefs.search) {
        const targetInstructions = instructionsWithTargets(optionDefs.search, base);
        if (showLog) console.log("[runOptions:search]", targetInstructions);
        runSingleInstructions(targetInstructions, context, showLog);
    }

    // 2. Serial Number Column Option
    if ((options.showSerial || options.serial) && optionDefs.serial) {
        const targetInstructions = instructionsWithTargets(optionDefs.serial, base);
        if (showLog) console.log("[runOptions:serial]", targetInstructions);
        runSingleInstructions(targetInstructions, context, showLog);
    }

    // 3. Row Action / Options Column Option
    if ((options.showOptions || options.options) && optionDefs.options) {
        const targetInstructions = instructionsWithTargets(optionDefs.options, base);
        if (showLog) console.log("[runOptions:options]", targetInstructions);
        runSingleInstructions(targetInstructions, context, showLog);
    }

    return base;
};

export default runOptions;
