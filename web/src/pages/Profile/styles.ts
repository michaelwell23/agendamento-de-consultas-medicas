import { shade } from 'polished';
import styled from 'styled-components';

export const Container = styled.div`
  > header {
    height: 144px;
    background-color: #28262e;

    display: flex;
    align-items: center;

    div {
      width: 100%;
      max-width: 1120px;
      margin: 0 auto;

      svg {
        color: #94de5e;
        width: 28px;
        height: 28px;
        border-radius: 50%;
      }
    }
  }
`;

export const Content = styled.div`
  place-content: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: -176px auto 0;

  width: 100%;
  max-width: 700px;

  form {
    margin: 40px 0;
    width: 340px;
    text-align: center;
    display: flex;
    flex-direction: column;

    h1 {
      margin-bottom: 24px;
      font-size: 20px;
      text-align: left;
    }
  }
`;

export const AvatarInput = styled.div`
  margin-bottom: 28px;
  position: relative;
  align-self: center;

  img {
    width: 186px;
    height: 186px;
    border-radius: 50%;
  }

  label {
    position: absolute;
    width: 48px;
    height: 48px;
    background: #949494;
    border-radius: 50%;
    right: 0;
    bottom: 0;
    border: 0;
    cursor: pointer;
    transition: background-color o.2s;

    input {
      display: none;
    }

    display: flex;
    align-items: center;
    justify-content: center;

    svg {
      width: 20px;
      height: 20px;
    }

    &:hover {
      background: ${shade(0.2, '#949494')};
    }
  }
`;
