/*eslint-disable*/

import React, { useState, useEffect, lazy, Suspense } from 'react';
import { Navbar, Nav, NavDropdown, Container, Jumbotron, Button } from 'react-bootstrap';
import { BsFillPersonFill } from "react-icons/bs";
import { AiOutlineShopping } from "react-icons/ai";
import { Link, Route, Switch, useHistory } from 'react-router-dom';
import Data from './data.js';
let Detail = lazy(() => { return import ('./Detail.js')});
import Cart from './Cart.js'
import './App.css';
import axios from'axios';

function App() {

  let [shoes, setShoes] = useState(Data); /* 상품 데이터 */
  let [orig, setOrig] = useState([...shoes]); /* 상품 데이터 원본 */
  let [btn, setBtn] = useState(true); /* 더보기 버튼 */
  let [goods, setGoods] = useState(3); /* 상품 갯수 */
  let [count, setCount] = useState(0); /* 더보기 버튼 클릭 횟수 */
  let [fail, setFail] = useState(true); /* catch함수에 담을 내용 */
  let [stock, setStock] = useState([10,11,12,14,19,21,2,5,27]); /* 재고 데이터 */


  return (
    <div className="App">
      {/* Navbar */}
      <Navbar className="navbar" bg="light" expand="lg">
        <Container className="container">
          <Navbar.Brand href="#home" as={Link} to="/"> ShoeShop </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto left">
              <Nav.Link as={Link} to="/"> Home </Nav.Link>
              <Nav.Link as={Link} to="/detail/0">Detail </Nav.Link>
              <NavDropdown title="More" id="basic-nav-dropdown">
                <NavDropdown.Item href="#action/3.1"> New </NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2"> Sale </NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3"> Event </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action/3.4"> Recommend </NavDropdown.Item>
              </NavDropdown>
            </Nav>
            <Nav className="me-auto right">
              <Nav.Link><BsFillPersonFill className="login" size="22"/></Nav.Link>
              <Nav.Link as={Link} to="/cart"><AiOutlineShopping className="cart" size="22"/></Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* Home */}
      <Switch>
        <Route exact path="/">
          {/* 메인 비주얼 */}
          <Jumbotron className="background">
            <div className="intro">
              <h1>자유로운 움직임</h1>
              <p>
                편안한 지지력과 탁월한 반응성으로<br/>
                모든 움직임을 서포트하는 트레이닝화를 만나보세요.
              </p>
              <p><Button bsStyle="primary">Learn more</Button></p>
            </div>
          </Jumbotron>

          {/* 정렬 버튼 */}
          <div className="button_list">
            <Button variant="warning" className="sortBtn" onClick={()=>{
                  const sorted = [...shoes].sort((a,b) => {
                    return a.price - b.price
                  });
                  setShoes(sorted);
            }}>가격순정렬</Button>
                
            <Button variant="success" className="sortBtn" onClick={()=>{
                  const abc = [...shoes].sort((a,b) => {
                    if(a.title < b.title){
                      return -1
                    } else if(a.title == b.title){
                      return 0
                    } else {
                      return 1
                    }
                  });
                  setShoes(abc);
            }}>abc정렬</Button>
    
            <Button variant="danger" className="sortBtn" onClick={()=>{
                  const cba = [...shoes].sort((a,b)=>{
                    if(a.title < b.title){
                      return 1
                    } else if(a.title == b.title){
                      return 0
                    } else {
                      return -1
                    }
                  });
                  setShoes(cba);
            }}>cba정렬</Button>
    
            <Button variant="info" className="sortBtn" onClick={()=>{
                  const priceF = [...shoes].filter((a)=>{
                    return a.price <= 110000
                  });
                  setShoes(priceF);
            }}>11만원이하</Button> 
    
            <Button variant="dark" className="sortBtn" onClick={()=>{
                  setShoes(orig);
            }}>원래대로</Button>
          </div>

          {/* 상품 데이터 Card */}
          <div className="container2">
            <div className="row">
              {
                shoes.map((a, i)=>{
                  return <Card shoes={shoes[i]} stock={stock} i={i} key={i} />
                })
              }
            </div>


            {/* GET 요청으로 상품 데이터(shoes) 불러오기 
            + 클릭 수(count)에 따라 다른 경로 요청 
            + 준비된 데이터가 끝나면 더보기 버튼(btn) 없애기*/}
            { btn == true
              ? (<button className="btn btn-primary moreBtn" 
              onClick={()=>{
                setCount(count++); /* count=1이므로 if문 실행 */
                if(count === 1){
                  axios.get('https://codingapple1.github.io/shop/data2.json')
                  .then((result)=>{
                    setShoes([...shoes, ...result.data]);
                    setGoods(goods + 3); /* 1번 누르면-goods=3, 2번 누르면-goods=6 */
                  })
                  .catch(()=>{setFail(false);})
                  setCount(count++); /* count=2로 만들어 else if문 실행 */
                }else if(count === 2){
                  axios.get('https://codingapple1.github.io/shop/data3.json')
                  .then((result)=>{
                    setShoes([...shoes, ...result.data]);
                    setGoods(goods + 3);
                    if(goods >= 6){ /* goods=6이상이므로 더보기버튼 없애기 */
                      setBtn(false);
                    }
                  })
                  .catch(()=>{setFail(false);})
                }
              }}>더보기</button>)
              : null
            }

            {/* catch함수에 넣을 내용: 서버 요청 실패시 */}
            { fail == false
              ? (<div class="alert alert-success" role="alert">
                  서버를 불러오는데 실패하였습니다😢
                </div>)
              : null
            }
            </div>
        </Route>
  
        {/* Detail page */}
        <Route path="/detail/:id">
          <Suspense fallback={<div>로딩중입니다~!</div>}>
            <Detail stock={stock} setStock={setStock} shoes={shoes}/>
          </Suspense>
        </Route>

        {/* Cart page */}
        <Route path="/cart">
          <Cart></Cart>
        </Route>
      </Switch>
    </div>
  );
}

// 상품 데이터 컴포넌트
function Card(props){
  let history = useHistory();

  return (
    // 메인페이지 상품을 누르면 상세페이지로 이동
    <div className="col-md-4" onClick={()=>{history.push('/detail/'+props.shoes.id)}}>
      <img src={`https://codingapple1.github.io/shop/shoes${props.shoes.id + 1}.jpg`} width="100%" />
      <h4>{props.shoes.title}</h4>
      <p>{props.shoes.content} & {props.shoes.price}</p>
      <p>재고: {props.stock[props.i]}</p>
    </div>
  )
}


export default App;
