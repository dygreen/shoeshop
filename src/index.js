import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { combineReducers, createStore } from 'redux';

// Cart: 장바구니 수량 변경 버튼
let shoes = [
  {id: 0, name: "White and Black", quan: 0, size: 0},
  {id: 1, name: "Red Knit", quan: 0, size: 0},
];

function reducer(state = shoes, action){
  if(action.type === 'add'){
    // 같은 상품을 주문하면, 항목추가x 수량증가o (findeIndex()활용)
    let found = state.findIndex((a)=>{return a.id === action.data.id}); /* state안에 id: action.data인 것이 있으면-있는 '자리'의 값을 남김(found=0,1,2...) */
    if(found >= 0){
      let copy = [...state];
      copy[found].quan++;
      copy[found].size = action.data.size; /* size 값 나타내기 */
      return copy
    } else {
      let copy = [...state];
      copy.push(action.data); //'주문하기'->장바구니 추가
      return copy
    }
  } else if (action.type === 'quanUp'){
    let copy = [...state];
    copy[action.data].quan++;
    return copy
  } else if(action.type === 'quanDown'){
    let copy = [...state];
    if(copy[action.data].quan > 0){ /* 수량이 음수가 되면 감소를 멈추는 기능 */
      copy[action.data].quan--;
      return copy
    } else {
      return copy
    }
  } else if (action.type === 'deleteX'){ /* 삭제 기능 */
    let copy = [...state];
    let deleteV = copy.filter((a)=>{
      return a.id !== action.data
    });
    return deleteV
  } else {
    return state
  }
}

// Cart: alert창 UI
let alert = true;
function reducer2(state = alert, action){
  if (action.type === 'alertX'){
    return false
  } else {
    return state
  }
}

let store = createStore(combineReducers({reducer,reducer2}));

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);


reportWebVitals();
