import React, { useState } from "react";
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
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: #f8f8f8;
  border-radius: 20px;
  border: 1px solid #333;
  width: 560px;
  min-height: ${(props) => (props.authCode ? "400px" : "330px")};
  height: auto;
  gap: 20px;
  flex-shrink: 0;
`;

const SignUpText = styled.div`
  font-family: "Jalnan", sans-serif;
  color: #ff975b;
  font-size: 27px;
  margin-bottom: 15px;
`;

const MailInput = styled.input`
  width: 365px;
  height: 42px;
  flex-shrink: 0;
  border-radius: 10px;
  background: #fff;
  font-weight: 600;
  font-size: 15px;
  background: url("/user.png") no-repeat 5px center;
  background-size: 27px;
  padding-left: 55px;
  background-position: 15px center;
  background-color: #fff;
  border: ${(props) =>
    props.$isInvalid ? "1px solid #FF5959" : "1px solid #8a8a8a"};
  color: ${(props) => (props.$isInvalid ? "#FF5959" : "#8b8b8b")};
`;

const WrongMessage = styled.div`
  font-family: "Pretendard-ExtraBold", sans-serif;
  color: #ff5959;
  font-size: 12px;
  font-weight: 600;
  line-height: 100%;
  margin-top: -13px;
  margin-left: -150px;
`;

const AuthCodeInput = styled.input`
  font-family: "Pretendard-ExtraBold", sans-serif;

  width: 365px;
  height: 42px;
  top: 30px;
  margin-top: -8px;
  flex-shrink: 0;
  border-radius: 10px;
  background: #fff;
  font-weight: 1000;
  font-size: 15px;
  background: url("/user.png") no-repeat 5px center;
  background-size: 27px;
  padding-left: 55px;
  background-position: 15px center;
  background-color: #fff;
  color: ${(props) => (props.$isInvalid ? "#FF5959" : "#8b8b8b")};

  /* 조건부 outline 색상 */
  border: ${(props) =>
    props.$isInvalid ? "1px solid #FF5959" : "1px solid #8a8a8a"};

  &::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
`;

const ResendButton = styled.button`
  font-family: "Pretendard-ExtraBold", sans-serif;
  width: 60px;
  height: 23px;
  background-color: #ffffff;
  color: #000000;
  border: 1px solid #8a8a8a;
  border-radius: 7px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  cursor: pointer;
  position: absolute;
  margin-top: 40px;
  margin-left: 335px;
`;

function SignUp() {
  const [email, setEmail] = useState("@gsm.hs.kr");
  const [authNumber, setAuthNumber] = useState(""); // 인증번호 상태 초기화
  const [isInvalid, setIsInvalid] = useState(false);
  const [authCode, setAuthCode] = useState(false);

  const handleInputChange = (e) => {
    const userInput = e.target.value.replace(/@gsm\.hs\.kr$/, ""); // 도메인 제거
    const limitedInput = userInput.slice(0, 6); // 입력값을 6글자로 제한
    setEmail(`${limitedInput}@gsm.hs.kr`); // 제한된 입력값에 도메인 추가
  };

  const handleInputClick = (e) => {
    const domainStartIndex = email.indexOf("@gsm.hs.kr"); // 도메인의 시작 위치 계산
    e.target.setSelectionRange(domainStartIndex, domainStartIndex); // 커서를 도메인 앞에 위치
  };

  const handleKeyUp = (e) => {
    const domainStartIndex = email.indexOf("@gsm.hs.kr");
    if (e.target.selectionStart >= domainStartIndex) {
      // 커서가 @gsm.hs.kr 뒤로 넘어가면 강제로 앞에 위치
      e.target.setSelectionRange(domainStartIndex, domainStartIndex);
    }
  };

  const handleAuthCodeChange = (e) => {
    const input = e.target.value;
    if (input.length <= 6) {
      setAuthNumber(input); // 입력값이 6글자 이하일 때만 상태 업데이트
    }
  };

  const onClickButton = () => {
    if (email.length < 16) {
      setIsInvalid(true);
    } else {
      setIsInvalid(false);
      setAuthCode(true); // 인증번호 입력 필드 표시
    }
  };

  return (
    <>
      <GlobalStyle />
      <Screen>
        <Container authCode={authCode}>
          <SignUpText>회원가입</SignUpText>
          <MailInput
            type="text"
            value={email}
            onChange={handleInputChange}
            onClick={handleInputClick} // 클릭 시 커서 이동
            onKeyUp={handleKeyUp} // 키 입력 시 커서 제어
            $isInvalid={isInvalid} // 유효성 상태 전달
            maxLength={16} // 최대 길이 설정
          />
          {isInvalid && (
            <WrongMessage>
              Gmail의 형식이 잘못되었습니다. 다시 입력하여 주십시오.
            </WrongMessage>
          )}

          {authCode && (
            <>
              <AuthCodeInput
                type="number"
                value={authNumber}
                onChange={handleAuthCodeChange} // 입력값 제어
                placeholder="인증번호"
                maxLength={6} // 추가적으로 maxLength 설정
              />
              <ResendButton>재발송</ResendButton>
            </>
          )}

          <SignUpButton onClick={onClickButton}>인증요청</SignUpButton>
          <Bottom />
        </Container>
      </Screen>
    </>
  );
}

export default SignUp;
