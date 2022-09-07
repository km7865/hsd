import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";

import "../css/mypage.css";

function Mypage (props) {
    const [cookies, setCookie, removeCookie] = useCookies(['cookie-name']);
    const userId = cookies.userId;

    const [orderList, setOrderList] = useState([]);
    const [member, setMember] = useState({});

    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(1);

    const prevRef = useRef(null);
    const nextRef = useRef(null);

    
    function cancelOrder(orderId) {
        axios.get(`http://localhost:3001/order/delete/${orderId}`)
        .then((res) => {
            window.location.href = res.data;
        }) 
    }

    useEffect(() => {
        axios.get("http://localhost:3001/order/" + userId)
        .then((res) => {
            setOrderList(res.data);
            setPageSize(parseInt(res.data.length / 5) + (res.data.length % 5 ? 1 : 0)); 
        });
    }, []);

    return (<>
        <div className="order_div">
            <div className="title_div">
                <span className="title_span">주문내역</span>
            </div>
            <div className="table_wrap">
                <table>
                    <thead>
                        <tr>
                            <th colSpan={2}>주문일시</th>
                            <th>주문번호</th>
                            <th colSpan={2}>메뉴명</th>
                            <th>금액(음식+옵션)</th>
                            <th>-</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            orderList.slice((page - 1) * 5, (page - 1) * 5 + 5).map((item,i) => {
                                return (<tr key={i}>
                                    <td colSpan={2}>{item.order_date}</td>
                                    <td>{item.order_id}</td>
                                    <td colSpan={2}>{item.name}</td>
                                    <td>{(Number(item.price) + Number(item.option_sum)).toLocaleString('kr', 'KO') + "원"}</td>
                                    <td><button onClick={() => { cancelOrder(item.order_id) }}>취소</button></td>
                                </tr>)
                            })
                        }
                        <tr>
                            <td colSpan="7" id="btn_area">
                                <button id="prev" ref={prevRef} onClick={() => {if (page > 1) setPage(page - 1)}}>◀</button>
                                <span className="page_span">{`총 ${orderList.length}건 중 ${(page - 1) * 5 + 1} - ${((page - 1) * 5 + 5 > orderList.length ? orderList.length : (page - 1) * 5 + 5)}`}</span>
                                <button id="next" ref={nextRef} onClick={() => {if (page < pageSize) setPage(page + 1)}}>▶</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </>)
}

export default Mypage;