import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import { HashRouter as Router, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import { combineReducers, createStore } from 'redux';
import { HashRouter } from 'react-router-dom';

// Cart: 장바구니 수량 변경 버튼
let shoes = [
  {id: 0, name: "White and Black", quan: 0, size: 0},
  {id: 1, name: "Red Knit", quan: 0, size: 0},
];

function reducer(state = shoes, action){
  switch (action.type){
     // add: 같은 상품을 주문하면, 항목추가x 수량증가o (findeIndex()활용)
    case 'add':
      let found = state.findIndex((a) => {return a.id === action.data.id}); 
        /* state안에 id: action.data인 것이 있으면-있는 '자리'의 값을 남김(found=0,1,2...) */
      if(found >= 0){
        let copy = [...state];
        copy[found].quan++;
        copy[found].size = action.data.size; /* size 값 나타내기 */
        return copy
      } else { /* 없으면(=> -1) 장바구니 추가 */
        let copy = [...state];
        copy.push(action.data);
        return copy
      }
    
    // quanUp: 수량증가 버튼
    case 'quanUp':
      let found2 = state.findIndex((a) => {return a.id === action.data}); 
      if(found2 >= 0){
        let copy = [...state];
        copy[found2].quan++;
        return copy
      } 

    // quanDown: 수량감소 버튼
    case 'quanDown':
      let found3 = state.findIndex((a) => {return a.id === action.data}); 
      let copy=[...state];
      if(found3 >= 0 && copy[found3].quan > 0){
        copy[found3].quan--;
        return copy
      } else {
        return copy
      }

    // deleteX: 항목 삭제 버튼
    case 'deleteX':
      let copy2 = [...state];
      let deleteV = copy2.filter((a)=>{
        return a.id !== action.data
      });
      return deleteV

    default:
      return state
  }
}


// Cart: alert창 UI
let alertTop = true;
function reducer2(state = alertTop, action){
  if (action.type === 'alertX'){
    return false
  } else {
    return state
  }
}

let store = createStore(combineReducers({reducer,reducer2}));

ReactDOM.render(
  <React.StrictMode>
    <HashRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </HashRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

serviceWorkerRegistration.register();

reportWebVitals();
