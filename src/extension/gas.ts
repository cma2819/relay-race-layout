import axios from "axios";
import { NodeCG } from "./nodecg";
import { SplitParameter } from "./lib/gas";

export const gas = (nodecg: NodeCG) => {
  const logger = new nodecg.Logger("GAS");
  if (!nodecg.bundleConfig.gas) {
    logger.warn("GAS Config is not defined.");
    return;
  }
  const gasUri = nodecg.bundleConfig.gas.uri;
  const token = nodecg.bundleConfig.gas.token;

  if (!gasUri || !token) {
    logger.warn("GAS URI or Token is not defined.");
    return;
  }
  const postSplitToGas = (param: SplitParameter) => {
    axios
      .post(gasUri, {
        token,
        teamId: param.teamId,
        runId: param.runId,
        segmentId: param.segmentId,
        formatted: param.formatted,
        raw: param.raw,
        timestamp: param.timestamp
      })
      .then(() => {
        logger.info("Post split data to GAS!");
      });
  };

  nodecg.listenFor("gas:split", postSplitToGas);
  logger.info(
    "GAS Extension is mounted, This bundle will send every split to GAS."
  );
};
