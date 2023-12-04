import React, {useState} from 'react';
// import logo from './logo.svg';
import './App.css';
/*
 * 리액트 기초
 */ 



function App() {
  /* 
   * 데이터 보관방법
   * 1. 일반 변수에 저장
   * 2. React의 고유 state를 사용
   * 수정
   */
  

  /*
   * ES6 destructuring 문법 
   * 예 : var [a,b] = [10.100];
   * array, object에 있던 자료를 변수에 쉽게 담고 싶을때 사용
   * ========================================================
   * state 사용시의 장점 웹이 App처럼 동작하게 만들수 있음
   * 데이터 변경시 새로고침 없이도 HTML(웹)이 자동으로 재 랜더링 됨
   * 자주 바뀌고 중요한 데이터는 state 형식으로 데이터를 저장 할 것
   * ========================================================
   * useState 작성시 [a,b] 형식 데이터 생성 
   * a: useState 함수 내부에 작성한 값 이 들어감, b: 해당(a) 데이터를 수정활 함수가 들어감 
   */
  let [title,titleChg] = useState(['힘의 균형','여자코트 추천','강남의 우동맛집']); 
  let [date, dateChg] = useState(['2월 17일 발행','2월 18일 발행','2월 19일 발행']);
  let [cntnt,cntntChg] = useState(['내용1','내용2','내용3']);
  
  let [dataList,dataListChg] = useState([{title:'힘의 균형',date:'2월 17일 발행',cntnt:'내용1'}
                                        ,{title:'여자코트 추천',date:'2월 18일 발행',cntnt:'내용2'}
                                        ,{title:'강남의 우동맛집',date:'2월 19일 발행',cntnt:'내용3'}])
  let [like,likeChg] = useState(0);

  let [modalObject,modalChg] = useState({title:"모달 제목",date:"모달 날짜",cntnt:"모달 상세내용"});

  function changeModal(){
    let newObject=JSON.parse(JSON.stringify(modalObject));
    newObject.title = dataList[0].title;
    newObject.date = dataList[0].date;
    newObject.cntnt = dataList[0].cntnt;
    showModal(newObject);
  }

  function showModal(newObject){
    modalChg(newObject);
  }

  function chgTitle(){
    /* <state 배열 데이터 수정 테크닉 (권장)>
       * state 변경 함수 사용시 state에 정의된 배열과 똑같은 배열만 변경해야함
       * state 배열은 직접 건드리면 안됨
       * 배열 데이터의 복사본을 생성해서 복사본을 수정하여 state변경 함수에 복사 데이터 변경  
       * 복사 시 Deep Copy를 해야지만 복사 가능
        - 깊은 복사(Deep Copy) : 서로 독립적인 값을 가지는 복사
          = 배열 사용 예 : var newArray = [...state명];
          = 객체 사용 예 : var newObject = JSON.parse(JSON.stringify(state명));
        -얕은 복사(Sallow Copy) : 
          = 객체 사용 예 : var newObject = Object.assign({},state명);
        - 오류의 예1 : title[0] = '변경값';
          = 재 랜더링 되지 않음
        - 오류의 예2 : var newArray = title;
          = 복사가 아닌 값 공유 방식이므로 변경되지 않음

      * 리액트 대 원칙 : immutable date(원 데이터가 수정되면 안된다)
    */

    var newList = [...dataList];
    if(newList[1].title.includes('남자')){
      newList[1].title = '여자코트 추천';
      newList[1].date = '2월 18일 발행';
    }else{
      newList[1].title = '남자코트 추천';
      newList[1].date = '2월 16일 발행';
    }
    dataListChg(newList);
    
    var newTitle = [...title]; // [...state명]를 사용하여 DeepCopy (ES6 신문법 사용)
    newTitle[1] = '남자코트 추천';
    titleChg(newTitle);

    var newDate = [...date];
    newDate[1] = '2월 16일 발행';
    dateChg(newDate);

    var newCntnt = [...cntnt];
    newCntnt[1] = '내용2';
    cntntChg(newCntnt);
  }

  function titleSortAsc(){ 
    var newArray = [...title]; // [...state명]를 사용하여 DeepCopy (ES6 신문법 사용)
    // 글자수 순
    // newArray.sort((a,b)=>a.length - b.length);
    var newList = [...dataList];
    // 가나다,abc~ABC 순
    newArray.sort();
    newList.sort((a,b)=>{
      if(a.title > b.title) return 1;
      if(a.title < b.title) return -1;
      return 0;
    });
    titleChg(newArray);
    dataListChg(newList);
  }
  function titleSortDesc(){
    var newList = [...dataList];
    // 가나다,abc~ABC 순
    newList.sort((a,b)=>{
      if(a.title > b.title) return -1;
      if(a.title < b.title) return 1;
      return 0;
    });
    dataListChg(newList);
  }

  return (
    <div className="App">
      <div className="black-nav"> 
      {/* class 사용불가, react프로젝트 js(x)파일에서는 className으로 사용  */}
        {/* <div style={ { color : 'blue', fontSize: '30px'}}>개발 Blog</div> */}
        <div>개발 Blog</div>
        {/* style 작성 시 중괄호를 사용 내부를 Object 형식으로 작성하고 font-size 에서 '-'(DASH) 사용불가 CamelCase로 작성 */}
        <ul>
          <li>홈</li>
          <li>가이드</li>
        </ul>
      </div>
      {/* <img src={ logo }></img> */}
      <h2>블로그 내용 목록</h2>
      <button onClick={
          /* 함수 작성시 괄호를 넣고 작성 하면 바로 실행이 되어버리므로 괄호를 제거 */
          titleSortAsc
          }>오름차순정렬</button>
      <button onClick={
          /* 함수 작성시 괄호를 넣고 작성 하면 바로 실행이 되어버리므로 괄호를 제거 */
          titleSortDesc
          }>내림차순정렬</button>
      <button onClick={
          chgTitle
          }>변경버튼</button>
      <div className="list">
        <h4 onClick={changeModal}>{ dataList[0].title } <span onClick={ ()=>{ likeChg(like+1); } }>👍</span> { like } </h4>
        <p>{ dataList[0].date }</p>
        <hr/>
      </div>
      <List data={dataList[1]} modalObject={modalObject} showModal={showModal}/>
      <List data={dataList[2]} modalObject={modalObject} showModal={showModal}/>
      <h2>map()반복문</h2>
      {
        dataList.map((a,i)=>{
          return <List data={a} num={i} key={i} modalObject={modalObject} showModal={showModal}/>
        })
      }
      <div className="modal">
          <h2>{ modalObject.title }</h2>
          <p>{ modalObject.date }</p>
          <p>{ modalObject.cntnt }</p>
      </div>
    </div>
  );

  /*  리액트 return 내 HTML 작성 시 사용 불가의 예
      return(
          <div></div>
          <div></div>
          <div></div>
      )
      return 안에는 하나의 HTML Tag로 시작과 끝을 맺어야 함
      
  */ 
}

/* 
  React Component 사용 방법
  function App() 끝나는 부분 뒤에 작성 <- App() 또한 컴포넌트에 해당함
  * 어떤걸 컴포넌트로 만들면 좋은가?
    1. 반복적으로 등장하는 HTML 덩어리들
    2. 자주 변경되는 HTML UI들
  * 주의사항 :  
    1. 생성시 첫글자를 대문자로 시작 할 것
    2. return 안에 있는 건 태그 하나로 묶어야 됨
      - 프래그먼트 문법 : <> </> 
        = 해당 문법으로 묶어서 사용가능
*/
function List(props) {
  
  function returnModal(){
    let newObject=JSON.parse(JSON.stringify(props.modalObject));
    newObject.title = props.data.title;
    newObject.date = props.data.date;
    newObject.cntnt = props.data.cntnt;
    props.showModal(newObject);
  }

  return(
    <div className="list">
      <h4 onClick={ returnModal }>{ props.data.title } <span>👍</span> 0 </h4>
      <p>{ props.data.date }</p>
      <hr/>
    </div>
  )
}

export default App;
