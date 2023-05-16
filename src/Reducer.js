export const initialState = {
  basket: [],
  user: null,
};
//전체적으로 글로벌하게 주고받을 핵심 정보
export const getBasketTotal = (basket) =>
  basket.reduce((amount, item) => item.price + amount, 0);
//리듀스 함수로 합계를 구함
const reducer = (state, action) => {
  switch (action.type) {
    case "ADD_TO_BASKET":
      return {
        ...state,
        basket: [...state.basket, action.item],
      };

    case "REMOVE_FROM_BASKET":
      const index = state.basket.findIndex(
        (basketItem) => basketItem.id === action.id
      );
      let newBasket = [...state.basket];

      if (index >= 0) {
        newBasket.splice(index, 1);
      } else {
        console.warn(`${action.id}가 장바구니에 존재하지 않습니다`);
      }
      return {
        ...state,
        basket: newBasket,
      };
    case "SET_USER":
      return {
        ...state,
        user: action.user,
      };

    case "EMPTY_BASKET":
      return {
        ...state,
        basket: [],
      };
    //장바구니를 비워줌
    default:
      return state;
  }
};

export default reducer;
