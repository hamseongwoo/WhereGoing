import styled from "styled-components";
import SignUpButton from "../Components/Button/SignUpButton";
import Bottom from "../Components/Button/BottomText/BottomText";
import GlobalStyle from "../styles/GlobalStyle";

const Screen = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 90vh;
`;

const Container = styled.div`
  display: flex;
  justify-content: center;
  background: #f8f8f8;
  border-radius: 20px;
  border: 1px solid #333;
  width: 560px;
  height: 325px;
  flex-shrink: 0;
`;
const SignUpText = styled.div`
  font-family: "Jalnan", sans-serif;
  color: #ff975b;
  font-size: 27px;
  margin-top: 65px;
`;

const MailInput = styled.input`
  width: 365px;
  height: 42px;
  position: absolute;
  justify-content: center;
  flex-shrink: 0;
  border-radius: 10px;
  border: 1px solid #8a8a8a;
  color: #8B8B8B;
  background: #fff;
  margin-top: 140px;
  font-weight: 600;
  background: url('/user.png') no-repeat 5px center;
  background-size: 27px;
  padding-left: 55px;
  background-position: 15px center;;
  background-color: #FFF;
`;

function SignUp() {
  return (
    <>
      <GlobalStyle />
      <Screen>
        <Container>
          <SignUpText>회원가입</SignUpText>
          <MailInput type="email" placeholder="@gsm.hs.kr" />
          <SignUpButton>인증요청</SignUpButton>
          <Bottom></Bottom>
        </Container>
      </Screen>
    </>
  );
}

export default SignUp;
