import "../css/header.css";
import { useEffect, useRef } from "react";
import { useCookies } from "react-cookie";

function Header(props) {
    const navMenuRef = useRef(null);
    const navMenuActiveRef = useRef(null);

    const hamburgerRef = useRef(null);
    const navsMenuActiveRef = useRef(null);


    const navsMenuRef = useRef([]);
    const navsSubMenuRef = useRef([]);

    const activeStyle = {"display": "none"};
    const navsStyle = {"display": "none"};

    useEffect(() => {
        let navMenu = navMenuRef.current;
        let activeMenu = navMenuActiveRef.current;

        navMenu.addEventListener('mouseover', () => {
            activeMenu.style.visibility = "visible";
        });

        activeMenu.firstChild.addEventListener('mouseleave', () => {
            activeMenu.style.visibility = "hidden";
        });

        hamburgerRef.current.addEventListener('click', () => {
            let display = navsMenuActiveRef.current.style.display;
            if (display === "none") navsMenuActiveRef.current.style.display = "block";
            else if (display === "block") navsMenuActiveRef.current.style.display = "none";
        });

        navsMenuRef.current.forEach((item,i) => {
            item.addEventListener('click', () => {
                let sub = navsSubMenuRef.current[i];
                if (sub.style.display === "none") sub.style.display = "block";
                else if (sub.style.display === "block") sub.style.display = "none";
            });
        });

    }, []);
        

    const [cookies, setCookie, removeCookie] = useCookies(['cookie-name']);
    const userId = cookies.userId;
    let topMenu = "";
    
    if (typeof userId === 'undefined') {
        topMenu = (<ul>
            <li><a href="/agree">회원가입</a></li>
            <li><a href="/signIn">로그인</a></li>
        </ul>);
    } else {
        topMenu = (<ul>
            <li><a href={"/mypage/" + userId}>마이페이지</a></li>
            <li><a href="http://localhost:3001/member/logout">로그아웃</a></li>
        </ul>);
    }

    return (<>
    <div className="top_menu">
        {topMenu}
    </div>
    <div className="cont">
        <div className="navbar">
            <div className="logo"><a href="/"><img src={process.env.PUBLIC_URL + "/img/logo2.png"}/></a></div>
            <div className="nav_menu" ref={navMenuRef}>
                <ul>
                    <li><p>BRAND</p></li>
                    <li><p>MENU</p></li>
                    <li><p>STORE</p></li>
                    <li><p>EVENT</p></li>
                </ul>
            </div>
        </div>
        <div className="nav_menu_active" ref={navMenuActiveRef}>
            <div className="nav_menu_active_wrap">
                <ul className="nav_sub_menu">
                    <li>브랜드 스토리</li>
                    <li>브랜드 철학</li>
                    <li>브랜드 유산</li>
                </ul>
                <ul className="nav_sub_menu">
                    <li><a href="/menu">전체메뉴</a></li>
                    <li>식재료 이야기</li>
                    <li>단체 주문</li>
                </ul>
                <ul className="nav_sub_menu">
                    <li>
                        <a href="/place">주변 점포 찾기</a>
                    </li>
                </ul>
                <ul className="nav_sub_menu">
                    <li>이 달의 이벤트</li>
                    <li>신규점 오픈이벤트</li>
                </ul>
                
            </div>
        </div>
    </div>    
    <div className="cont small">
        <div className="navbar_s">
            <div className="navbar_s_top">
                <div className="logo_s"><a href="/"><img src={process.env.PUBLIC_URL + "/img/logo3.jpg"}/></a></div>
                <div className="hamburger" ref={hamburgerRef}>
                    <span className="line">ㅡ</span>
                    <span className="line">ㅡ</span>
                    <span className="line">ㅡ</span>
                </div>
            </div>
        </div>
        <div className="nav_s_menu" ref={navsMenuActiveRef} style={activeStyle}>
            <ul>
                <li><p ref={el => {navsMenuRef.current.push(el)}}>BRAND</p>
                    <ul className="nav_s_sub_menu" style={navsStyle} ref={el => {navsSubMenuRef.current.push(el)}}>
                        <li>브랜드 스토리</li>
                        <li>브랜드 철학</li>
                        <li>브랜드 유산</li>
                    </ul>
                </li>
                <li><p ref={el => {navsMenuRef.current.push(el)}}>MENU</p>
                    <ul className="nav_s_sub_menu" style={navsStyle} ref={el => {navsSubMenuRef.current.push(el)}}>
                        <li><a href="/menu">전체메뉴</a></li>
                        <li>식재료 이야기</li>
                        <li>단체 주문</li>
                    </ul>
                </li>
                <li><p ref={el => {navsMenuRef.current.push(el)}}>STORE</p>
                    <ul className="nav_s_sub_menu" style={navsStyle} ref={el => {navsSubMenuRef.current.push(el)}}>
                        <li>
                            <a href="/place">주변 점포 찾기</a>
                        </li>
                    </ul>
                </li>
                <li><p ref={el => {navsMenuRef.current.push(el)}}>EVENT</p>
                    <ul className="nav_s_sub_menu" style={navsStyle} ref={el => {navsSubMenuRef.current.push(el)}}>
                        <li>이 달의 이벤트</li>
                        <li>신규점 오픈이벤트</li>
                    </ul>
                </li>
            </ul>
        </div>
    </div>
    </>)
}

export default Header;