import axios from "axios";
import { useRef } from "react";
import { useParams } from "react-router";
import "../css/common.css";
import "../css/signup.css";

function SignUp(props) {
    const { marketing } = useParams();

    const webIdRef = useRef(null);
    const webIdCheckRef = useRef(null);
    const pw1Ref = useRef(null);
    const pw2Ref = useRef(null);
    const pwCheckRef = useRef(null);
    const emailRef = useRef(null);
    const emailCheckRef = useRef(null);
    const phoneNumberRef = useRef(null);
    const phoneNumberCheckRef = useRef(null);

    const formRef = useRef(null);

    let idChecked = false;
    let pwChecked = false;

    function checkId(id) {
        if (id === "") {
            webIdCheckRef.current.style.color = "red";
            webIdCheckRef.current.innerText = "아이디 입력 필요.";
            return;
        }
        axios.get("http://localhost:3001/member/check?webId=" + id)
        .then((res) => {
            let dup = res.data[0].cnt;
            if (!dup) {
                webIdCheckRef.current.style.color = "blue";
                webIdCheckRef.current.innerText = "사용 가능!";
                idChecked = true;
            } else {
                webIdCheckRef.current.style.color = "red";
                webIdCheckRef.current.innerText = "중복된 아이디 존재.";
                idChecked = false;
            }
        });
    }

    function checkPw() {
        if (pw1Ref.current.value === pw2Ref.current.value) {
            pwCheckRef.current.style.color = "blue";
            pwCheckRef.current.innerText = "비밀번호 일치!";
            pwChecked = true;
        } else {
            pwCheckRef.current.style.color = "red";
            pwCheckRef.current.innerText = "비밀번호 불일치.";
            pwChecked = false;
        }
    }

    function checkSubmit() {
        if (!idChecked) {
            webIdCheckRef.current.style.color = "red";
            webIdCheckRef.current.innerText = "아이디 확인";
            return;
        }
        webIdCheckRef.current.innerText = "";

        if (!pwChecked) {
            pwCheckRef.current.style.color = "red";
            pwCheckRef.current.innerText = "비밀번호 확인";
            return;
        }
        pwCheckRef.current.innerText = "";

        if (emailRef.current.value === "") {
            emailCheckRef.current.style.color = "red";
            emailCheckRef.current.innerText = "이메일 확인";
            return;
        }
        emailCheckRef.current.innerText = "";

        if (phoneNumberRef.current.value === "") {
            phoneNumberCheckRef.current.style.color = "red";
            phoneNumberCheckRef.current.innerText = "휴대폰번호 확인";
            return;
        }
        phoneNumberCheckRef.current.innerText = "";
        
        console.dir(formRef.current);
        formRef.current.submit();
        //window.location.href = "/";
    }
    
    return (<>
        <div align="center">
            <form method="POST" action="http://localhost:3001/member" ref={formRef} >
                <div className="form_group"> <label className="form_label" >아이디</label>
                    <input type="text" id="webId" name="webId" ref={webIdRef}/> 
                    <button onClick={(e)=>{ e.preventDefault(); checkId(webIdRef.current.value)}}>중복확인</button>
                    <span ref={webIdCheckRef}></span>
                </div>
                <div className="form_group"> <label className="form_label">비밀번호</label>
                    <input type="password" className="password_form" name="password" ref={pw1Ref} onChange={() => {checkPw()}}/>
                    <span ref={pwCheckRef}></span>
                </div>
                <div className="form_group"> <label className="form_label">비밀번호 확인</label>
                    <input type="password" className="password_form" ref={pw2Ref} onChange={() => {checkPw()}}/>                    
                </div>
                <div className="form_group"> <label className="form_label">이메일</label>
                    <input type="email" name="email" ref={emailRef}/>
                    <span ref={emailCheckRef}></span>
                </div>
                <div className="form_group"> <label className="form_label">휴대폰 번호</label>
                    <input type="text" name="phoneNumber" ref={phoneNumberRef}/>
                    <span ref={phoneNumberCheckRef}></span>
                </div>
                <input type="hidden" name="marketing" value={marketing} />
                <br />
                <input type="submit" value="가입하기" onClick={(e) => {e.preventDefault(); checkSubmit();}}/> 
            </form>
        </div>
    </>)
}

export default SignUp;