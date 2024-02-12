import MotionDiv from "@/libs/motion";
import Button from "../Button";
import Description from "../Description";
import Title from "../Title";
import { Edit } from "lucide-react";
import EditableContent from "@/block-renderer/utils/editable-content";

export default function Seminar({
  title,
  description,
  contactTitle,
  contactEmail,
  button1Name,
  button1href,
  button2Name,
  button2href,
  image1,
  image2,
  children,
}: {
  title: string;
  description: string;
  contactTitle: string;
  contactEmail: string;
  button1Name: string;
  button1href: string;
  button2Name: string;
  button2href: string;
  image1: string;
  image2: string;
  children: React.ReactNode;
}) {
  const sectionImageLeft = {
    hidden: { rotate: 0 },
    visible: {
      transition: {
        delay: 0.4,
        duration: 0.2,
      },
      rotate: -3,
    },
  };

  const sectionImageRight = {
    hidden: { rotate: 0 },
    visible: {
      transition: {
        delay: 0.4,
        duration: 0.2,
      },
      rotate: 3,
    },
  };

  return (
    <section className="container relative flex w-full flex-col py-10">
      <div className="flex flex-col-reverse md:flex-row">
        <div className="relative mt-2 flex flex-col md:w-5/12 lg:mt-20">
          <img
            src="/assets/arrow-down.png"
            className="-z-10 -mr-[30%] w-[80%] self-end max-md:hidden"
            alt="arrow"
          />
          <div className="md:flex-1" />

          <div className="flex flex-col  gap-6 md:w-11/12">
            <EditableContent
              typeName="text"
              propName={"title"}
              propValue={title}
            >
              <Title>{title}</Title>
            </EditableContent>
            <EditableContent
              typeName="richtext"
              propName={"description"}
              propValue={description}
            >
              <Description>{description}</Description>
            </EditableContent>

            <div className="flex flex-col items-center gap-4 md:flex-row">
              <EditableContent
                typeName="text"
                propName={"button1Name"}
                propValue={button1Name}
              >
                <Button className="max-md:w-full" href={button1href}>
                  {button1Name}
                </Button>
              </EditableContent>

              <EditableContent
                typeName="text"
                propName={"button2Name"}
                propValue={button2Name}
              >
                <Button
                  href={button2href}
                  variant="outline"
                  className="max-md:w-full"
                >
                  {button2Name}
                </Button>
              </EditableContent>
            </div>
            <div className=" flex items-center gap-5  bg-[#F2F3F4] p-2 transition-all hover:bg-gray-200 lg:visible ">
              <img
                src="/assets/contact/mail.svg"
                alt="phone"
                className=" h-10 w-10 md:h-16 md:w-16"
              />

              <div>
                <EditableContent
                  typeName="richtext"
                  propName={"description"}
                  propValue={description}
                >
                  <Description className="mb-0 font-bold">
                    {contactTitle}
                  </Description>
                </EditableContent>
                <EditableContent
                  typeName="richtext"
                  propName={"description"}
                  propValue={description}
                >
                  <Description className="mb-0 font-bold">
                    {contactEmail}
                  </Description>
                </EditableContent>
              </div>
            </div>
          </div>
        </div>
        <div className="relative z-20 mb-10 flex w-7/12 flex-1 flex-col max-md:mx-auto lg:mb-0">
          <div className="absolute z-10 h-full w-7/12">
            <MotionDiv
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={sectionImageLeft}
              className="relative flex aspect-[53/63] w-full"
            >
              <EditableContent
                typeName="image"
                propName={"image1"}
                propValue={image1}
              >
                <img src={image1} alt="section1" className="object-fill" />
              </EditableContent>
            </MotionDiv>
          </div>
          <div className="mt-20 flex h-full w-10/12 items-start lg:items-end lg:justify-end lg:self-end 2xl:w-8/12">
            <MotionDiv
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={sectionImageRight}
              className="relative  aspect-[53/63]  w-full"
            >
              <EditableContent
                typeName="image"
                propName={"image2"}
                propValue={image2}
              >
                <img src={image2} alt="section2" className="object-fill" />
              </EditableContent>
            </MotionDiv>
          </div>
        </div>
      </div>
    </section>
  );
}
