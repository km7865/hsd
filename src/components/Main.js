import "../css/main.css";
import { useRef } from "react";

function Main(props) {
    const carouselRef = useRef(null);
    let idx = 0;
    let carousel = setInterval(() => {    
        let carouselUl = document.querySelector(".event_carousel>ul");
        idx = (idx + 1) % 7;
        carouselUl.style.left = `-${idx * 100}%`;
    }, 3000);

    let move = function (n) {
        idx = (idx + n + 7) % 7;
        carouselRef.current.style.left = `-${idx * 100}%`;
    }

    

    return (<>
    <div className="event_cont">
        <div className="event_cont_wrap">
            <div className="event_carousel">
                <ul ref={carouselRef}>
                    <li><img src="img/1.jpg" /></li>
                    <li><img src="img/2.jpg" /></li>
                    <li><img src="img/3.jpg" /></li>
                    <li><img src="img/4.jpg" /></li>
                    <li><img src="img/5.jpg" /></li>
                    <li><img src="img/6.jpg" /></li>
                    <li><img src="img/7.jpg" /></li>
                </ul>
                <button id="prevBtn" onClick={() => {move(-1)}}>◀</button>
                <button id="nextBtn" onClick={() => {move(1)}}>▶</button>
            </div>
        </div>
    </div>

    <div className="main_cont_01">
        <div className="main_cont_wrap mo_tr">
            <div className="area_sc first">
                <a href="/menu" className="sc_link">
                    <figure className="sc_wrap">
                        <span className="sc_img">
                            <img src="img/main_img_01.jpg" alt="전체메뉴 이미지" />
                        </span>
                        <figcaption>
                            <p className="sc_tit fz_02">
                                <span className="s_block">가격 이상의 가치가 담긴</span>
                                <span className="s_block">다양한 메뉴를 확인해 보세요</span>
                            </p>
                            <span className="sc_txt">한솥 메뉴</span>
                        </figcaption>
                    </figure>
                </a>
            </div>
            <div className="area_sc">
                <a href="/store" className="sc_link">
                    <figure className="sc_wrap">
                        <span className="sc_img">
                            <img src="img/main_img_02.jpg" alt="주변점포찾기 이미지" />
                        </span>
                        <figcaption>
                            <p className="sc_tit fz_02">
                                <span className="s_block">갓 지은 한끼가 기다리고 있는</span>
                                <span className="s_block">가까운 한솥 매장을 찾아보세요</span>
                            </p>
                            <span className="sc_txt">주변점포찾기</span>
                        </figcaption>
                    </figure>
                </a>
            </div>
        </div>
    </div>
    <div className="main_cont_02">
        <div className="main_cont_wrap mo_tr">
            <div className="main_intro">
                <h2 className="h2_int fz_01">
                    <span className="s_block">가맹점주에게도<br /></span>
                    <span className="s_block">든든한 한솥입니다</span>
                </h2>
                <p className="int_tit">
                    <span className="s_block">점주님들의 꿈을 실현시켜 드리기 위해</span>
                    <span className="s_block">가맹점주와 성공까지 동행하는 한솥!</span>
                    <span className="s_block">상담부터 개업까지 모든 희로애락을 함께 합니다.</span>
                </p>
            </div>
            <div className="to_wrap">
                <div className="area_sc first">
                    <a href="/franchise/hansot_store" className="sc_link"></a>
                    <figure className="sc_wrap">
                        <span className="sc_img">
                            <img src="img/main_img_03.jpg" alt="why한솥 가맹점 이미지" />
                        </span>
                        <figcaption>
                            <p className="sc_tit fz_02">
                                <span className="s_block">한솥은 언제나 고객과 점주님들의</span>
                                <span className="s_block">이익을 먼저 생각합니다</span>
                            </p>
                            <span className="sc_txt">Why 한솥 가맹점</span>
                        </figcaption>
                    </figure>
                </div>
                
                <div className="area_sc">
                    <a href="/franchise/success" className="sc_link"></a>
                    <figure className="sc_wrap">
                        <span className="sc_img">
                            <img src="img/main_img_04.jpg" alt="성공수기 이미지" />
                        </span>
                        <figcaption>
                            <p className="sc_tit fz_02">
                                <span className="s_block">한솥과 함께하는 가맹점주들의</span>
                                <span className="s_block">성공 스토리입니다</span>
                            </p>
                            <span className="sc_txt">성공수기</span>
                        </figcaption>
                    </figure>
                </div>
            </div>
        </div>
    </div>
    <div className="main_cont_03">
        <div className="main_hansot">
            <div className="main_hansot_bg"> 
            </div>
            <div className="main_cont_wrap">
                <div className="main_info mo_version">
                    <h2 className="h2_info fz_01">
                        <span className="s_block">든든한 솥밥을 위해</span>
                        <span className="s_block">한솥이 지키고,</span>
                        <span className="s_block">키워가는 것들</span>
                    </h2>
                    <p className="info_tit">
                        <span className="s_block">한솥은 '따끈한 도시락으로 지역사회에 공헌한다' 라는</span>
                        <span className="s_block">기업이념 아래, 고객 이익을 최우선으로 하며 엄선된</span>
                        <span className="s_block">좋은 식재료만 사용하는 대한민국 외식종합기업 시장을</span>
                        <span className="s_block">리드하는 글로벌 종합외식기업 입니다.</span>
                    </p>
                </div>
            </div>
        </div>
    </div>
    <div className="main_cont_04">
        <div className="main_cont_wrap">
            <div className="area_sc">
                <a href="/menu/material" className="sc_link"></a>
                <figure className="sc_wrap">
                    <span className="sc_img">
                        <img src="img/main_img_05.jpg" alt="식재료 이미지" />
                    </span>
                    <figcaption>
                        <h2 className="h2_mt fz_01">
                            <span className="s_block">식재료 앞에서는</span>
                            <span className="s_block">한없이</span>
                            <span className="s_block">까탈스럽습니다</span>
                        </h2>
                        <p className="sc_tit">
                            <span className="s_block">맑고 깨끗한 자연 환경속에서 재배된 식재료가</span>
                            <span className="s_block">아니면 한솥이 될 수 없습니다.</span>
                            <span className="s_block">모든 식재료는 고객분들이 안심하고 드실 수 있도록</span>
                            <span className="s_block">엄격한 기준 아래 선별됩니다.</span>
                        </p>
                        <span className="sc_txt">식재료이야기</span>
                    </figcaption>
                </figure>
            </div>
        </div>
    </div>
    </>)
}

export default Main;