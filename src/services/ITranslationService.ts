export interface ITranslationService {
  getTextTranslation(
    text: string,
    sourceLang?: string,
    targetLang?: string
  ): Promise<string>;
}
