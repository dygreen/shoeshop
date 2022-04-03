/*eslint-disable*/

import React, { useContext, useState, lazy, Suspense } from "react";
import { Navbar, Container, Nav, NavDropdown, Jumbotron, Button } from "react-bootstrap";
import "./App.css";
// import { name, name2 } from "./data.js";
import Data from "./data.js";

// import Detail from "./Detail.js";
let Detail = lazy(() => { return import('./Detail.js')});

import axios from "axios";
import Cart from "./Cart.js";

import { Link, Route, Switch, useHistory } from "react-router-dom";

// Context
export let stockcontext = React.createContext();

function App() {
  let [shoes, shoesChange] = useState(Data);
  let [stock, stockChange] = useState([10, 11, 12]);
  let [number, numberChange] = useState(3);
  let [btn, btnChange] = useState(true);
  let [count, countChange] = useState(0);
  let [fail, failChange] = useState(false);

  return (
    <div className="App">
      {/* Navbar */}
      <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Brand href="#home">ShoeShop</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as={Link} to="/">
                Home
              </Nav.Link>
              <Nav.Link as={Link} to="/detail">
                Detail
              </Nav.Link>
              <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">
                  Another action
                </NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">
                  Something
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action/3.4">
                  Separated link
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* Router 활용하여 페이지 나누기 */}
      <Switch>
        {/* Main page */}
        <Route exact path="/">
          {/* Jumbotron */}
          <Jumbotron className="background">
            <h1>20% Season Off</h1>
            <p>
              This is a simple hero unit, a simple jumbotron-style component for
              calling extra attention to featured content or information.
            </p>
            <p>
              <Button bsStyle="primary">Learn more</Button>
            </p>
          </Jumbotron>

          {/* Img */}
          <div className="container">
            <div className="row">
              {/* 반복문(Card)으로 데이터바인딩 */}

              <stockcontext.Provider value={stock}>
                {shoes.map((a, i) => {
                  return <Card shoes={shoes[i]} i={i} key={i} />;
                  {
                    /* {shoes[i]} or {a} */
                  }
                })}
              </stockcontext.Provider>

              {/* Component + props로 데이터바인딩 */}
              {/* <Card shoes={shoes[0]} />
          <Card shoes={shoes[1]} />
          <Card shoes={shoes[2]} /> */}

              {/* 기존 하드코딩 */}
              {/* <div className="col-md-4">
            <img
              src="https://codingapple1.github.io/shop/shoes1.jpg"
              width="100%"
            />
            <h4>{shoes[0].title}</h4>
            <p>
              {shoes[0].content} & {shoes[0].price}
            </p>
          </div>
          <div className="col-md-4">
            <img
              src="https://codingapple1.github.io/shop/shoes2.jpg"
              width="100%"
            />
            <h4>상품명</h4>
            <p>상품설명 & 가격</p>
          </div>
          <div className="col-md-4">
            <img
              src="https://codingapple1.github.io/shop/shoes3.jpg"
              width="100%"
            />
            <h4>상품명</h4>
            <p>상품설명 & 가격</p>
          </div> */}
            </div>

            {/* 더보기 버튼 : ajax 요청으로 가져온 데이터바인딩*/}
            {btn == true ? (
              <button
                className="btn2 btn-primary"
                onClick={() => {
                  // 서버에 데이터를 보내고 싶을 때 POST 요청법
                  // axios.post('서버 url', {id: 'dy', pw: 1234});

                  // Q2. 버튼을 1회 누르면 data2에 요청, 2회 누르면 data3에 요청
                  countChange(count++);
                  if ((count = 0)) {
                    axios
                      .get("https://codingapple1.github.io/shop/data2.json")
                      .then((result) => {
                        shoesChange([...shoes, ...result.data]); //새로운 데이터 추가
                        // Q1. 준비한 데이터가 끝나면 버튼 숨기는 기능 (6 이상이면 버튼이 사라짐)
                        numberChange(number + 3); // 준비한 데이터를 초기값으로 만들어주기(3)
                        console.log({ number });
                        if (number >= 6) {
                          btnChange(false);
                        }
                      })
                      .catch(() => {
                        failChange(true);
                      });
                  } else if ((count = 1)) {
                    axios
                      .get("https://codingapple1.github.io/shop/data3.json")
                      .then((result) => {
                        shoesChange([...shoes, ...result.data]);
                        numberChange(number + 3);
                        console.log({ number });
                        if (number >= 6) {
                          btnChange(false);
                        }
                      })
                      .catch(() => {
                        failChange(true);
                      });
                  }

                  // axios
                  //   .get("https://codingapple1.github.io/shop/data2.json")
                  //   .then((result) => {
                  //     shoesChange([...shoes, ...result.data]); //새로운 데이터 추가
                  //     // 준비한 데이터가 끝나면 버튼 숨기는 기능 (6 이상이면 버튼이 사라짐)
                  //     numberChange(number + 3); // 준비한 데이터를 초기값으로 만들어주기(3)
                  //     console.log({ number });
                  //     if (number >= 6) {
                  //       btnChange(false);
                  //     }
                  //   })
                  //   .catch();
                }}
              >
                더보기
              </button>
            ) : null}

            {fail == true ? (
              <div class="alert alert-success" role="alert">
                서버를 불러오는데 실패하였습니다😢
              </div>
            ) : null}
          </div>
        </Route>

        {/* Detail page */}
        <Route path="/detail/:id">
          <stockcontext.Provider value={stock}>
            <Suspense fallback={ <div>로딩중입니다~!</div>}>
            <Detail shoes={shoes} stock={stock} stockChange={stockChange} />
            </Suspense>
            {/* <div className="container">
            <div className="row">
              <div className="col-md-6">
                <img
                  src="https://codingapple1.github.io/shop/shoes1.jpg"
                  width="100%"
                />
              </div>
              <div className="col-md-6 mt-4">
                <h4 className="pt-5">상품명</h4>
                <p>상품설명</p>
                <p>120000원</p>
                <button className="btn btn-danger">주문하기</button>
              </div>
            </div>
          </div> */}
          </stockcontext.Provider>
        </Route>
        <Route path="/something" component={Card}></Route>

        {/* <Route path="/:id">
          <div>아무거나 적었을 때 보여주세요</div>
        </Route> */}

        <Route path="/cart">
          <Cart></Cart>
        </Route>
      </Switch>
    </div>
  );
}

function Card(props) {
  // Context
  let stock = useContext(stockcontext);
  let history = useHistory();

  return (
    // 메인페이지 상품을 누르면 각각 상세페이지로 이동(onclick)
    <div className="col-md-4" onClick={() => { history.push('/detail/' + props.shoes.id) }}>
      <img
        src={`https://codingapple1.github.io/shop/shoes${props.i + 1}.jpg`}
        width="100%"
      />
      {/* 위에서 i 라는 변수는 App이라는 부모 컴포넌트가 가지고 있는 변수이기 때문에 하위 컴포넌트에 props로 전송해주어야 갖다 쓸 수 있음 */}
      <h4>{props.shoes.title}</h4>
      <p>
        {props.shoes.content} & {props.shoes.price}
      </p>
      재고: {stock[props.i]}
    </div>
  );
}

export default App;
