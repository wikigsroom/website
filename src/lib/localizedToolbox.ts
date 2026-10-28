export type LocaleCode = 'en-US' | 'zh-CN';

export type LocalizedText = string | Partial<Record<LocaleCode, string>>;

export type LocalizedTag = {
  id: string;
  label: LocalizedText;
};

export type LocalizedCategory = {
  id: string;
  label: LocalizedText;
};

export type LocalizedTool = {
  id: string;
  name: LocalizedText;
  category?: string | LocalizedCategory;
  vendor?: LocalizedText;
  website?: string;
  description?: LocalizedText;
  tags?: Array<string | LocalizedTag>;
  sources?: string[];
};

export const resolveLocale = (language: string): LocaleCode =>
  language === 'zh-CN' ? 'zh-CN' : 'en-US';

export const getLocalizedText = (value: LocalizedText | undefined, language: string) => {
  if (!value) return '';
  if (typeof value === 'string') return value;

  const locale = resolveLocale(language);
  return value[locale] || value['en-US'] || value['zh-CN'] || '';
};

export const getCategoryId = (category: LocalizedTool['category']) => {
  if (!category) return 'other';
  return typeof category === 'string' ? category : category.id;
};

export const getCategoryLabel = (category: LocalizedTool['category'], language: string) => {
  if (!category) return language === 'zh-CN' ? '其他' : 'Other';
  return typeof category === 'string' ? category : getLocalizedText(category.label, language);
};

export const getTagLabel = (tag: string | LocalizedTag, language: string) => {
  if (typeof tag === 'string') return tag;
  return getLocalizedText(tag.label, language);
};
