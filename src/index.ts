import { useTranslation } from 'react-i18next';

/**
 * Loc string class type
 * @template T LocStrings class
 */
interface LocStringsClass<T extends object> extends Function {
  new (): T;
}

/**
 * locKeyName decorator, used to decorate LocString classes
 * @param keyName json loc string key name
 */
export function locSectionName<T extends object>(keyName: string) {
  return (type: LocStringsClass<T>) => {
    type.prototype._locSectionName = keyName;
  };
}

/**
 * Given a class (decorated with locKeyName), get it's loc string section key name.
 * @param type The loc strings class
 */
const getSectionName = <T extends object>(type: LocStringsClass<T>): string => {
  const result = type.prototype._locSectionName;
  if (result === undefined) {
    throw new Error(`${type.name} is not decorated with @locSectionName`);
  }
  return result;
};

/**
 * Custom hooks to load a section of strings as objects
 * @template T LocStrings class, decorated with locKeyName decorator.
 * @param type LocStrings class type, decorated with locKeyName decorator.
 * @param options string inerpolation options
 */
export const useLocStrings = <T extends {}>(type: LocStringsClass<T>, options?: object) => {
  const { t } = useTranslation();
  return t<T>(getSectionName(type), { ...options, returnObjects: true });
};
