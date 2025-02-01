import { Button } from "@/components/ui/button";
import { createReactInlineContentSpec } from "@blocknote/react";
 
// The Mention inline content.
export const Mention = createReactInlineContentSpec(
  {
    type: "mention",
    propSchema: {
      user: {
        default: "Unknown",
      },
    },
    content: "none",
  },
  {
    render: (props) => (
      <Button disabled={true}  style={{ fontFamily: "Gellix-Medium", paddingTop: '2px !important' }} className="text-white !py-1 !pt-0 !pb-3 rounded-full text-sm h-min" >
      1 {props.inlineContent.props.user} = 12.23 GHS
    </Button>
    ),
  }
);
 