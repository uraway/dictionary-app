// @flow
import { type Element } from "react";
import { createConfirm, setConfirm } from "./react-confirm-decorator";

import AlertDialog from "../components/ui/AlertDialog";

type Props = {
  title?: string,
  content?: Element<any> | string,
  yesLabel?: string
};

export default function alert(props: Props) {
  const dialog = setConfirm(AlertDialog);
  return createConfirm(dialog, props);
}
