import { api_types } from "@types";
import { Button, Drawer, Input, Tooltip } from "antd";
import Icon from "components/Common/Icon";
import React, {
  ReactNode,
  RefObject,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import style from "./ApplyStudyDrawer.module.scss";

// ANTD

// COMPS

// STATICS

// TYPES

const ApplyInputWrapper = ({
  title,
  descript,
  children,
}: {
  title: string;
  descript: string;
  children: ReactNode;
}) => {
  return (
    <div className={style.apply_input_container}>
      <div className={style.head_wrapper}>
        <div className={style.title}>{title}</div>
        <div className={style.tooltip_wrapper}>
          설명&nbsp;&nbsp;
          <Tooltip title={descript}>
            <Icon icon={"QuestionCircleOutlined"} />
          </Tooltip>
        </div>
      </div>
      <div className={style.input_wrapper}>{children}</div>
    </div>
  );
};

type State = Partial<api_types.StudyApplyRequestBody>;

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: any;
}
const initialState: State = {
  applicant_name: "",
  applicant_email: "",
  applicant_kakao_id: "",
  applicant_reason: "",
  applicant_github_url: "",
};
const ApplyStudyDrawer = (props: Props) => {
  const [state, setState] = useState<State>(initialState);
  const nameRef = useRef<HTMLInputElement>();
  const emailRef = useRef<HTMLInputElement>();
  const phoneNumberRef = useRef<HTMLInputElement>();
  const reasonRef = useRef<HTMLInputElement>();
  const gitHubUrlRef = useRef<HTMLInputElement>();

  useEffect(() => {
    if (!props.isOpen) {
      setState(initialState);
    }
  }, [props.isOpen]);

  const isInputValid = () => {
    if (state.applicant_name.length < 1) {
      if (nameRef.current) {
        nameRef.current.focus();
      }
      return false;
    }
    if (state.applicant_email.length < 1) {
      if (emailRef.current) {
        emailRef.current.focus();
      }
      return false;
    }
    if (state.applicant_kakao_id.length < 8) {
      if (phoneNumberRef.current) {
        phoneNumberRef.current.focus();
      }
      return false;
    }
    if (state.applicant_reason.length < 8) {
      if (reasonRef.current) {
        reasonRef.current.focus();
      }
      return false;
    }
    if (state.applicant_github_url.length < 8) {
      if (gitHubUrlRef.current) {
        gitHubUrlRef.current.focus();
      }
      return false;
    }
    return true;
  };

  let submitFlag = false;

  const submitCheck = () => {
    if (submitFlag) {
      return submitFlag;
    } else {
      submitFlag = true;
      return false;
    }
  };

  const handleSubmit = async () => {
    if (submitCheck()) return;
    if (isInputValid()) {
      await props.onSubmit(state);
    }
  };

  const onChange = useCallback((e) => {
    setState((v) => {
      return {
        ...v,
        [e.target.name]: e.target.value,
      };
    });
  }, []);

  return (
    <Drawer
      height={"95%"}
      placement={"bottom"}
      closable={false}
      onClose={props.onClose}
      visible={props.isOpen}
      key={"bottom"}
    >
      <div className={style.container}>
        <div className={style.head}>
          <div>
            <h3>🎯 스터디 지원하기</h3>
          </div>
          <div>
            <span onClick={props.onClose} className={style.close_btn}>
              <Icon icon={"CloseOutlined"} />
            </span>
          </div>
        </div>

        <div className={style.body}>
          <ApplyInputWrapper title={"이름"} descript={"설명"}>
            <Input
              ref={nameRef as unknown as RefObject<Input>}
              name="applicant_name"
              value={state.applicant_name}
              onChange={onChange}
              placeholder="지원자 이름"
            />
          </ApplyInputWrapper>

          <ApplyInputWrapper title={"이메일 주소"} descript={"설명"}>
            <Input
              ref={emailRef as unknown as RefObject<Input>}
              name="applicant_email"
              value={state.applicant_email}
              onChange={onChange}
              placeholder="이메일 주소"
            />
          </ApplyInputWrapper>
          <ApplyInputWrapper title={"카카오톡 아이디"} descript={"설명"}>
            <Input
              ref={phoneNumberRef as unknown as RefObject<Input>}
              name="applicant_kakao_id"
              value={state.applicant_kakao_id}
              onChange={onChange}
              placeholder="카카오톡 아이디"
            />
          </ApplyInputWrapper>
          <ApplyInputWrapper title={"지원 동기"} descript={"설명"}>
            <Input.TextArea
              ref={reasonRef as unknown as RefObject<Input>}
              name="applicant_reason"
              value={state.applicant_reason}
              onChange={onChange}
              placeholder="지원 동기"
            />
          </ApplyInputWrapper>
          <ApplyInputWrapper title={"GitHub 프로필 주소"} descript={"설명"}>
            <Input
              ref={gitHubUrlRef as unknown as RefObject<Input>}
              name="applicant_github_url"
              value={state.applicant_github_url}
              onChange={onChange}
              placeholder="지원자 GitHub 프로필 주소"
            />
          </ApplyInputWrapper>
        </div>
        <div className={style.submit_warpper}>
          <Button onClick={handleSubmit} type={"primary"}>
            지원하기
          </Button>
        </div>
      </div>
    </Drawer>
  );
};

export default ApplyStudyDrawer;
