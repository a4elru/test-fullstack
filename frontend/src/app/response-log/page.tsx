'use client';

import styled from "styled-components";
import Pane from "@/components/pane";
import { Button, H2, Textarea } from "@/components/pane-elements";
import { clearRequestLog, getRequestLog } from "@/lib/request-log";
import { useState } from "react";

const TextareaHigh = styled(Textarea)`
  height: 500px;
`;

export default function ResponseLog() {
  const [log, setLog] = useState(getRequestLog());
  function update() {
    setLog(getRequestLog());
  }
  function clear() {
    clearRequestLog();
    update();
  }
  return (
    <Pane>
      <H2>История ответов бекенд-сервера</H2>
      <TextareaHigh readOnly value={log}/>
      <br />
      <Button onClick={clear}>Очистить</Button>
      <Button onClick={update}>Обновить</Button>
    </Pane>
  )
}
