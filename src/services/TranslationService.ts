import axios from 'axios';
import { ITranslationService } from './ITranslationService';

export class TranslationService implements ITranslationService {
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
