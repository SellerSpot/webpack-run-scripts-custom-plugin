[![Sellerspot npm package publish](https://github.com/SellerSpot/webpack-run-scripts-custom-plugin/actions/workflows/npm-publish.yml/badge.svg)](https://github.com/SellerSpot/webpack-run-scripts-custom-plugin/actions/workflows/npm-publish.yml)

# Webpack Run Scripts Custom Plugin

## To install

`npm i @sellerspot/webpack-run-scripts-custom-plugin`

## usage

```typescript
plugins: [
    new WebpackCustomRunScriptsPlugin({
        command: '<- your command ->',
        allowOnException?: boolean;
        allownOnError?: boolean;
    })
];
```

## Development flow

-   `npm run dev`

## To build

-   `npm run bulid`

## Linting

-   `npm run lint` | `npm run lint:fix`

## package build and deploy flow

1. build locally using `npm run build`
2. link locally with npm `npm link` - this will add the package to local npm repositoy
3. use the `npm install <directory-output-from-above-command-output>` in any project and do checks
4. if everything ok, do `npm version <version-type> -m <changes-log-message-string>` => note:- version-type will be one of these `major | minor | patch`
5. then run `npm publish --access public` note:- this needs authentication - should be the dev team member in npm.
