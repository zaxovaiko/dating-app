import { AlertComponentPropsWithStyle } from "react-alert";

export default function Alert({
  style,
  options,
  message,
  close,
}: AlertComponentPropsWithStyle) {
  return (
    <div
      className={`alert alert-${
        options.type?.replace("error", "danger") || "primary"
      } mt-1`}
      style={style}
    >
      {message}
      <button
        type="button"
        className="btn-close ms-3"
        data-bs-dismiss="alert"
        onClick={close}
      ></button>
    </div>
  );
}
