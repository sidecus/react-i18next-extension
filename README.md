# react-i18next-extension

> react-i18next extension to enable loc string loading as objects using decorators

## Install
```Shell
npm install react-i18next-extension
#or
yarn add react-i18next-extension
```

## Usage
### Enabling decorators
You'll need to enable decorators (experimental) for your project.
See detailed [instructions from serializr](https://github.com/mobxjs/serializr#enabling-decorators-optional).

### Define loc string object in your loc strings, e.g. translation.json:
```json
{
  "myComponent": {
    "string1": "locstring1",
    "string2": "locstring2 {{someinterpolationvalue}}"
  }
}
```
### Use ```locSectionName``` decorator and ```useLocStrings``` hook in your component
```tsx
@locSectionName('myComponent')
class MyComponentStrings {
  string1 = '';
  string2 = '';
}
const MyComponent = () => {
    const strings = useLocStrings(MyComponentStrings);
    // or below if you are using interpolation - second param is the same as that of t function
    // const strings = useLocStrings(
    //    MyComponentStrings,
    //    { someinterpolationvalue: 'bla' }
    // );
    return <div>{strings.string1}</div>;
}
```

# Happy coding. Peace.
MIT © [sidecus](https://github.com/sidecus)
