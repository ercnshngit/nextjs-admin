import EditableContent from "@/block-renderer/utils/editable-content";
import Button from "../Button";
import Description from "../Description";
import SubTitle from "../SubTitle";

export default function ContactUs({
  buttonText,
  title,
  description,
  children,
}: {
  buttonText: string;
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <div className="   bg-[#F2F3F4]">
      <div className="container flex w-full flex-col items-center justify-around py-10 ">
        <div className="flex flex-col items-center p-3 ">
          <EditableContent typeName="text" propName={"title"} propValue={title}>
            <SubTitle className="text-center text-icon-blue">{title}</SubTitle>
          </EditableContent>
          <EditableContent
            typeName="richtext"
            propName={"description"}
            propValue={description}
          >
            <Description className="text-center">{description}</Description>
          </EditableContent>
        </div>
        <EditableContent
          typeName="text"
          propName={"buttonText"}
          propValue={buttonText}
        >
          <Button href="https://conval.cosmostest.tech/" variant="moreRounded">
            {buttonText}
          </Button>
        </EditableContent>
        {children && children}
      </div>
    </div>
  );
}
