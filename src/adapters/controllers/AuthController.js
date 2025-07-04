class AuthController {
  constructor(signInUseCase, refreshTokenUseCase) {
    this.signInUseCase = signInUseCase;
    this.refreshTokenUseCase = refreshTokenUseCase;
  }

  async signIn(req, res, next) {
    try {
      const { username, password } = req.body;
      const { user, token, expiresIn, refreshToken, expireRefreshIn, expiresAt, expiresAtRefresh } = await this.signInUseCase.execute({ username, password });
      delete user.password;
      res.json({ user, token, expiresIn, refreshToken, expiresAt, expireRefreshIn, expiresAtRefresh });
    } catch (err) {
      res.status(401).json({ message: err.message });
    }
  }

  async refreshToken(req, res, next) {
    try {
      const { refreshToken } = req.body;
      const { newToken, expiresIn, newRefreshToken, expireRefreshIn, expiresAt, expiresAtRefresh } = await this.refreshTokenUseCase.execute(refreshToken);
      res.json({ newToken, expiresIn, newRefreshToken, expireRefreshIn, expiresAt, expiresAtRefresh });
    } catch (err) {
      res.status(401).json({ message: err.message });
    }
  }
}

module.exports = AuthController;
