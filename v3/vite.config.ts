import { pathToFileURL } from "node:url";

const sharedConfigUrl = pathToFileURL("C:/frontend-stack/vite/react-app.mjs").href;
const { createReactViteConfig } = await import(sharedConfigUrl);

export default createReactViteConfig();
//代码语言翻译
