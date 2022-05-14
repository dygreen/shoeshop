# ShoeShop-React
React를 활용해 실습 페이지 UI 보강하기(PWA 구현)
> React 온라인 강의를 들으며 제작했던 쇼핑몰 페이지 보강하기
> 
> [2022.04.09~]

***
## Site map


## Pages
: 총 4 페이지 (Home | Detail | Cart | Login)

***Home Page***
* Router를 이용해 페이지 나누기
* useState를 통해 데이터 관리
* axios get을 통해 상품 데이터 보여주기(+map 반복문으로 레이아웃 구성)
* 상품 더보기 버튼 구현(+준비된 데이터가 끝나면 버튼 없애기)
* 정렬 버튼 구현(가격순|abc순|cba순|11만원이하|원래대로)
* 상품 이미지를 클릭하면 해당 상품 Detail page로 이동
* 재고 데이터 나타내기

***Detail Page***
* useEffect를 활용해 페이지가 로드되면 알림창 띄우기 + 애니메이션 효과
* 주문하기 버튼 클릭시 재고가 줄어듦 + Cart page로 이동 + 장바구니 리스트에 담김(dispatch로 데이터 전송 -> redux)
* redux(index.js)> 같은 상품을 주문하면 항목추가가 아닌 수량증가가 되는 기능
* 장바구니 버튼 클릭시 장바구니 페이지 이동
* 탭 기능 구현(+애니메이션 효과)

***Cart Page***
* redux로 관리
* 수량이 음수가 되지 않도록 조절하는 기능
