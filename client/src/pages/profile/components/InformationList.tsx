import { ReactElement } from "react";

export default function InformationList({
  list,
  title,
}: {
  list: string[];
  title: string;
}): ReactElement {
  return (
    <div className="mb-3">
      <h5 className="text-muted">{title}</h5>
      {list.length === 0 && <p>There is no any {title.toLowerCase()} yet</p>}
      {list.length > 0 &&
        list.map((elem: string) => (
          <span key={elem} className="badge bg-info">
            {elem}
          </span>
        ))}
    </div>
  );
}
