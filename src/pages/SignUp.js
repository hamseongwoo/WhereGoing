import React, { useState } from "react";
import { z } from "zod";
import styled from "styled-components";
import SignUpButton from "../Components/Button/SignUpButton";
import Bottom from "../Components/Button/BottomText/BottomText";
import GlobalStyle from "../styles/GlobalStyle";

// 💡 Zod 스키마: 비밀번호 검증
const passwordSchema = z
  .object({
    password: z.string().min(6, "비밀번호는 최소 6자 이상이어야 합니다"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "비밀번호가 일치하지 않습니다",
  });

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
  min-height: ${(props) => (props.authCode ? "420px" : "330px")};
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
  font-family: "Pretendard-ExtraBold", sans-serif;
  font-weight: 600;
  width: 365px;
  height: 42px;
  border-radius: 10px;
  font-size: 15px;
  padding-left: 55px;
  background: #fff url("/user.png") no-repeat 15px center;
  background-size: 27px;
  border: ${(props) =>
    props.$isInvalid ? "1px solid #FF5959" : "1px solid #8a8a8a"};
  color: ${(props) => (props.$isInvalid ? "#FF5959" : "#8b8b8b")};

  :focus {
    border-color: #ff975b;
    outline: none;
  }
`;

const WrongMessage = styled.div`
  font-family: "Pretendard-ExtraBold", sans-serif;
  color: #ff5959;
  font-size: 12px;
  font-weight: 600;
  margin-top: -13px;
  margin-left: -150px;
`;

const AuthCodeInput = styled.input`
  font-family: "Pretendard-ExtraBold", sans-serif;
  font-weight: 600;
  width: 365px;
  height: 42px;
  border-radius: 10px;
  padding-left: 55px;
  background: #fff url("/user.png") no-repeat 15px center;
  background-size: 27px;
  border: ${(props) =>
    props.$isInvalid ? "1px solid #FF5959" : "1px solid #8a8a8a"};
  color: ${(props) => (props.$isInvalid ? "#FF5959" : "#8b8b8b")};
  margin-top: -10px;

  :focus {
    border-color: #ff975b;
    outline: none;
  }

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
  position: absolute;
  margin-top: 40px;
  margin-left: 335px;
  min-width: 60px;
  height: 23px;
  background-color: #ffffff;
  color: #000000;
  border: 1px solid #8a8a8a;
  border-radius: 7px;
  font-weight: 600;
  cursor: pointer;
`;

function SignUp() {
  const [email, setEmail] = useState("@gsm.hs.kr");
  const [authNumber, setAuthNumber] = useState("");
  const [isInvalid, setIsInvalid] = useState(false);
  const [authCode, setAuthCode] = useState(false);
  const [showPasswordInput, setShowPasswordInput] = useState(false);
  const [onClick, setOnClick] = useState(false);

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const handleInputChange = (e) => {
    const userInput = e.target.value.replace(/@gsm\.hs\.kr$/, "");
    const limitedInput = userInput.slice(0, 6);
    setEmail(`${limitedInput}@gsm.hs.kr`);
  };

  const handleInputClick = (e) => {
    const domainStartIndex = email.indexOf("@gsm.hs.kr");
    e.target.setSelectionRange(domainStartIndex, domainStartIndex);
  };

  const handleKeyUp = (e) => {
    const domainStartIndex = email.indexOf("@gsm.hs.kr");
    if (e.target.selectionStart >= domainStartIndex) {
      e.target.setSelectionRange(domainStartIndex, domainStartIndex);
    }
  };

  const handleAuthCodeChange = (e) => {
    const input = e.target.value;
    if (input.length <= 6) {
      setAuthNumber(input);
    }
  };

  const onClickResendButton = () => {
    setOnClick(true);
  };

  const onClickButton = () => {
    if (!authCode) {
      // 1단계: 이메일 인증 요청
      if (email.length < 16) {
        setIsInvalid(true);
      } else {
        setIsInvalid(false);
        setAuthCode(true); // 인증번호 입력으로 전환
      }
    } else if (!showPasswordInput && authNumber.length === 6) { 
      // 2단계: 인증 완료 → 비밀번호 설정 폼 열기
      setShowPasswordInput(true);
    } else {
      // 3단계: 비밀번호 설정 → Zod로 유효성 검사
      const result = passwordSchema.safeParse({ password, confirmPassword });
      if (!result.success) {
        setPasswordError(result.error.errors[0].message);
      } else {
        setPasswordError("");
        console.log("🎉 회원가입 완료!", result.data);
        // TODO: 서버 요청 or 다음 단계 처리
      }
    }
  };

  return (
    <>
      <GlobalStyle />
      <Screen>
        <Container authCode={authCode}>
          <SignUpText>회원가입</SignUpText>

          {/* 이메일 입력 */}
          <MailInput
            type="text"
            value={email}
            onChange={handleInputChange}
            onClick={handleInputClick}
            onKeyUp={handleKeyUp}
            $isInvalid={isInvalid}
            maxLength={16}
          />
          {isInvalid && (
            <WrongMessage>
              Gmail의 형식이 잘못되었습니다. 다시 입력하여 주십시오.
            </WrongMessage>
          )}

          {/* 인증번호 입력 */}
          {authCode && !showPasswordInput && (
            <>
              <AuthCodeInput
                type="number"
                value={authNumber}
                onChange={handleAuthCodeChange}
                placeholder="인증번호"
                maxLength={6}
              />
              <ResendButton onClick={onClickResendButton}>
                {onClick ? "발송완료" : "재발송"}
              </ResendButton>
            </>
          )}

          {/* 비밀번호 입력 */}
          {showPasswordInput && (
            <>
              <MailInput
                type="password"
                placeholder="비밀번호"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                $isInvalid={!!passwordError}
              />
              <MailInput
                type="password"
                placeholder="비밀번호 확인"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                $isInvalid={!!passwordError}
              />
              {passwordError && <WrongMessage>{passwordError}</WrongMessage>}
            </>
          )}

          {/* 버튼 (인증요청 / 인증완료 / 회원가입 완료) */}
          <SignUpButton onClick={onClickButton}>
            {showPasswordInput
              ? "회원가입 완료"
              : authCode
              ? "인증완료"
              : "인증요청"}
          </SignUpButton>

          <Bottom />
        </Container>
      </Screen>
    </>
  );
}

export default SignUp;
