import { CategoryItem } from '../categories/category.types';
import { CART_ACTION_TYPES, CartItem } from './cart.types';
import { createAction, withMatcher, ActionWithPayload } from '../../utils/reducer/reducer.utils';

export const addCartItem = (
  cartItems: CartItem[], 
  itemToAdd: CategoryItem
  ): CartItem[] => {
  const existingCartItem = cartItems.find(
    (cartItem) => cartItem.id === itemToAdd.id
  );

  if (existingCartItem) {
    return cartItems.map((cartItem) =>
      cartItem.id === itemToAdd.id
        ? { ...cartItem, quantity: cartItem.quantity + 1 }
        : cartItem
    );
  }

  return [...cartItems, { ...itemToAdd, quantity: 1 }];
};

export const removeCartItem = (cartItems: CartItem[], itemToRemove: CartItem): CartItem[] => {
  const existingCartItem = cartItems.find(
    (cartItem) => cartItem.id === itemToRemove.id
  );

  if (existingCartItem && existingCartItem.quantity === 1) {
    return cartItems.filter((cartItem) => cartItem.id !== itemToRemove.id);
  }

  return cartItems.map((cartItem) =>
    cartItem.id === itemToRemove.id
      ? { ...cartItem, quantity: cartItem.quantity - 1 }
      : cartItem
  );
};

export const clearCartItem = (
  cartItems: CartItem[], 
  itemToClear: CartItem
): CartItem[] => {
  return cartItems.filter((cartItem) => cartItem.id !== itemToClear.id);
};

export type SetIsCartOpen = ActionWithPayload<CART_ACTION_TYPES.SET_IS_CART_OPEN, boolean>;

export type SetCartItems = ActionWithPayload<CART_ACTION_TYPES.SET_CART_ITEMS, CartItem[]>;

export const setCartItems = withMatcher(
  (cartItems: CartItem[]): SetCartItems =>
    createAction(CART_ACTION_TYPES.SET_CART_ITEMS, cartItems)
);

export const setIsCartOpen = withMatcher((boolean: boolean): SetIsCartOpen =>
  createAction(CART_ACTION_TYPES.SET_IS_CART_OPEN, boolean));

export const addItemToCart = (cartItems: CartItem[], product: CategoryItem) => {
  const newCartItems = addCartItem(cartItems, product);
  return setCartItems(newCartItems);
};

export const removeItemFromCart = (cartItems: CartItem[], product: CartItem) => {
  const newCartItems = removeCartItem(cartItems, product);
  return setCartItems(newCartItems);
};

export const clearItemFromCart = (cartItems: CartItem[], product: CartItem) => {
  const newCartItems = clearCartItem(cartItems, product);
  return setCartItems(newCartItems);
};
