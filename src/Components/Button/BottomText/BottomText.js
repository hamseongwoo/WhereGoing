import styled from "styled-components";
import { PropmtText } from "./PromptText";
import { LoginLink } from "./LoginLink";

const BottomText = styled.div`
  width: 200px;
  height: 20px;
  position: absolute;
  display: flex;
  gap: 5px;
  justify-content: center;
  margin-top: 255px;
`;

function Bottom() {
  return (
    <BottomText>
      <PropmtText>계정이 있으신가요?</PropmtText>
      <LoginLink>로그인</LoginLink>
    </BottomText>
  );
}

export default Bottom;
