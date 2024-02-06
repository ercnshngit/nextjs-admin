import Button from "../components/tags/Button";
import CardGrid from "../components/tags/CardGrid";
import Div from "../components/tags/Div";
import HStack from "../components/tags/HStack";
import Image from "../components/tags/Image";
import RichText from "../components/tags/RichText";
import ServicesComponent from "../components/tags/ServicesComponent";
import Text from "../components/tags/Text";
import Title from "../components/tags/Title";
import VStack from "../components/tags/VStack";
import { ComponentTagsType } from "../types";

export const components = [
  {
    name: "Text",
    component: Text,
  },
  {
    name: "VStack",
    component: VStack,
  },
  {
    name: "HStack",
    component: HStack,
  },
  {
    name: "Image",
    component: Image,
  },
  {
    name: "Title",
    component: Title,
  },
  {
    name: "CardGrid",
    component: CardGrid,
  },
  {
    name: "Div",
    component: Div,
  },
  {
    name: "RichText",
    component: RichText,
  },
  {
    name: "Button",
    component: Button,
  },
  {
    name: "ServicesComponent",
    component: ServicesComponent,
    displayName: "Anasayfa Servisler",
    props: [
      {
        name: "title",
        type: "string",
      },
      {
        name: "description",
        type: "string",
      },
      {
        name: "items",
        type: "array",
        props: [
          {
            name: "title",
            type: "string",
          },
          {
            name: "description",
            type: "string",
          },
          {
            name: "icon",
            type: "string",
          },
        ],
      },
    ],
  },
  {
    name: "Button",
    component: Button,
  },
];

export const componentTags: ComponentTagsType = components.reduce(
  (
    acc: Record<string, any>,
    { name, component }: { name: string; component: any }
  ) => {
    acc[name] = component;
    return acc;
  },
  {}
);

export const getComponent = async (file: string) => {
  try {
    const componentModule = await import("../components/tags/" + file);
    const Component = componentModule.default;
    return Component;
  } catch (e) {
    console.log(e);
    return null;
  }
};
