import runSingleInstructions from "json-instruction-single";
import instructionsWithTargets from "./instructionsWithTargets/index.js";

export const runOptions = ({ base, options = {}, optionDefs = {}, showLog = false } = {}) => {
    if (!base) return base;
    const context = { base };

    if (options.showSearch && optionDefs.search) {
        const targets = instructionsWithTargets(optionDefs.search, base);
        if (showLog) console.log("[runOptions:search]", targets);
        runSingleInstructions(targets, context, showLog);
    }
    if ((options.showSerial || options.serial) && optionDefs.serial) {
        const targets = instructionsWithTargets(optionDefs.serial, base);
        if (showLog) console.log("[runOptions:serial]", targets);
        runSingleInstructions(targets, context, showLog);
    }
    if ((options.showOptions || options.options) && optionDefs.options) {
        const targets = instructionsWithTargets(optionDefs.options, base);
        if (showLog) console.log("[runOptions:options]", targets);
        runSingleInstructions(targets, context, showLog);
    }
    return base;
};

export default runOptions;
