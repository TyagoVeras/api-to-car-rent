class AuthConfig {
  private static secretToken = '12345678910';

  private static expiresInToken = '15m';

  private static secretRefreshToken = '65464564';

  private static expiresInRefreshToken = '30d';

  static getSecretToken() {
    return this.secretToken;
  }

  static getExpiresInToken() {
    return this.expiresInToken;
  }

  static getSecretRefreshToken() {
    return this.secretRefreshToken;
  }

  static getExpiresInRefreshToken() {
    return this.expiresInRefreshToken;
  }
}

export { AuthConfig };
