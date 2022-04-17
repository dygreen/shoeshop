import React from 'react';
import { Table } from 'react-bootstrap';
import { connect, useSelector, useDispatch } from 'react-redux';

function Cart(props){
  // useSelector Hook 사용
  // let state = useSelector((state) => state);
  let dispatch = useDispatch();

  return(
    <div>
      <Table striped bordered hover>
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
              <button onClick={()=>{dispatch({type: 'quanUp', data: a.id})}}>+</button>
              <button onClick={()=>{dispatch({type: 'quanDown', data: a.id})}}>-</button>
            </td>
          </tr>
          )
        })}
      </Table>
      
      {/* alert창 */}
      { props.alert === true
        ? (<div className='my-alert'>
        <p>지금 구매하시면 20% 할인</p>
        <button onClick={()=>{dispatch({type: 'alertX'})}}>✕</button>
      </div>)
        : null
      }
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