import { notion_types } from "@types";
import dynamic from "next/dynamic";
import Bookmark from "./Bookmark";
import BulletedListItem from "./BulletedListItem";
import Callout from "./Callout";
import ColumnList from "./ColumnList";
import Heading from "./Heading";
import NotionImage from "./NotionImage";
import NumberedListItem from "./NumberedListItem";
import Paragraph from "./Paragraph";
import style from "./Block.module.scss";
import Divider from "./Divider";
import NotionEmbed from "./NotionEmbed";

interface BlockProps {
  block: notion_types.Block;
}

const Code = dynamic(() => import("./Code"), { ssr: false });

const renderBlock = (block: notion_types.Block) => {
  switch (block.type) {
    case "paragraph":
      return <Paragraph {...block} />;
    case "heading_1":
    case "heading_2":
    case "heading_3":
      return <Heading {...(block as notion_types.HeadingItem)} />;
    case "code":
      return <Code {...(block as notion_types.CodeItem)} />;
    case "column_list":
      return <ColumnList {...(block as notion_types.ColumnListItem)} />;
    case "bookmark":
      return <Bookmark {...(block as notion_types.BookmarkItem)} />;
    case "bulleted_list_item":
      return <BulletedListItem {...(block as notion_types.BulletedListItem)} />;
    case "numbered_list_item":
      return <NumberedListItem {...(block as notion_types.NumberedItemList)} />;
    case "callout":
      return <Callout {...(block as notion_types.CalloutItem)} />;
    case "image":
      return <NotionImage {...(block as notion_types.ImageItem)} />;
    case "embed":
      return <NotionEmbed {...(block as notion_types.EmbedItem)} />;
    case "divider":
      return <Divider />;
    default: {
      return (
        <div>
          empty block :{block.id} {block.type}
        </div>
      );
    }
  }
};

const Block = ({ block }: BlockProps) => {
  const { id, type } = block;
  const idBase = `${id}-${type}`;

  return <div className={style.block}>{renderBlock(block)}</div>;
};

// switch (type) {

//   case "bulleted_list_item":
//   case "numbered_list_item":
//     return <li>{value.text}</li>;
//   case "to_do":
//     return (
//       <div>
//         <label htmlFor={id}>
//           <input type="checkbox" id={id} defaultChecked={value.checked} />{" "}
//           {value.text}
//         </label>
//       </div>
//     );

//   case "child_page":
//     return <p>{value.title}</p>;
//   case "image":
//     const src =
//       value.type === "external" ? value.external.url : value.file.url;
//     const caption = value.caption ? value.caption[0].plain_text : "";
//     return (
//       <figure>
//         <img src={src} alt={caption} />
//         {caption && <figcaption>{caption}</figcaption>}
//       </figure>
//     );
//   default:
//     return `❌ Unsupported block (${
//       type === "unsupported" ? "unsupported by Notion API" : type
//     })`;
// }
export default Block;
