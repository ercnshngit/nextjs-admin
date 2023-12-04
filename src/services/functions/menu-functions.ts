export class MenuFunctions {
    async convertTurkishWords(text: string) {
        const turkishChars = 'çğıöşüÇĞİÖŞÜ ';
        const englishChars = 'cgiosuCGIOSU-';

        let result = '';

        for (let i = 0; i < text.length; i++) {
            const char = text[i];
            const index = turkishChars.indexOf(char);

            if (index !== -1) {
                result += englishChars[index];
            } else {
                result += char === ' ' ? '-' : char;
            }
        }

        return result.toLowerCase();
    }

    async slugCreator(value: string) {
        const tr = await this.convertTurkishWords(value);
        const slug = tr
            .toLowerCase()
            .replace(/[\s_-]+/g, '-')
            .trim();

        return slug;
    }
}