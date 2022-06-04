# ShoeShop-React
React를 활용해 실습 페이지 UI 보강하기(PWA 셋팅)
> React 온라인 강의를 들으며 제작했던 쇼핑몰 페이지 보강하기
> 
> [개인 프로젝트: 2022.04.09~2022.05.17]
> 
> 주소: https://dygreen.github.io
> 
***
## Site map
: 파란색=component

<img width="500" alt="스크린샷 2022-05-21 오후 9 50 48" src="https://user-images.githubusercontent.com/95523625/169652295-5c7c6c51-dd99-4382-8d76-d926c86561e2.png">


## Pages
: 총 3 페이지 (Home | Detail | Cart)
: PWA로 셋팅하여 앱처럼 볼 수 있도록 함(설치 가능)

***Home Page***
* Router를 이용해 페이지 나누기
* useState를 통해 데이터 관리
* axios get을 통해 상품 데이터 보여주기(+map 반복문으로 레이아웃 구성)
* 상품 더보기 버튼 구현(+준비된 데이터가 끝나면 버튼 없애기)
* 정렬 버튼 구현(가격순|abc순|cba순|11만원이하|원래대로) **_{SortBtns.js}_**
* 상품 이미지를 클릭하면 해당 상품 Detail page로 이동
* 재고 데이터 표시
* top menu 항목 클릭시 해당하는 컨텐츠 표시(페이지 이동/모달창)
* 로그인(모달창) 정규식 검사(이메일 형식/비밀번호 대문자 포함 체크) **_{LoginForm.js}_**

***Detail Page***
* useEffect를 활용해 페이지가 로드되면 알림창 띄우기 + 애니메이션 효과
* 주문하기 버튼 클릭시 재고가 줄어듦 + Cart page로 이동 + 장바구니 리스트에 담김(dispatch로 데이터 전송 -> redux로 상태관리)
* select box에서 선택한 사이즈 값 장바구니로 전달
* 장바구니 버튼 클릭시 장바구니 페이지 이동
* 뒤로가기 버튼(Home으로 이동)
* 탭 기능 구현(+애니메이션 효과)

***Cart Page***
* redux로 상태관리(index.js)
* 수량 변경 버튼(+수량이 음수가 되지 않도록 조절하는 기능)
* Detail Page에서 같은 상품을 주문하면 항목추가가 아닌 수량증가가 되는 기능
* 장바구니 항목 삭제 기능
* 이벤트 알림창 표시
* 페이지 뒤로가기 버튼

***
## [2022.06.01~06.05] 코드 수정 📝
* App.js 내 로그인 모달창, 정렬기능 컴포넌트로 빼서 정리
* styled-components를 이용한 스타일링
* 사진 오류뜨는 부분: 새로운 url을 만들어 해결
* Detail page에서 재고가 0개가 되면 재고없음 알림창 띄우기(props대신 Context API를 사용해 해결)
* Detail page에서 사이즈를 선택 안 하면 알림창, 선택하면 장바구니로 정보전달(Ternary operator 사용)
* 코드 가독성을 높이기 위해 일부 if문 -> switch문으로 변경
* Cart page 수량증감 버튼 동작 안 되는 부분 해결
* 컴포넌트 import할 때 lazy 함수를 사용해 초기 접속속도 개선

***
#### _* 자세한 프로젝트 실행과정 정리 (노션: https://prickle-turn-785.notion.site/ShoeShop-0056f45ce459414e94405ddc6ede7be7)_
