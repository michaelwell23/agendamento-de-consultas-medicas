export default interface IHashProvider {
  generateHsh(payload: string): Promise<string>;
  compareHash(payload: string, hashed: string): Promise<boolean>;
}
