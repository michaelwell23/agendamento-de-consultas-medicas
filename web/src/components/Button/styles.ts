import styled from 'styled-components';

import { shade } from 'polished';

export const Container = styled.button`
  background: #94de5e;
  height: 56px;
  border-radius: 10px;
  border: 0;
  padding: 0 16px;
  color: #312e38;
  width: 100%;
  font-weight: 500;
  margin-top: 16px;
  transition: background-color 0.5s;

  &:hover {
    background-color: ${shade(0.2, '#94de5e')};
  }
`;
