import styled, { keyframes } from 'styled-components';
import { shade } from 'polished';

import signInBackground from '../../assets/sign-in-background.jpg';

const appearFromLeft = keyframes`
  from {
    opacity: 0;
    transform: translateX(-100px)
  }

  to {
    opacity: 1;
    transform: translateX(0)
  }
`;

export const Container = styled.div`
  height: 100vh;

  display: flex;
  align-items: stretch;
`;

export const Content = styled.div`
  place-content: center;
  display: flex;
  flex-direction: column;
  align-items: center;

  width: 100%;
  max-width: 700px;
`;

export const Background = styled.div`
  flex: 1;
  background: url(${signInBackground}) no-repeat center;
  background-size: cover;
  filter: grayscale(1);

  animation: ${appearFromLeft} 1s;
`;

export const AnimationContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  animation: ${appearFromLeft} 1.2s;

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
        color: ${shade(0.2, '#94de5e')};
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
