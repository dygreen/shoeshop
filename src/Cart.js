import React from 'react';
import { Table, Button } from 'react-bootstrap';
import { useHistory, useParams } from 'react-router-dom';
import './App.css';
import './Detail.scss';
import { connect, useSelector, useDispatch } from 'react-redux';

function Cart(props){
  // useSelector Hook 사용
  // let state = useSelector((state) => state);
  let dispatch = useDispatch();
  let history = useHistory();

  return(
    <div>
      <Table striped bordered hover className='table'>
        <h1>도연님의 장바구니</h1>
        <tr>
          <th>#</th>
          <th>상품명</th>
          <th>수량</th>
          <th>변경</th>
        </tr>
        { props.state.map((a,i)=>{
          return (
          <tr key={i}>
            <td>{a.id}</td>
            <td>{a.name}</td>
            <td>{a.quan}</td>
            <td>
              <Button variant="outline-success" onClick={()=>{dispatch({type: 'quanUp', data: a.id})}}>+</Button>
              <Button variant="outline-success" onClick={()=>{dispatch({type: 'quanDown', data: a.id})}}>-</Button>
            </td>
          </tr>
          )
        })}
      </Table>
      
      {/* alert창 */}
      { props.alert === true
        ? (<div className='my-alert'>
        <p>지금 구매하시면 20% 할인</p>
        <Button variant="primary" onClick={()=>{dispatch({type: 'alertX'})}}>✕</Button>
        </div>)
        : null
      }

      <button onClick={()=>{ history.goBack(); }} className="btn btn-dark btn-cart">뒤로가기</button>
    </div>
  )
}

// redux_ store(index.js)에 있는 state를 props로 만들어주는 함수
function makeProps(state){
  return {
    state : state.reducer,
    alert : state.reducer2
  }
}

export default connect(makeProps)(Cart);

// export default Cart;