import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

import { BrowserRouter } from "react-router-dom";
import { Provider } from 'react-redux';
import { combineReducers, createStore } from 'redux';


// let store = createStore(() => { return [
  //  { id: 0, name: '멋진 신발', quan: 2 },
  //  { id: 1, name: '검정 신발', quan: 1 },
  //  { id: 2, name: '흰 신발', quan: 5 },
  //  { id: 3, name: '초록 신발', quan: 7 }]  
  // });


  // Cart 페이지: alert창 초기값 저장
  let alertFirstVal = true;


  // alert 수정 함수
  function reducer2(state = alertFirstVal, action) {
    if (action.type === 'alertClose') {
      state = false;
      return state;
    } else {
      return state
    }
  }

  
  // Cart 페이지: 장바구니 상품 초기값
  let firstVal = [
     { id: 0, name: '멋진 신발', quan: 2 },
     { id: 1, name: '검정 신발', quan: 1 },
     { id: 2, name: '흰 신발', quan: 5 },
     { id: 3, name: '초록 신발', quan: 7 }
    ];
  
// redux 수정 함수 : 수량 증가
function reducer(state = firstVal, action) {
  // detail페이지에 주문하기 버튼을 누르면 firstVal에 상품 데이터 항목 하나 추가됨
    if ( action.type === 'listAdd') {
      let found = state.findIndex( (a) => { return a.id === action.payload.id });
      
      if ( found >= 0 ){
        let copy = [...firstVal];
        copy[found].quan++;
      } else {
        let copy = [...firstVal];
        copy.push(action.payload);
        return copy;
      }
    } else if ( action.type === 'quanUp' ) {
      let copy = [...firstVal];
      copy[action.data].quan++;
      return copy
    } else if ( action.type === 'quanDown' ){
      let copy = [...firstVal];
      if ( copy[action.data].quan > 0 ){
        copy[action.data].quan--;
        return copy
      } else {
        return copy /* 수량이 음수가 되면 감소 기능을 멈추는 조건문 */
      }
    } else {
      return state;
    }
}//

let store = createStore(combineReducers({reducer, reducer2}));




ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <App /> 
      </Provider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
