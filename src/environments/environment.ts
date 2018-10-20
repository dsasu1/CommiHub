// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
 // apiUrl: "http://localhost:52368/api/",
  apiUrl: "https://propertyserviceapi.azurewebsites.net/api/",
  apikey: "C7684DB8-09C8-4702-828A-10323CCEF248",
  appName: "CommiHub",
  azurePhotosUrl: "https://docsas.blob.core.windows.net/photos/",
  pushPublickKey : "BK5MnyIQ30Lfg87H3kvi-HsduIz0FmOuS2ysY-N9q-Au_L2Yauj46DUFuKQoT6zcibbweBMgCK4cbDUkbYw6ex0"

};
