## shoeshop : 신발 쇼핑몰 사이트
[ 2022.04.03~2022. ]

> 리액트 강의를 들으며 만든 쇼핑몰을 처음부터 다시 만들어보며 새로운 기능도 추가하였다

### 컴포넌트 및 전체적인 UI 트리 

***

### 기능 설명
* Route로 페이지 분류(Home | Detail | Cart)

***Home***
* navbar의 메뉴를 클릭하면 해당 페이지로 이동
* '더보기'버튼 클릭시 axios로 서버에 요청한 상품 데이터 보여주기(+준비한 상품 데이터가 더이상 없을 경우 버튼 숨기기)

***Detail page***
* useHistory를 통해 뒤로가기 버튼 구현
* useEffect를 통해 Detail 페이지 방문 후 2초 후에 alert박스가 사라지는 기능
* tab 기능

***Cart page***
* redux로 장바구니용 데이터 데이터바인딩
* reducer/dispatch: 수량증감 버튼, alert창+닫기버튼
