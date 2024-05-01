import flatten from "flat";
import React from "react"; // Load the default messages.

import defaultEnglishMessages from "../i18n/en-US.yml"; // HACK: We should flatten the messages loaded above because
// the YAML loaders behave differently between webpack and our version of jest:
// - the yaml loader for webpack returns a nested object,
// - the yaml loader for jest returns messages with flattened ids.

export var defaultMessages = flatten(defaultEnglishMessages);
export function strongText(content) {
  return /*#__PURE__*/React.createElement("strong", null, content);
}
//# sourceMappingURL=util.js.map