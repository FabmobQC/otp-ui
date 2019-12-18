import React from "react";

const SvgBikestaple = ({ title, ...props }) => (
  <svg viewBox="0 0 390 390" {...props}>
    {title ? <title>{title}</title> : null}
    <path d="M300.9 0H193.4c-16 0-29.1 13.1-29.1 29.1v40.4h-5.7c-16 0-29.1 13.1-29.1 29.1V139h-5.7c-16 0-29.1 13.1-29.1 29.1v40.5h-5.6c-16 0-29.1 13.1-29.1 29.1V390h17.4V237.7c0-6.4 5.3-11.7 11.7-11.7h5.6v94.4h17.4V226h17.4v24.9h17.4V226h49.6c6.4 0 11.7 5.3 11.7 11.7V390h17.4V237.7c0-16-13.1-29.1-29.1-29.1h-49.6v-52.2h17.4v25h17.4v-25h49.6c6.4 0 11.7 5.3 11.7 11.7v152.4h17.4V168.1c0-16-13.1-29.1-29.1-29.1h-49.6V86.9h84.4c6.4 0 11.7 5.3 11.7 11.7V251h17.4V98.6c0-16-13.1-29.1-29.1-29.1h-84.4V29.1c0-6.4 5.3-11.7 11.7-11.7h107.4c6.4 0 11.7 5.3 11.7 11.7v152.3h17.4l.1-152.3c0-16-13.1-29.1-29.1-29.1zM129.5 208.6h-17.4v-40.5c0-6.4 5.3-11.7 11.7-11.7h5.7v52.2zm34.8-69.6h-17.4V98.6c0-6.4 5.3-11.7 11.7-11.7h5.7V139z" />
  </svg>
);

export default SvgBikestaple;
