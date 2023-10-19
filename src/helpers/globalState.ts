import { atom } from "jotai";

export const burgerType = atom({});
export const isNextButttonEnabled = atom(true);
export const manageOrder = atom({});
export const order = atom<Array<{}>>([]);
export const cartState = atom({});
export const burger = atom(true);
export const orders = atom(false);
export const addCatalog = atom<Array<{}>>([]);
export const orderDetails = atom("default-id");
export const selectedBurger = atom('');

