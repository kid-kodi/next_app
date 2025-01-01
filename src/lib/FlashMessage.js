import { useContext } from "react";
import { FlashContext } from "../contexts/FlashProvider";

export default function FlashMessage() {
  const { flashMessage, visible, hideFlash } = useContext(FlashContext);

  return (
    <>
      {visible && (
        <div
          className={`alert alert-${flashMessage.type} alert-dismissible m-0 rounded-0`}
          role="alert"
        >
          <div className="text-center">{flashMessage.message}</div>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="alert"
            aria-label="Close"
            onClick={hideFlash}
          ></button>
        </div>
      )}
    </>
  );
}
