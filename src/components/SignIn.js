
function SignIn(props) {
    const style = {"fontFamily": "NanumSquare"};
    const labelStyle = {
        "display": "inline-block",
        "width": "100px"
    };
    const btnStyle = {
        "width": "70px",
        "height": "50px"
    };

    return (<>
        <form method="POST" action="http://localhost:3001/member/login">
            <table>
                <tr>
                    <td><label style={labelStyle}>아이디</label><input type="text" name="webId"></input></td>
                    <td rowSpan="2"><input type="submit" style={btnStyle} value="로그인" /></td>
                </tr>
                <tr>
                    <td><label style={labelStyle}>비밀번호 </label><input type="password" name="password" style={style}></input></td>
                </tr>
            </table>
        </form>
    </>)
}

export default SignIn;