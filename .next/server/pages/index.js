const CHUNK_PUBLIC_PATH = "server/pages/index.js";
const runtime = require("../chunks/ssr/[turbopack]_runtime.js");
runtime.loadChunk("server/chunks/ssr/node_modules_next_1b4f7d._.js");
runtime.loadChunk("server/chunks/ssr/node_modules_@mui_material_ab3079._.js");
runtime.loadChunk("server/chunks/ssr/node_modules_@mui_system_esm_183290._.js");
runtime.loadChunk("server/chunks/ssr/node_modules_bdbc77._.js");
runtime.loadChunk("server/chunks/ssr/[root of the server]__56053a._.js");
runtime.loadChunk("server/chunks/ssr/src_pages_Home_module_0fb0b2.css");
module.exports = runtime.getOrInstantiateRuntimeModule("[project]/node_modules/next/dist/esm/build/templates/pages.js { INNER_PAGE => \"[project]/src/pages/index.js [ssr] (ecmascript)\", INNER_DOCUMENT => \"[project]/node_modules/next/document.js [ssr] (ecmascript)\", INNER_APP => \"[project]/src/pages/_app.js [ssr] (ecmascript)\" } [ssr] (ecmascript)", CHUNK_PUBLIC_PATH).exports;
