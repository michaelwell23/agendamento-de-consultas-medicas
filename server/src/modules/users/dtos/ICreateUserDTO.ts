export default interface ICreateUserDTO {
  fullName: string;
  cpf: string;
  email: string;
  password: string;
  provider: boolean;
}
