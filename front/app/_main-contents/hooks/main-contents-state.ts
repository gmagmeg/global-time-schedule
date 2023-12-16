/**
 * @module _main-contents
 */

import { TimeZone } from "@/library/type-date";

export type MainContentsState = {
  /**
   * タイムゾーンを表す文字列
   */
  timeZones: TimeZone[];
};

export const mainContentsState: MainContentsState = {
  timeZones: ["JST", "UTF"],
};
