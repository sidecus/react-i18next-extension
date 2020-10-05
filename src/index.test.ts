import i18n from 'i18next';
import { locSectionName, useLocStrings } from './index';
import { renderHook } from '@testing-library/react-hooks';
import { initReactI18next } from 'react-i18next';

// init i18n with test
i18n
  .use(initReactI18next)
  .init({
  lng: 'en',
  fallbackLng: 'en',
  resources: {
    en: {
      translation: {
        feature1: {
          string1: 'subFeature11',
          string2: 'subFeature12 {{user}}'
        }
      }
    },
  }
});

@locSectionName('feature1')
class Feature1 {
  string1 = '';
  string2 = '';
}

@locSectionName('feature2')
class Feature2 {
  string1 = '';
  string2 = '';
}

class Feature3 {
  string1 = '';
}

describe('Loc string object loading', () => {
  it('loads loc string objects correctly', () => {
    const { result } = renderHook(() => useLocStrings(Feature1));
    expect(result.current.string1).toBe('subFeature11');
    expect(result.current.string2).toBe('subFeature12 ');
  });

  it('loads strings with interpolation correctly', () => {
    const { result } = renderHook(() => useLocStrings(Feature1, { user: 'user'}));
    expect(result.current.string1).toBe('subFeature11');
    expect(result.current.string2).toBe('subFeature12 user');
  });

  it('returns undefined if section is not defined', () => {
    const { result } = renderHook(() => useLocStrings(Feature2));
    expect(result.current.string1).toBeUndefined();
  });

  it('throws if class is not decorated with @locSectionName', () => {
    const { result } = renderHook(() => useLocStrings(Feature3));
    expect(result.error.message).toBe('Feature3 is not decorated with @locSectionName');
  });
});