'use client';

import Pane from "./pane";
import { H2 } from "./pane-elements";

export default function Unavailable() {
  return (
    <Pane><H2>Информация недоступна.</H2></Pane>
  )
}
