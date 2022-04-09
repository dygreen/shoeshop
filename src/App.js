/*eslint-disable*/

import React, { useState, useEffect } from 'react';
import { Navbar, Nav, NavDropdown, Container, Jumbotron, Button } from 'react-bootstrap';
import { BsFillPersonFill } from "react-icons/bs";
import { AiOutlineShopping } from "react-icons/ai";
import { Link, Route, Switch } from 'react-router-dom';
import Detail from './Detail.js';
import './App.css';
import axios from'axios';


function App() {
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
              <Nav.Link as={Link} to="/detail">Detail </Nav.Link>
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
        </Route>
  
        {/* Detail page */}
        <Route path="/detail/:id">
          <Detail />
        </Route>
      </Switch>

      <div className="container">
        <div className="row">
          <div className="col-md-4">
            <img src="https://codingapple1.github.io/shop/shoes1.jpg" width="100%" />
            <h4>상품명</h4>
            <p>상품정보</p>
          </div>
          <div className="col-md-4">
            <img src="https://codingapple1.github.io/shop/shoes2.jpg" width="100%" />
            <h4>상품명</h4>
            <p>상품정보</p>
          </div>
          <div className="col-md-4">
            <img src="https://codingapple1.github.io/shop/shoes3.jpg" width="100%" />
            <h4>상품명</h4>
            <p>상품정보</p>
          </div>
        </div>
      </div>
      <button className="btn btn-primary">더보기</button>
    </div>
  );
}

export default App;
