import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useCookies } from "react-cookie";
import { useParams } from "react-router";
import "../css/menu_detail.css";

function MenuDetail(props) {
    const {menuId} = useParams();
    const [menu, setMenu] = useState({});
    const [optionList, setOptionList] = useState([]);
    const optionRef = useRef([]);
    const orderRef = useRef(null);
    let size = 0;

    const [total, setTotal] = useState(0);

    const [cookies, setCookie, removeCookie] = useCookies(['cookie-name']);
    const userId = cookies.userId;
    
    useEffect(() => {
        axios.get("http://localhost:3001/menu/" + menuId)
        .then((res) => {
            setMenu(res.data);
            setTotal(res.data.price);
        });

        axios.get("http://localhost:3001/option/" + menuId)
        .then((res) => {
            setOptionList(res.data);
        });
    }, []);

    return (<>
        <div align="center" className="cont_wrap">
            <div className="img_div">
                <img src={"../" + menu.img_url} />
            </div>
            <div className="order_div">
                <div className="desc_div">
                    <p className="desc">{menu.description}</p>
                    <p>{menu.calorie + "kcal"}</p>
                </div>
                
                <div className="option_div">
                    <ul>
                        {
                            optionList.map((item,i) => {
                                return (<li key={item.option_id}>
                                    <input type="checkbox" ref={el => {if(size < optionList.length) optionRef.current[size++] = el}} id={item.option_id} value={item.price} 
                                    onChange={(e) =>{
                                        if (e.currentTarget.checked) setTotal(Number(total) + Number(e.currentTarget.value))
                                        else setTotal(Number(total) - Number(e.currentTarget.value))
                                    }}/>
                                    <span>{item.name + " " + item.price.toLocaleString('kr-KO') + "원"}</span>
                                </li>)
                            })
                        }
                    </ul>
                </div>
                <div className="price_div">
                    <p>{total.toLocaleString('kr', 'KO') + "원"}</p>
                    
                    <input type="button" className="orderBtn" ref={orderRef} value="주문" onClick={() => {
                        let data = {
                            userId: userId,
                            menuId: menu.menu_id
                        };

                        let optionData = [];
                        optionRef.current.forEach((item) => {         
                            if (item.checked) optionData.push(item.id);
                        });

                        data.options = optionData;

                        let formData = new FormData();
                        formData.append("userId", userId);
                        formData.append("menuId", menu.menu_id);
                        formData.append("options", optionData);

                        axios.post("http://localhost:3001/order", formData, {
                            withCredentials: true, 
                            headers: {
                                'Content-Type': 'multipart/form-data'
                            }
                        })
                        .then((res) => {
                            window.location.href = res.data;
                        });
                    }}/>
                </div>
            </div>
        </div>
    </>)
}

export default MenuDetail;