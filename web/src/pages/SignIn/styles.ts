import styled from 'styled-components';
import { shade } from 'polished';

import signInBackground from '../../assets/sign-in-background.jpg';

export const Container = styled.div`
  height: 100vh;

  display: flex;
  align-items: stretch;

  img {
    width: 320px;
  }
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  place-content: center;

  width: 100%;
  max-width: 700px;

  form {
    margin: 80px 0;
    width: 340px;
    text-align: center;

    h1 {
      margin-bottom: 24px;
    }

    > a {
      color: #f4ede8;
      display: block;
      margin-top: 24px;
      text-decoration: none;
      transition: background-color 0.5s;

      &:hover {
        color: ${shade(0.2, '#f4ede8')};
      }
    }
  }

  > a {
    display: flex;
    align-items: center;

    color: #94de5e;
    display: block;
    margin-top: 24px;
    text-decoration: none;
    transition: background-color 0.5s;

    svg {
      margin-right: 16px;
    }

    &:hover {
      color: ${shade(0.2, '#94de5e')};
    }
  }
`;

export const Background = styled.div`
  flex: 1;
  background: url(${signInBackground}) no-repeat center;
  background-size: cover;
  filter: grayscale(1);
`;
