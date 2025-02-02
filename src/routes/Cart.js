import { Table } from "react-bootstrap";
import { useState, memo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeName, increase } from "../store/userSlice.js";
import { addCount, deleteItem } from "../store.js";


// memo == 꼭 필요할 때만 재 렌더링 + props 전송 시 props 값이 변할 때마다 렌더링
let Child = memo(function(){
  console.log("재랜더링된거임?")
  return <div>자식입니다</div>
})


function Cart() {
  let [count, setCount] = useState(0);

  // let a = useSelector((state)=>{return state})
  // console.log(a.stock[0])

  // useSelector 편하게 쓰는 법

  // let a = useSelector((state)=>state.user)

  let state = useSelector((state) => state);
  let username = useSelector((state) => state.user.name);

  let cartItem = useSelector((state) => state.cart);
  let dispatch = useDispatch(); // store.js 로 요청 보내주는 함수

  return (
    <div>

      <Child count={count}></Child>
      {count}
      <button onClick={()=>{
        setCount(count + 1)
      }}>+</button>

      
      {username}의 장바구니
      {state.user.age}살
      <button
        onClick={() => {
          dispatch(increase(100));
        }}
      >
        나이를 먹자
      </button>
      <Table>
        <thead>
          <tr>
            <th>상품인덱스</th>
            <th>상품명</th>
            <th>재고개수</th>
            <th>변경하기</th>
          </tr>
        </thead>
        <tbody>
          {/* <td>{cartItem[0].id}</td>
      <td>{cartItem[0].name}</td>
      <td>{cartItem[0].count}</td> */}

          {/* 반복문 사용시 key 속성을 사용해 주면 좋다. */}
          {cartItem.map((a, i) => {
            return (
              <tr key={i}>
                <td>{cartItem[i].id}번</td>
                <td>{cartItem[i].name}</td>
                <td>{cartItem[i].count}개</td>
                <td>
                  <button
                    onClick={() => {
                      dispatch(addCount(state.cart[i].id)); // state 값 옆 아이디를 의미
                    }}
                  >
                    +
                  </button>
                  <button
                    onClick={() => {
                      dispatch(deleteItem(state.cart[i].id)); // state 값 옆 아이디 받기
                    }}
                  >
                    삭제하기
                  </button>
                </td>
                {/* dispatch 는 store.js 에게 메시지를 보내는 거라 생각 */}
              </tr>
            );
          })}
        </tbody>
      </Table>
    </div>
  );
}

export default Cart;
