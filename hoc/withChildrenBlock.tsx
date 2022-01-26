import { ComponentType } from "react";
import Block from "../NotionComponent/Block";

const withChildrenBlock = (WrappedComponent) => {
  // eslint-disable-next-line react/display-name
  return ({ ...props }: { has_children: boolean; [other: string]: any }) => {
    return (
      <WrappedComponent
        {...props}
        childComponent={
          props.has_children &&
          props[props.type].children.map((it) => (
            <Block key={it.id} block={it} />
          ))
        }
      />
    );
  };
};

export default withChildrenBlock;
