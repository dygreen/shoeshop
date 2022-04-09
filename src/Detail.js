import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import './Detail.scss';

function Detail(){

  // useEffect를 활용하여 mount 끝났을 때, 재고 알림창 띄우기
  let [alert, alertChange] = useState(true);
  useEffect(() => {
    let timer = setTimeout(() => {
      alertChange(false);
    }, 2000);

    return () => { clearTimeout(timer) } /* return+함수: 컴포넌트가 사라질 때 타이머를 없애는 코드 추가 */
  }, [alert]); /* [alert]: Detail 컴포넌트가 로드될 때+alert라는 state가 변경이 될 때만 useEffect()가 실행되도록 함*/

  let history = useHistory(); /* 뒤로가기 버튼을 위한 useHistory Hook */

  return(  
    <div className="container">

      {/* 알림창 */}
      { alert === true
        ? (<div className="my-alert"><p>재고가 얼마 남지 않았습니다!</p></div>)
        : null
      }

      <div className="row">
        <div className="col-md-6">
          <img src="https://codingapple1.github.io/shop/shoes1.jpg" width="100%" />
        </div>
        <div className="col-md-6 mt-4">
          <h4 className="pt-5">상품명</h4>
          <p>상품설명</p>
          <p>120000원</p>
          <button className="btn btn-danger">주문하기</button>
          <button onClick={()=>{ history.push('/') }} className="btn btn-danger">뒤로가기</button>
        </div>
      </div>

      
    </div> 
    
    
  )
}

export default Detail