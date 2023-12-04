import * as bcrypt from 'bcrypt';

export class Encryptor {
    async hashPassword(password: string) {
        const salt = await bcrypt.genSalt();
        const hash = await bcrypt.hash(password, salt);
        return hash;
    }
    async isPasswordCorrect(password: string, hash: string) {
        const isMatch = await bcrypt.compare(password, hash);
        return isMatch;
    }
}