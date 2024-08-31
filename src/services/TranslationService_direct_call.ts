import axios from 'axios';
import { ITranslationService } from './ITranslationService';

// Use Google Cloud functions or Vercel functions those are more secure
export class TranslationService implements ITranslationService {
  authKey = process.env.EXPO_PUBLIC_TRANSLATE_API_KEY;
  sourceLang = 'hu';
  targetLang = 'es';

  async getTextTranslation(
    text: string,
    sourceLang = this.sourceLang,
    targetLang = this.targetLang
  ): Promise<string> {
    const API_KEY = this.authKey;
    const API_URL = 'https://translation.googleapis.com/language/translate/v2';
    const response = await axios.post(`${API_URL}?key=${API_KEY}`, {
      q: text,
      source: sourceLang,
      target: targetLang,
    });
    return response.data.data.translations[0].translatedText;
  }
}
