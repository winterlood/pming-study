import { Empty, EmptyProps } from "antd";

interface Props extends EmptyProps {
  type: "STUDY_ITEM" | "POST_ITEM" | "STUDY_TOTAL";
}

const getDescription = (type: Props["type"]) => {
  switch (type) {
    case "STUDY_ITEM": {
      return (
        <div>
          아직 스터디가 없습니다 <br />
          조금만 기다려주세요!
        </div>
      );
    }
    case "POST_ITEM": {
      return (
        <div>
          아직 포스트가 없습니다 <br />
          조금만 기다려주세요!
        </div>
      );
    }
    case "STUDY_TOTAL": {
      return (
        <div>
          아직 포스트가 없습니다 <br />
          조금만 기다려주세요!
        </div>
      );
    }
    default: {
      return "데이터가 없습니다";
    }
  }
};

const EmptyBlock = (props: Props) => {
  const description = props.description || getDescription(props.type);
  return <Empty {...props} description={description} />;
};
export default EmptyBlock;
