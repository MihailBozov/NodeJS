/**
 * Synchronously sign the given payload into a JSON Web Token string
 * payload - Payload to sign, could be an literal, buffer or string
 * secretOrPrivateKey - Either the secret for HMAC algorithms, or the PEM encoded private key for RSA and ECDSA.
 * [options] - Options for the signature
 * returns - The JSON Web Token string
 */
export function sign(
    payload: string | Buffer | object,
    secretOrPrivateKey: Secret | PrivateKey,
    options?: SignOptions,
): string;
export function sign(
    payload: string | Buffer | object,
    secretOrPrivateKey: null,
    options?: SignOptions & { algorithm: "none" },
): string;

/**
 * Sign the given payload into a JSON Web Token string
 * payload - Payload to sign, could be an literal, buffer or string
 * secretOrPrivateKey - Either the secret for HMAC algorithms, or the PEM encoded private key for RSA and ECDSA.
 * [options] - Options for the signature
 * callback - Callback to get the encoded token on
 */
export function sign(
    payload: string | Buffer | object,
    secretOrPrivateKey: Secret | PrivateKey,
    callback: SignCallback,
): void;
export function sign(
    payload: string | Buffer | object,
    secretOrPrivateKey: Secret | PrivateKey,
    options: SignOptions,
    callback: SignCallback,
): void;
export function sign(
    payload: string | Buffer | object,
    secretOrPrivateKey: null,
    options: SignOptions & { algorithm: "none" },
    callback: SignCallback,
): void;

/**
 * Synchronously verify given token using a secret or a public key to get a decoded token
 * token - JWT string to verify
 * secretOrPublicKey - Either the secret for HMAC algorithms, or the PEM encoded public key for RSA and ECDSA.
 * [options] - Options for the verification
 * returns - The decoded token.
 */
export function verify(
    token: string,
    secretOrPublicKey: Secret | PublicKey,
    options: VerifyOptions & { complete: true },
): Jwt;
export function verify(
    token: string,
    secretOrPublicKey: Secret | PublicKey,
    options?: VerifyOptions & { complete?: false },
): JwtPayload | string;
export function verify(
    token: string,
    secretOrPublicKey: Secret | PublicKey,
    options?: VerifyOptions,
): Jwt | JwtPayload | string;

/**
 * Asynchronously verify given token using a secret or a public key to get a decoded token
 * token - JWT string to verify
 * secretOrPublicKey - A string or buffer containing either the secret for HMAC algorithms,
 * or the PEM encoded public key for RSA and ECDSA. If jwt.verify is called asynchronous,
 * secretOrPublicKey can be a function that should fetch the secret or public key
 * [options] - Options for the verification
 * callback - Callback to get the decoded token on
 */
export function verify(
    token: string,
    secretOrPublicKey: Secret | PublicKey | GetPublicKeyOrSecret,
    callback?: VerifyCallback<JwtPayload | string>,
): void;
export function verify(
    token: string,
    secretOrPublicKey: Secret | PublicKey | GetPublicKeyOrSecret,
    options: VerifyOptions & { complete: true },
    callback?: VerifyCallback<Jwt>,
): void;
export function verify(
    token: string,
    secretOrPublicKey: Secret | PublicKey | GetPublicKeyOrSecret,
    options?: VerifyOptions & { complete?: false },
    callback?: VerifyCallback<JwtPayload | string>,
): void;
export function verify(
    token: string,
    secretOrPublicKey: Secret | PublicKey | GetPublicKeyOrSecret,
    options?: VerifyOptions,
    callback?: VerifyCallback,
): void;