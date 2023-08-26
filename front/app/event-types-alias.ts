/**
 * @module event-types-alias
 */

import { ChangeEvent as OriginChangeEvent, MouseEventHandler } from "react";

export type ChangeEvent = OriginChangeEvent<HTMLSelectElement>;
export type InputChangeEvent = OriginChangeEvent<HTMLInputElement>;
export type SelectChangeEvent = OriginChangeEvent<HTMLSelectElement>;
export type ClickButtonEvent = MouseEventHandler<HTMLButtonElement>;

export type RadioGroupChangeEvent = (value: string) => void;
