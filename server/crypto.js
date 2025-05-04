import CryptoJS from 'crypto-js';

const { PASSPHRASE } = process.env;

export const encryptPass = (passwort) => {
    const cryptPassword = CryptoJS.AES.encrypt(passwort, PASSPHRASE).toString();

    return cryptPassword;
}

export const dectyptPass = (passwort) => {
    const bytes = CryptoJS.AES.decrypt(passwort, PASSPHRASE);
    const decryptedPass = bytes.toString(CryptoJS.enc.Utf8);

    return decryptedPass;
}