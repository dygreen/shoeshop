import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { Nav } from "react-bootstrap";
import { CSSTransition } from 'react-transition-group';
import { connect } from 'react-redux';
import './Detail.scss';


function Detail(props){

  // useEffect를 활용하여 mount 끝났을 때, 재고 알림창 띄우기
  let [alertTop, setAlertTop] = useState(true);
  useEffect(() => {
    let timer = setTimeout(() => {
      setAlertTop(false);
    }, 2000);
    return () => { clearTimeout(timer) } /* return+함수: 컴포넌트가 사라질 때 타이머를 없애는 코드 추가 */
  }, [alertTop]); /* [alertTop]: Detail 컴포넌트가 로드될 때+alertTop라는 state가 변경이 될 때만 useEffect()가 실행되도록 함*/


  let { id } = useParams(); /* useParams()=현재 URL에 적힌 모든 파라미터를 object형식으로 저장해주는 함수 */
  let 찾은상품 = props.shoes.find(function(상품){
    return 상품.id == id
  });
  // find() 활용: 현재 URL의 /:id에 적힌 값과 상품의 영구번호(상품.id)가 같은지 비교, 참이면 변수에 저장함 -> 찾은 상품이라는 변수를 이용해 데이터바인딩


  let [tab, setTab] = useState(0);
  let [tabIn, setTabIn] = useState(false); 
  let history = useHistory(); /* 뒤로가기 버튼을 위한 useHistory Hook */
  let [size, setSize] = useState(''); /* size value 저장 */
  

  // Detail 컴포넌트 로드시 투명도가 0에서 1로 서서히 증가하는 애니메이션 효과
  let [fade2, setFade2] = useState('');
  useEffect(() => {
    setFade2("end");
    return () => {
      setFade2('');
    }
  }, []);
  

  let [stock2, setStock2] = useState([...props.stock]);
  function OrderInfo(){
    let stockInfo = stock2[id];
      if(stockInfo > 0){
        
        stockInfo -= 1; /* 재고 -1 */
        console.log(stockInfo);
        let newStock2 = stock2.splice(`${찾은상품.id}`, 1, stockInfo);
        setStock2(stockInfo);
        // props.setStock([9,stockInfo, 10 ,5]);
        // props.setStock(`${props.stock[찾은상품.id]}` == stockInfo);
        // props.setStock(props.stock.splice(`${찾은상품.id}`, 1, stockInfo));
        // props.setStock(props.stock[찾은상품.id] = stockInfo); 새로운 stock을 만들자
        console.log(stock2);
        console.log(stock2[찾은상품.id]);
        props.dispatch({type:'add', data: {id: 찾은상품.id, name: 찾은상품.title, quan: 1, size: size}}); /* 상품정보 dispatch */
        history.push('/cart'); /* Cart page로 이동 */
        console.log(stock2[찾은상품.id]);
      } else if (stockInfo === 0){
        alert("재고가 없습니다😢 다른 상품은 어떠세요?");
      }
  }

  return(  
    <div className={`container detail start ${fade2}`}>

      {/* 알림창 */}
      { alertTop === true
        ? (<div className="my-alert"><p>재고가 얼마 남지 않았습니다!</p></div>)
        : null
      }

      {/* 상품 card */}
      <div className="row">
        <div className="col-md-4">
          <img src={`https://dygreen.github.io/React-study/img/shoes${찾은상품.id + 1}.jpg`} width="100%" />
        </div>
        <div className="col-md-6 mt-4">
          <h4 className="pt-5">{찾은상품.title}</h4>
          <p>{찾은상품.content}</p>
          <p>{찾은상품.price}원</p>


          {/* 재고 */}
          <Info stock2={stock2} 찾은상품={찾은상품} />


          {/* 사이즈 select box */}
          <select name="size" class="select_box" onChange={(e) => {
            let sizeValue = e.target.value;
            setSize(sizeValue);
          }}>
            <option>=== size ===</option>
            <option value="230">230</option>
            <option value="240">240</option>
            <option value="250">250</option>
            <option value="260">260</option>
            <option value="270">270</option>
          </select>


          {/* buttons */}
          <button className="btn btn-outline-dark" onClick={() => {
            // 사이즈 선택을 안하면 알림창, 하면 장바구니로 정보전달
            size == ''
            ? alert("사이즈를 선택해주세요!")
            : OrderInfo();

            
            }}>주문하기</button>
          <button onClick={() => { history.push('/cart')}} className='btn btn-outline-dark' style={{margin: '0 5px'}}>장바구니</button>
          <button onClick={() => { history.push('/') }} className="btn btn-dark">뒤로가기</button>
        </div>
      </div>


      {/* tab */}
      <Nav variant="tabs" defaultActiveKey="link-0" className="tabs">
        <Nav.Item>
          <Nav.Link eventKey="link-0" onClick={() => {setTab(0)}}>Info</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="link-1" onClick={() => {setTab(1)}}>Shipping</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="link-2" onClick={() => {setTab(2)}}>Refund</Nav.Link>
        </Nav.Item>
      </Nav>
      <CSSTransition in={tabIn} classNames="tab" timeout={500}>
        <TabContent tab={tab} setTabIn={setTabIn}/>
      </CSSTransition>
    </div> 
  );
}

// 재고 데이터 표시 Info 컴포넌트
function Info(props){
  return (
    <p>재고: {props.stock2[props.찾은상품.id]}</p>
  )
}

// 탭(tab) 기능
function TabContent({tab}){ /* {tab} => props */
  let [fade, setFade] = useState('');
  
  useEffect(() => {
    let tabTimer = setTimeout(() => {setFade("end")},100); /* 리액트의 automatic batching 기능을 고려한 setTimeout 코드 */
    return () => {
      clearTimeout(tabTimer);
      setFade('');
    }
  }, [tab]);

  return (<div className={`start ${fade} info`}>
    {[<div>상품정보 내용입니다</div>, <div>배송관련 내용입니다</div>, <div>환불약관 내용입니다</div>][tab]}
  </div>)
}

function makeProps(state){
  return {
    state : state.reducer,
    alertTop : state.reducer2
  }
}

export default React.memo(connect(makeProps)(Detail));