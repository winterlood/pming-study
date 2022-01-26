import { global_types } from "@types";
import Block from "./Block";
import style from "./Column.module.scss";

interface ColumnProps extends global_types.ColumnItem {}

const Column = (props: ColumnProps) => {
  const { column } = props;
  return (
    <div className={style.column}>
      {column.children.map((it) => (
        <Block key={it.id} block={it} />
      ))}
    </div>
  );
};

export default Column;
