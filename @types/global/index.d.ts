declare module "@types" {
  export namespace notion_types {
    interface Database {
      db: {
        results: Page[];
      };
      [Key: string]: any;
    }

    interface Block {
      archived: boolean;
      created_time: string;
      has_children: boolean;
      id: string;
      last_edited_time: string;
      object: string;
      type: string;
      properties: {
        [key: string]: any;
      };
      [key: string]: any;
    }

    interface BlockItemBase {
      id: string;
      childComponent?: ReactNode;
    }

    interface BlockWithChildren extends Block {
      has_children: true;
      children: Object;
    }

    interface BlockWithoutChildren extends Block {
      has_children: false;
    }

    interface User extends Block {
      type: "person";
      avatar_url: string;
      name: string;
      person: {
        email: string;
      };
    }

    interface Page {
      archived: boolean;
      cover: {
        type: string;
        file: {
          expiry_time: string;
          url: string;
        };
      };
      created_time: string;
      icon: string;
      id: string;
      last_edited_time: string;
      object: string;
      parent: {
        type: string;
        database_id: string;
      };
      properties: {
        onboard: PageProperty["checkbox"];
        [key: string]: any;
      };
      [key: string]: any;
    }

    type PagePropertyType =
      | "title"
      | "rich_text"
      | "text"
      | "date"
      | "select"
      | "url"
      | "relation"
      | "checkbox"
      | "rollup";

    interface PageProperty {
      title: { type: "title"; title: TextItemBase[] };
      rich_text: { type: "rich_text"; rich_text: TextItemBase[] };
      text: { type: string; [key: string]: TextItemBase[] };
      date: { type: "date"; date: { start: string; end: string } };
      select: { type: "select"; select: { name: string } };
      url: { type: "url"; url: string };
      relation: { type: "relation"; relation: { id: string }[] };
      checkbox: { type: "checkbox"; checkbox: boolean };
      rollup: {
        type: "rollup";
        rollup:
          | { type: "array"; array: PagePropertyItem[] }
          | { type: "number"; number: string };
      };
    }

    type PagePropertyItem =
      | PageProperty["title"]
      | PageProperty["rich_text"]
      | PageProperty["text"]
      | PageProperty["date"]
      | PageProperty["select"]
      | PageProperty["url"]
      | PageProperty["relation"]
      | PageProperty["checkbox"]
      | PageProperty["rollup"];

    // APPLY PAGE
    interface PageWithApplyProperty {
      apply_date: PageProperty["date"];
      applicant_name: PageProperty["text"];
      applicant_email: PageProperty["text"];
      applicant_phone_number: PageProperty["text"];
      applicant_reason: PageProperty["text"];
      applicant_github_url: PageProperty["url"];
    }
    interface PageWithApply extends Page {
      properties: PageWithApplyProperty;
    }

    // MENTOR PAGE
    interface PageWithMentorProperty {
      mentor_name: PageProperty["rollup"];
      mentor_profile_image_url: PageProperty["rollup"];
      mentor_introduce: PageProperty["rollup"];
      mentor_organization: PageProperty["rollup"];
      mentor_github_url: PageProperty["rollup"];
      mentor_email: PageProperty["rollup"];
      mentor_kakao_id: PageProperty["rollup"];
    }
    interface PageWithMentor extends Page {
      properties: PageWithMentorProperty;
    }

    // STUDY PAGE (rollup with mentor)
    interface PageWithStudyProperty extends PageWithMentorProperty {
      study_apply_end_date: PageProperty["date"];
      study_introduce: PageProperty["text"];
      study_max_member_count: PageProperty["select"];
      study_name: PageProperty["text"];
      study_start_date: PageProperty["date"];
      study_status: PageProperty["select"];
      udemy_lecture_name: PageProperty["text"];
      udemy_lecture_thumbnail_url: PageProperty["url"];
      udemy_lecture_url: PageProperty["url"];
      apply_count: PageProperty["text"];
    }
    interface PageWithStudy extends Page, PageWithMentor {
      properties: PageWithStudyProperty;
    }

    // POST PAGE (rollup with study)
    interface PageWithPostProperty {
      post_title: PageProperty["text"];
      related_study: PageProperty["relation"];
    }
    interface PageWithPost extends Page {
      properties: PageWithPostProperty;
    }

    interface TextItemBase {
      plain_text: string;
      annotations: {
        bold: boolean;
        code: boolean;
        color: string;
        italic: boolean;
        strikethrough: boolean;
        underline: boolean;
        [option: string]: string | boolean;
      };
      text: {
        content: string;
        link: string;
      };
    }

    interface ParagraphItem extends Block {
      paragraph: {
        text: TextItemBase[];
        children?: Block[];
      };
    }

    interface HeadingBase extends Block {
      type: "heading_1" | "heading_2" | "heading_3";
    }
    interface HeadingOneItem extends HeadingBase {
      heading_1: {
        text: TextItemBase[];
        children?: Block[];
      };
    }
    interface HeadingTwoItem extends HeadingBase {
      heading_2: {
        text: TextItemBase[];
        children?: Block[];
      };
    }
    interface HeadingThreeItem extends HeadingBase {
      heading_3: {
        text: TextItemBase[];
        children?: Block[];
      };
    }
    type HeadingItem = HeadingOneItem | HeadingTwoItem | HeadingThreeItem;

    interface CodeItem extends Block {
      code: {
        caption: any[];
        language: string;
        text: TextItemBase[];
      };
    }

    interface ColumnItem extends Block {
      column: {
        children: Block[];
      };
    }

    interface ColumnListItem extends Block {
      column_list: {
        children: ColumnItem[];
      };
    }

    interface BookmarkItem extends Block {
      bookmark: {
        caption: any[];
        url: string;
      };
    }

    interface CalloutItem extends Block {
      callout: {
        icon: {
          type: string;
          [other: string]: string;
        };
        text: TextItemBase[];
      };
    }

    // FOR IMAGE BLOCK
    interface ImagePropertyBase {
      caption: TextItemBase[];
      type: "external" | "file";
    }
    interface ImagePropertyWithExternal extends ImagePropertyBase {
      type: "external";
      external: {
        url: string;
      };
    }
    interface ImagePropertyWithFile extends ImagePropertyBase {
      type: "file";
      file: {
        expiry_time: string;
        url: string;
      };
    }
    interface ImageItem extends Block {
      image: ImagePropertyWithExternal | ImagePropertyWithFile;
    }

    type ImageItem = ImageItemWithExternal | ImageItemWithFile;

    interface BulletedListItem extends Block {
      bulleted_list_item: {
        text: TextItemBase[];
      };
    }

    interface NumberedItemList extends Block {
      numbered_list_item: {
        text: TextItemBase[];
      };
    }

    interface EmbedItem extends Block {
      embed: {
        caption: TextItemBase[];
        url: string;
      };
    }
  }
  export namespace app_types {
    // 가공된 페이지
    interface PageWithProcessed {
      id: string;
      last_edited_time: string;
      cover: string;
      url: string;
      created_time: string;
      pageTitle: string;
      pageAnnotations: any;
      study_lecture: string;
      study_topic_list: string[];
    }

    type PageList = PageWithProcessed[];

    interface PageDetail {}

    interface ProcessedLectureItem {
      id: string;
      name: string;
      thumbnailUrl: string;
    }

    interface ProcessedPostItem {
      id: string;
      name: string;
      thumbnailUrl: string;
    }

    interface ClassifiedLectureItem {
      id: string;
      name: string;
      thumbnailUrl: string;
    }

    type StudyStatus = "NOTUTOR" | "READY" | "OPEN" | "INPROGRESS" | "CLOSE";

    /*
     * PAGE TYPES
     */

    type PathOnlyPageList = { id: string }[];

    interface ProcessedPage {
      id: string;
      last_edited_time: string;
      cover: any;
      created_time: string;
      properties: {
        [key: string]: any;
      };
      [key: string]: any;
    }

    interface ProcessedPageWithMentor extends ProcessedPage {
      mentor_name: string;
      mentor_profile_image_url: string;
      mentor_introduce: string;
      mentor_organization: string;
      mentor_github_url: string;
      mentor_email: string;
      mentor_kakao_id: string;
    }

    interface ProcessedPageWithStudy
      extends ProcessedPage,
        ProcessedPageWithMentor {
      study_apply_end_date: string;
      study_introduce: string;
      study_max_member_count: string;
      study_name: string;
      study_start_date: string;
      study_status: StudyStatus;
      udemy_lecture_name: string;
      udemy_lecture_thumbnail_url: string;
      udemy_lecture_url: string;
      apply_count: string;
    }

    interface PageWithPost extends ProcessedPage {
      properties: {
        post_title: { type: string; [key: string]: TextItemBase[] };
        related_study: { relation: { id: string }[] } | null;
      };
    }

    interface ProcessedPageWithStudyPost extends PageWithPost {
      post_title: string;
    }

    interface ProcessedPageWithStudyPostWithRelatedStudy
      extends ProcessedPageWithStudyPost {
      related_study: ProcessedPageWithStudy;
    }
  }

  export namespace api_types {
    interface StudyApplyRequestBody {
      target_study_id: string;
      applicant_name: string;
      applicant_email: string;
      applicant_phone_number: string;
      applicant_reason: string;
      applicant_github_url: string;
    }
  }
}
