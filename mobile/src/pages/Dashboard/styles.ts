import styled from 'styled-components/native';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';

export const Container = styled.View`
  flex: 1;
`;

export const Header = styled.View`
  padding: 24px;
  padding-top: ${getStatusBarHeight()}px;
  background: #28262e;

  flex-direction: row;
  justify-content: space-between;
`;

export const HeaderTitle = styled.Text`
  color: #f4ede8;
  font-size: 20px;
  font-family: 'RobotoSlab-Regular';
  line-height: 28px;
`;

export const UserName = styled.Text`
  color: #94de5e;
  font-family: 'RobotoSlab-Medium';
`;

export const ProfileButton = styled.TouchableOpacity``;

export const UserAvatar = styled.Image`
  width: 60px;
  height: 60px;
  border-radius: 30px;
`;
