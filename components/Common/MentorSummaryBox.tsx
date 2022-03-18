import style from "./MentorSummaryBox.module.scss";

interface Props {
  mentor_name: string;
  mentor_introduce: string;
  mentor_profile_image_url: string;
  mentor_organization?: string;
  mentor_github_url?: string;
  mentor_email?: string;
  mentor_kakao_id?: string;
}

const MentorSummaryBox = (props: Props) => {
  return (
    <div className={style.container}>
      <div className={style.mentor_img_wrapper}>
        <img src={props.mentor_profile_image_url} />
      </div>
      <div className={style.mentor_info_wrapper}>
        <div className={style.mentor_name}>{props.mentor_name} 멘토</div>
        <div className={style.mentor_descript}>{props.mentor_introduce}</div>
      </div>
    </div>
  );
};
export default MentorSummaryBox;
