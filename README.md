# VersusVirus: An exchange platform between providers and consumers of medical equipments

deploy locally

``` sh
pushd client
yarn build
yarn install
popd

docker build -t versusvirus .
docker run -i -t -p 8080:8080 versusvirus
```
