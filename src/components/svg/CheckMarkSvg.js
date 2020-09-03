import * as React from "react";

export default function CheckMarkSvg(props) {
  return (
    <svg viewBox="0 0 24 24" fill="white" width={10} height={16} {...props}>
      <path
        clipRule="evenodd"
        d="M21.652 3.211a.747.747 0 00-1.061 0L9.41 14.34a.744.744 0 01-1.062 0L3.449 9.351a.743.743 0 00-1.062 0L.222 11.297a.751.751 0 00.001 1.07l4.94 5.184c.292.296.771.776 1.062 1.07l2.124 2.141a.751.751 0 001.062 0l14.366-14.34a.762.762 0 000-1.071l-2.125-2.14z"
        fillRule="evenodd"
      />
    </svg>
  );
}
