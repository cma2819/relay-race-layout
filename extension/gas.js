"use strict";
exports.__esModule = true;
var axios_1 = require("axios");
exports.gas = function (nodecg) {
    var logger = new nodecg.Logger("GAS");
    if (!nodecg.bundleConfig.gas) {
        logger.warn("GAS Config is not defined.");
        return;
    }
    var gasUri = nodecg.bundleConfig.gas.uri;
    var token = nodecg.bundleConfig.gas.token;
    if (!gasUri || !token) {
        logger.warn("GAS URI or Token is not defined.");
        return;
    }
    var postSplitToGas = function (param) {
        axios_1["default"]
            .post(gasUri, {
            token: token,
            teamId: param.teamId,
            runId: param.runId,
            segmentId: param.segmentId,
            formatted: param.formatted,
            raw: param.raw,
            timestamp: param.timestamp
        })
            .then(function () {
            logger.info("Post split data to GAS!");
        });
    };
    nodecg.listenFor("gas:split", postSplitToGas);
    logger.info("GAS Extension is mounted, This bundle will send every split to GAS.");
};
