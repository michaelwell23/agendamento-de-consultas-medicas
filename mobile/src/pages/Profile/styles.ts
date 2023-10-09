import styled from 'styled-components/native';
import { Platform } from 'react-native';

export const Container = styled.View`
  flex: 1;
  justify-content: center;
  padding: 40px 30px ${Platform.OS === 'android' ? 150 : 40}px;
  position: relative;
`;

export const Title = styled.Text`
  font-size: 20px;
  color: #f4ede8;
  font-family: 'RobotoSlab-Medium';
  margin: 24px 0;
`;

export const Header = styled.View`
  margin-top: 15px;
  flex-direction: row;
  justify-content: space-between;
`;

export const BackButton = styled.TouchableOpacity``;

export const SignOutButton = styled.TouchableOpacity``;

export const UserAvatarButton = styled.TouchableOpacity`
  margin-top: 32px;
`;

export const UserAvatar = styled.Image`
  width: 166px;
  height: 166px;
  border-radius: 98px;

  align-self: center;
`;
