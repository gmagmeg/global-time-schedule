import { ChangeEvent as OriginChangeEvent } from "react";
import { ChangeEventHandler as OriginChangeEventHandler } from "react";

export type MinutesUnit = 15 | 30;
export type SelectChangeEvent = OriginChangeEvent<HTMLSelectElement>;
export type SelectChangeEventHandler =
  OriginChangeEventHandler<HTMLSelectElement>;
