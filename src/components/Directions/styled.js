import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  width: 80%;
  height: 500px;
`;

export const Form = styled.form`
  display: flex;
  width: 30%;
  min-width: 200px;
  flex-direction: column;
  padding: 25px;
  align-items: center;
  background: white;
  border-radius: 6px 0px 0px 6px;
`;

export const ContainerMap = styled.div`
  width: 70%;
  min-width: 400px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 0px 6px 6px 0px;
`;

export const Input = styled.input`
  width: 80%;
  margin: 0px 10px 20px 10px;
  padding-left: 15px;
  height: 35px;
  border-radius: 5px;
  outline: none;
  font-size: 14px;
  border: 1px solid gainsboro;
`;

export const Label = styled.label`
  &.bold {
    font-weight: 900;
  }
  font-size: 13px;
  color: #6f6e79;
  font-weight: 400;
  margin-bottom: 5px;
`;

export const H2 = styled.h2`
  margin-bottom: 40px;
  color: #6f6e79;
  font-weight: bold;
`;
