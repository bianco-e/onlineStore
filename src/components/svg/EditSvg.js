import * as React from "react";

export default function EditSvg(props) {
  return (
    <svg viewBox="0 0 100 100" width={17} height={17} {...props}>
      <path d="M97.189 16.773L84.355 3.938a1.731 1.731 0 00-2.45 0l-8.251 8.251-36.67 36.669-3.668 3.667a1.724 1.724 0 00-.426.702L26.932 72.02a1.733 1.733 0 002.175 2.175l18.792-5.958c.265-.083.506-.23.702-.426l3.667-3.667 36.67-36.669 8.25-8.25a1.733 1.733 0 000-2.452zM46.45 65.06l-15.203 4.82 4.821-15.204 2.142-2.142L48.594 62.92zm4.594-4.594L40.66 50.083l34.22-34.219 10.384 10.384zm36.669-36.67L77.329 13.415l5.8-5.8 10.384 10.384z" />
      <path d="M87.084 46.525c-.958 0-1.733.777-1.733 1.733v45.056H5.636V15.332h46.79a1.732 1.732 0 100-3.465H3.902c-.956 0-1.733.776-1.733 1.733v81.447c0 .959.777 1.733 1.733 1.733h83.181c.958 0 1.733-.774 1.733-1.733V48.258c0-.958-.775-1.733-1.733-1.733z" />
    </svg>
  );
}
