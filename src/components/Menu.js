import "../css/menu.css";
import { useEffect, useRef, useState } from "react";
import axios from "axios";


function Menu(props) {
    // 카테고리와 서브카테고리는 DB에서 가져오기
    const menuRef = useRef([]);
    let size = 0;
    const [categoryList, setCategoryList] = useState([]);
    const [menuList, setMenuList] = useState([]);
    const [subCategory, setSubCategory] = useState("");

    useEffect(() => {
        if (subCategory != "") {
            axios.get(`http://localhost:3001/menu/title/${subCategory}`)
            .then((res) => {
                setMenuList(res.data);
            });
        } else {
            axios.get("http://localhost:3001/category")
            .then((res) => {
                setCategoryList(res.data);
            });

            axios.get("http://localhost:3001/menu")
            .then((res) => {
                setMenuList(res.data);
            });
        }        
    }, [subCategory]);

    const style = {"display": "none"};

    return (<>
        <div className="menu_logo">
            <span>메뉴</span> 
        </div>
        <div className="menu_nav">
            <ul>
                <li className="accordion" ref={el => {menuRef.current[size++] = el}} onClick={() => {setSubCategory("")}}>전체보기</li>
                {
                    categoryList.map((item, i) => {
                        return (<li key={i} className="accordion" ref={el => {menuRef.current[size++] = el}} onClick={(e) => {
                            let menu = e.currentTarget;
                            if (typeof menu.children[0] !== "undefined" ) {
                                if (menu.children[0].style.display === "none") {
                                    menu.children[0].style.display = "block";
                                } else {
                                    menu.children[0].style.display = "none";
                                }
                            }
                        }}>{item[0].title}
                            <div className="panel" style={style}>
                                <ul>
                                    {item.map((item2, j) => {
                                        return (<li key={j} onClick={() => {setSubCategory(item2.title2)}}>{item2.title2}</li>)  
                                    })}
                                </ul>
                            </div>
                        </li>)
                    })
                }
            </ul>
        </div>
        <div className="menu_cont">
            <ul>
                {
                    menuList.map((item, i) => {
                        return (<li key={i}>
                            <a href={"/menu/" + item.menu_id}><img src={item.img_url} /></a>
                            <p>{item.name}</p>
                            <p>{item.price.toLocaleString('ko-KR') + "원"}</p>
                        </li>)
                    })
                }
            </ul>
        </div>
    </>)
}

export default Menu;