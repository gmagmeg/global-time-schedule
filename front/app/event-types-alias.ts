import { ChangeEvent as OriginChangeEvent } from "react";

export type ChangeEvent = OriginChangeEvent<HTMLSelectElement>;
export type InputChangeEvent = OriginChangeEvent<HTMLInputElement>;
export type SelectChangeEvent = OriginChangeEvent<HTMLSelectElement>;

export type RadioGroupChangeEvent = (value: string) => void;
