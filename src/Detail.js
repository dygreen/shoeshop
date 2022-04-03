import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import styled from "styled-components";
import "./App.css";
import "./Detail.scss";
import { stockcontext } from "./App.js";
import { Nav } from "react-bootstrap";
import { CSSTransition } from "react-transition-group";
import { connect } from "react-redux";

// styled-components
let 박스 = styled.div`
  padding: 20px;
`;

let 제목 = styled.h4`
  font-size: 25px;
  color: ${(props) => props.색상};
`; // 비슷한 형태를 가진 UI가 여러개 필요할 때 props 문법 사용

function Detail(props) {
  // Detail 페이지 방문 후 alert창이 2초 후에 사라지는 기능
  let [alert, alertChange] = useState(true);
  let [inputData, inputDataChange] = useState("");
  // Context
  let stock = useContext(stockcontext);
  //  Tab
  let [tab, tabChange] = useState(0);
  let [onOff, onOffChange] = useState(false);

  // Detail 로드시 ajax로 데이터를 가져오고 싶다면
  // useEffect(() => {
  //   axios.get()
  //   let Timer~
  // })

  useEffect(() => {
    let Timer = setTimeout(() => {
      {
        alertChange(false);
      }
    }, 2000);
    console.log("hello");
    return () => {
      clearTimeout(Timer);
    };
  }, []); // 조건이 빈칸이면 <Detail> 등장시 한번 실행하고 끝남



  let { id } = useParams();



  // 최근 본 상품 데이터 저장하기
  useEffect(() => {
    // detail 페이지 접속하면 localStorage 데이터 꺼내기 & parse
    let arr = localStorage.getItem('watched');
    if( arr == null ){
      arr = []
    } else {
      arr = JSON.parse(arr);
    }

    // 현재 상품 번호 추가 + 중복 제거하기
    arr.push(id);
    arr = new Set(arr); /* Set 자료형은 어레이랑 똑같은데 중복을 자동으로 제거해줌 */
    arr = [...arr]; /* Set으로 변환했다가 다시 []로 변환하는 코드 */
    localStorage.setItem('watched', JSON.stringify(arr));
  }, []);




  let findProduct = props.shoes.find((product) => {
    return product.id == id;
  });
  let history = useHistory();

  return (
    <div className="container">
      <박스>
        <제목 className="red" /*색상="blue"*/>Detail</제목>
      </박스>

      {/* useEffect는 업데이트될 때마다 계속 실행됨 - 직접 살펴보기 */}
      {/* {inputData}
      <input
        onChange={(e) => {
          inputDataChange(e.target.value);
        }}
      /> */}

      {alert == true ? (
        <div className="my-alert-yellow">
          <p>재고가 얼마 남지 않았습니다</p>
        </div>
      ) : null}

      <div className="row">
        <div className="col-md-6">
          <img
            src={`https://codingapple1.github.io/shop/shoes${
              findProduct.id + 1
            }.jpg`}
            width="100%"
          />
        </div>
        <div className="col-md-6 mt-4">
          {/* 확장성 있는 */}
          <h4 className="pt-5">{findProduct.title}</h4>
          <p>{findProduct.content}</p>
          <p>{findProduct.price}원</p>
          {/* 기존 */}
          {/* <h4 className="pt-5">{props.shoes[id].title}</h4>
          <p>{props.shoes[id].content}</p>
          <p>{props.shoes[id].price}</p> */}
          <Info stock={props.stock} />

          {/* 주문하기 버튼을 누르면 재고가 1개 줄어드는 */}
          {/* + 장바구니에 제품정보가 추가되는 */}
          <button
            className="btn btn-danger"
            id="orderBtn"
            onClick={() => {
              props.stockChange([9, 11, 12]);
              props.dispatch({type: 'listAdd', payload: {id: findProduct.id, name: findProduct.title, quan: 1}});
              history.push('/cart');
            }}>주문하기</button>
          <button
            className="btn btn-danger"
            onClick={() => {
              history.goBack();
            }}
          >
            뒤로가기
          </button>
        </div>
      </div>

      {/* Tab 기능 */}
      <Nav className="mt-5" variant="tabs" defaultActiveKey="link-0">
        <Nav.Item>
          <Nav.Link eventKey="link-0" onClick={() => { onOffChange(false); tabChange(0); }}>
            Info
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="link-1" onClick={() => { onOffChange(false); tabChange(1); }}>
            Shipping
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="link-2" onClick={() => { onOffChange(false); tabChange(2); }}>
            Refund
          </Nav.Link>
        </Nav.Item>
      </Nav>

      <CSSTransition in={onOff} classNames="wow" timeout={500}>
        <TabContent tab={tab} onOffChange={onOffChange} />
      </CSSTransition>
    </div>
  );
}

function Info(props) {
  return <p> 재고: {props.stock[0]} </p>;
}

function TabContent(props) {
  useEffect(() => {
    props.onOffChange(true); /* 탭 내용 컴포넌트가 로드될 때 true */
  });

  if (props.tab === 0) {
    return <div>상품정보 내용입니다</div>;
  } else if (props.tab === 1) {
    return <div>배송관련 내용입니다</div>;
  } else {
    return <div>환불약관 내용입니다</div>;
  }

  
  // enum으로 경우에 따라 tab(상품정보/배송정보/환불약관) 내용 보여주기
  var now = 'info';
  return(
    <div>
      {
        {
          info : <p>상품정보</p>,
          shipping : <p>배송관련</p>,
          refund : <p>환불약관</p>
        }[now]
      }
    </div>
  )
}



function 함수명(state) { 
  console.log(state);
  return {
      state : state.reducer, 
      alert : state.reducer2 
  }
}

export default connect(함수명)(Detail)
