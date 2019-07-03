# PigmentJS :pig_nose: :candy: [![CircleCI](https://circleci.com/gh/JamesToohey/pigmentjs/tree/master.svg?style=svg)](https://circleci.com/gh/JamesToohey/pigmentjs/tree/master)

### [Temporary Documentation](https://github.com/JamesToohey/pigmentjs/blob/master/docs/documentation.md)

# NOTE: PigmentJS is under development and subject to change wildly at any time. 


A zero-dependency colour creation, organisation, and manipulation library built for web developers.

### Running Locally

1. Install packages
```
npm i -g recursive-install && npm-recursive-install
```
2. Link the package into docs. This means we don't need to install pigmentjs from npm when testing locally
```
npm run link
```
3. Run the docs
```
cd docs && npm start
```


### Deploying

1. Bump verion number
```
npm version [major|minor|patch]
```
2. Build and publish
```
npm publish
```
3. Unlink, bump version in docs/package.json, npm install and test new version in docs
```
cd docs/ && npm unlink
```
