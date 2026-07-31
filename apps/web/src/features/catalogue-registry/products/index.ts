import { KNIFE_PRODUCTS } from "./knives";
import { SCISSOR_PRODUCTS } from "./scissors";
import { PUNCH_PRODUCTS } from "./punches";
import { CHISEL_PRODUCTS } from "./chisels";
import { CUTTER_PRODUCTS } from "./cutters";

export {
  KNIFE_PRODUCTS,
  SCISSOR_PRODUCTS,
  PUNCH_PRODUCTS,
  CHISEL_PRODUCTS,
  CUTTER_PRODUCTS
};

export const CATALOGUE_PRODUCTS = [
  ...KNIFE_PRODUCTS,
  ...SCISSOR_PRODUCTS,
  ...PUNCH_PRODUCTS,
  ...CHISEL_PRODUCTS,
  ...CUTTER_PRODUCTS
] as const;
