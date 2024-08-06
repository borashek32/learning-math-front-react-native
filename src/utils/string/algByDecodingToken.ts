import { decode as base64Decode } from 'base-64';

export const algByDecodingToken = async (accessToken: string) => {
  if (!accessToken) {
    throw new Error('Access token not found in AsyncStorage');
  }

  const payloadBase64 = accessToken.split('.')[1];
  const payloadString = base64Decode(payloadBase64);
  const payload = JSON.parse(payloadString);

  const expirationTime = payload.exp;
  const dateOfExpiration = new Date(expirationTime * 1000);

  const isExpirationTimeLongerThanCurrent = expirationTime > Date.now() / 1000;

  return {
    isExpirationTimeLongerThanCurrent,
    dateOfExpiration,
  };
};
