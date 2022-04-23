import React from 'react';
import { Table } from 'react-bootstrap';
import { connect, useDispatch, useSelector } from 'react-redux';
import Detail from "./Detail.js";


function Cart(props) {

    let state = useSelector((state) => state)
    console.log(state.reducer);
    let dispatch = useDispatch();

    return (
    <div>
        <Table responsive>
            <tr>
                <th>#</th>
                <th>상품명</th>
                <th>수량</th>
                <th>변경</th>
            </tr>
            {state.reducer.map((a, i) => {
                return (
                <tr key={i}>
                    <td>{ a.id }</td>
                    <td>{ a.name }</td>
                    <td>{ a.quan }</td>
                    <td>
                        <button onClick={() => { dispatch({ type: 'quanUp', data : a.id })}}>+</button>
                        <button onClick={() => { dispatch({ type: 'quanDown', data: a.id })}}>-</button>
                    </td>
                </tr>
                )
            })}
        </Table>

        {/* 알림창 UI + 닫기 기능 */}
        { props.alert === true
            ? 
            (<div className="my-alert-yellow">
                <p>지금 구매하시면 신규할인 20%</p>
                <button onClick={() => { dispatch({ type: 'alertClose' })}}>닫기</button>
            </div>)
            : null
        }


    </div>
    )
}

// redux store 데이터를 가져와서 props로 변환해주는 함수 (state를 props화 시켜주는)
// function 함수명(state) { 
//     console.log(state);
//     return {
//         state : state.reducer, /* 첫 reducer에 담긴 데이터(firstval data) */
//         alert : state.reducer2 /* reducer2에 담긴 데이터(=true) */
//     }
// }

// export default connect(함수명)(Cart)

export default Cart;


