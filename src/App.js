/*eslint-disable*/

import React, { useState, useEffect } from 'react';
import { Navbar, Nav, NavDropdown, Container, Jumbotron, Button } from 'react-bootstrap';
import { BsFillPersonFill } from "react-icons/bs";
import { AiOutlineShopping } from "react-icons/ai";
import { Link, Route, Switch } from 'react-router-dom';
import Data from './data.js';
import Detail from './Detail.js';
import './App.css';
import axios from'axios';


function App() {

  let [shoes, setShoes] = useState(Data); /* 상품 데이터 */
  let [btn, setBtn] = useState(true); /* 더보기 버튼 */
  let [goods, setGoods] = useState(3); /* 상품 갯수 */
  let [count, setCount] = useState(0); /* 더보기 버튼 클릭 횟수 */
  let [fail, setFail] = useState(true); /* catch함수에 담을 내용 */

  return (
    <div className="App">
      {/* Navbar */}
      <Navbar className="navbar" bg="light" expand="lg">
        <Container className="container">
          <Navbar.Brand href="#home"> ShoeShop </Navbar.Brand>
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
              <Nav.Link><AiOutlineShopping className="cart" size="22"/></Nav.Link>
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

          {/* 상품 데이터 Card */}
          <div className="container2">
            <div className="row">
              {
                shoes.map((a, i)=>{
                  return <Card shoes={shoes[i]} i={i} key={i} />
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
          <Detail />
        </Route>
      </Switch>
    </div>
  );
}

// 상품 데이터 컴포넌트
function Card(props){
  return (
    <div className="col-md-4">
      <img src={ "https://codingapple1.github.io/shop/shoes" + (props.i+1) + ".jpg"} width="100%" />
      <h4>{props.shoes.title}</h4>
      <p>{props.shoes.content} & {props.shoes.price}</p>
    </div>
  )
}


export default App;
