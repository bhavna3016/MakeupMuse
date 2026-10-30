import { lipstickData,lipLinerData } from "../CategoryData/lipData";

import { foundationData, blushData, concealerData } from "../CategoryData/face";
import {
  kajalData,
  eyelinerData,
  mascaraData,
  eyeshadowData,
} from "../CategoryData/eyedata";
import {
  cleanserData,
  moisturizerData,
  sunscreenData,
} from "../CategoryData/skin";
import { nailPolishData } from "../CategoryData/naildata";
import { comboData, makeupKitData } from "../CategoryData/gift";
import { offersData, under249Data } from "../CategoryData/offerAnd249";

export const allProducts = [
  ...lipstickData,
  ...lipLinerData,
  ...foundationData,
  ...blushData,
  ...concealerData,
  ...kajalData,
  ...eyelinerData,
  ...mascaraData,
  ...eyeshadowData,
  ...cleanserData,
  ...moisturizerData,
  ...sunscreenData,
  ...nailPolishData,
  ...comboData,
  ...makeupKitData,
  ...offersData,
  ...under249Data,
];