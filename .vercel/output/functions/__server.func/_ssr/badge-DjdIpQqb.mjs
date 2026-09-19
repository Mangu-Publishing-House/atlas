import { x as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { b as cn } from "./router-CuAIWwh2.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/badge-DjdIpQqb.js
var import_jsx_runtime = require_jsx_runtime();
function Badge({ className, tone = "muted", children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: cn("inline-flex items-center rounded-full border px-2 py-0.5 text-[0.6875rem] font-medium tracking-wide", {
			muted: "bg-elevated text-muted border-border",
			accent: "bg-accent/15 text-accent border-accent/30",
			ok: "bg-ok/15 text-ok border-ok/30",
			warn: "bg-warn/15 text-warn border-warn/30",
			danger: "bg-danger/15 text-danger border-danger/30",
			paper: "bg-paper/10 text-paper border-paper/20"
		}[tone], className),
		children
	});
}
//#endregion
export { Badge as t };
