// @flow
import { type Element } from "react";
import { createConfirm, setConfirm } from "./react-confirm-decorator";

import ConfirmDialog from "../components/ui/ConfirmDialog";

type Props = {
  title?: string,
  content?: Element<any> | string,
  yesLabel?: string,
  noLabel?: string
};

export default function confirm(props: Props) {
  const dialog = setConfirm(ConfirmDialog);
  return createConfirm(dialog, props);
}
