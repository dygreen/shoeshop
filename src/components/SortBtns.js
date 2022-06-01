import React from "react";
import styled from "styled-components";
import { Button } from 'react-bootstrap';

const BtnList = styled.div`
  display: flex;
  justify-content: center;
`;


function SortBtns(props){
  return (
    <BtnList>

      {/* 가격순 정렬 */}
      <Button variant="outline-dark" className="sortBtn" 
      onClick={() => {
        const sorted = [...props.shoes].sort((a,b) => {
          return a.price - b.price
        });
        props.setShoes(sorted);
      }}>가격순정렬</Button>

      {/* abc순 정렬 */}
      <Button variant="outline-dark" className="sortBtn" 
      onClick={() => {
        const abc = [...props.shoes].sort((a,b) => {
          if(a.title < b.title){
            return -1
          } else if(a.title == b.title){
            return 0
          } else {
            return 1
          }
        });
        props.setShoes(abc);
      }}>abc정렬</Button>
    
      {/* cba순 정렬 */}
      <Button variant="outline-dark" className="sortBtn" 
      onClick={() => {
        const cba = [...props.shoes].sort((a,b) => {
          if(a.title < b.title){
            return 1
          } else if(a.title == b.title){
            return 0
          } else {
            return -1
          }
        });
        props.setShoes(cba);
      }}>cba정렬</Button>
    
      {/* 11만원이하 정렬 */}
      <Button variant="outline-dark" className="sortBtn" 
      onClick={() => {
        const priceF = [...props.shoes].filter((a)=>{
          return a.price <= 110000
        });
        props.setShoes(priceF);
      }}>11만원이하</Button> 
    
      {/* 원래대로 정렬 */}
      <Button variant="dark" className="sortBtn" 
      onClick={() => {
        props.setShoes(props.orig);
      }}>원래대로</Button>

    </BtnList>
  );
}

export default SortBtns;