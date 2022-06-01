import React, { useRef } from 'react';
import styled from "styled-components";
import { Form, Button } from 'react-bootstrap';

const BlackBlock = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.9);
  z-index: 100;
`;

function LoginForm(props){

  let modal = useRef(); /* 모달창 선택을 위함 */

  return(
    <Form>
      {/* 모달창 검정배경*/}
      <BlackBlock ref={modal} onClick={(e) => {
        if(modal.current === e.target){
          props.setLogin(true);
        }
      }}/>
      
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" placeholder="Enter email" className="user-email"/>
        <Form.Text className="text-muted">We'll never share your email with anyone else.
        </Form.Text>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Password" className="user-pw"/>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicCheckbox">
        <Form.Check type="checkbox" label="Check me out" />
      </Form.Group>

      {/* 이메일+비번(대문자) 정규식 검사 */}
      <Button variant="primary" type="submit" onClick={(e)=>{
        let inputVal = document.querySelector(".user-email").value;
        if(/\S+@\S+\.\S+/.test(inputVal) == false){
          alert("이메일 형식이 아닙니다.");
          e.preventDefault();
        }

        let pwVal = document.querySelector(".user-pw").value;
        if(/[A-Z]/.test(pwVal) == false){
          alert("비밀번호에 대문자가 1개 이상 들어가야 합니다.");
        }

      }}> Submit </Button>
    </Form>
  )
}

export default LoginForm;