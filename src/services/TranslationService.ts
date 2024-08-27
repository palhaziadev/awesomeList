import axios from 'axios';

export class TranslationService {
  authKey = 'df1cf019-1fb9-48ab-87c4-842c769989c1:fx';
  sourceLang = 'hu';
  targetLang = 'es';

  async getTextTranslation(
    text: string,
    sourceLang = this.sourceLang,
    targetLang = this.targetLang
  ): Promise<string> {
    const res = await axios.get(
      'https://europe-southwest1-list-27ccf.cloudfunctions.net/function-no-auth',
      {
        params: {
          text: text,
        },
      }
    );
    return res.data.text;
  }
}
