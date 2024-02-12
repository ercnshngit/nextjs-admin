"use client";

import EditableContent from "@/block-renderer/utils/editable-content";
import CounterAnimated from "@/libs/counter-animated";
import { Edit } from "lucide-react";

export default function ConvalNumbers({
  number1,
  title1,
  number2,
  title2,
  number3,
  title3,
  number4,
  title4,
}: {
  number1: number;
  title1: string;
  number2: number;
  title2: string;
  number3: number;
  title3: string;
  number4: number;
  title4: string;
}) {
  return (
    <div className="w-full bg-[#F2F3F4]">
      <div
        className={
          "mt-8 flex flex-col flex-wrap items-center justify-evenly  gap-5 bg-[#F2F3F4] py-8 2xl:flex-row"
        }
      >
        <div className="container grid w-full grid-cols-2 gap-5 md:grid-cols-4">
          <EditableContent
            typeName="number"
            propName={"number1"}
            propValue={number1}
          />
          <EditableContent
            typeName="text"
            propName={"title1"}
            propValue={title1}
          />
          <EditableContent
            typeName="number"
            propName={"number2"}
            propValue={number2}
          />
          <EditableContent
            typeName="text"
            propName={"title2"}
            propValue={title2}
          />
          <EditableContent
            typeName="number"
            propName={"number3"}
            propValue={number3}
          />
          <EditableContent
            typeName="text"
            propName={"title3"}
            propValue={title3}
          />
          <EditableContent
            typeName="number"
            propName={"number4"}
            propValue={number4}
          />
          <EditableContent
            typeName="text"
            propName={"title4"}
            propValue={title4}
          />
          <CounterAnimated
            from={0}
            to={number1}
            description={title1}
            title={title1}
            duration={10}
          />

          <CounterAnimated
            from={0}
            to={number2}
            description={title2}
            title={title2}
            duration={10}
          />
          <CounterAnimated
            from={0}
            to={number3}
            description={title3}
            title={title3}
            duration={10}
          />
          <CounterAnimated
            from={0}
            to={number4}
            description={title4}
            title={title4}
            duration={10}
          />
        </div>
      </div>
    </div>
  );
}
