import React from "react";
import EditableContent from "@/block-renderer/utils/editable-content";
import CardComponent from "@/libs/card-component";
export default function LocationCard({
  title1,
  address1,
  phone1,
  title2,
  address2,
  phone2,
  title3,
  address3,
  phone3,
  title4,
  address4,
  phone4,
}: {
  title1: string;
  address1: string;
  phone1: string;
  title2: string;
  address2: string;
  phone2: string;
  title3: string;
  address3: string;
  phone3: string;
  title4: string;
  address4: string;
  phone4: string;
}) {
  return (
    <div className=" mb-5 mt-10 grid h-auto auto-rows-min grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-4">
      <EditableContent typeName="text" propName={"title1"} propValue={title1} />
      <EditableContent
        typeName="richtext"
        propName={"address1"}
        propValue={address1}
      />
      <EditableContent typeName="text" propName={"phone1"} propValue={phone1} />
      <EditableContent typeName="text" propName={"title2"} propValue={title2} />
      <EditableContent
        typeName="richtext"
        propName={"address2"}
        propValue={address2}
      />
      <EditableContent typeName="text" propName={"phone2"} propValue={phone2} />
      <EditableContent typeName="text" propName={"title3"} propValue={title3} />
      <EditableContent
        typeName="richtext"
        propName={"address3"}
        propValue={address3}
      />
      <EditableContent typeName="text" propName={"phone3"} propValue={phone3} />
      <EditableContent typeName="text" propName={"title4"} propValue={title4} />
      <EditableContent
        typeName="richtext"
        propName={"address4"}
        propValue={address4}
      />
      <EditableContent typeName="text" propName={"phone4"} propValue={phone4} />
      <CardComponent title={title1} address={address1} phone={phone1} />
      <CardComponent title={title2} address={address2} phone={phone2} />
      <CardComponent title={title3} address={address3} phone={phone3} />
      <CardComponent title={title4} address={address4} phone={phone4} />
    </div>
  );
}
