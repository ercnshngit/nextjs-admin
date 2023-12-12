import { HStack } from "../components/h-stack";
import { Text } from "../components/text";
import { VStack } from "../components/v-stack";
import { Title } from "../components/title";
import { ComponentTagsType } from "../types";
import { CardGrid } from "../components/card-grid";
import { Div } from "../components/div";
import { HTMLText } from "../components/html-text";
import Image from "../components/image";
import Button from "../components/button";

export const componentTags: ComponentTagsType = {
  Text: Text,
  VStack: VStack,
  HStack: HStack,
  Image: Text,
  Title: Title,
  CardGrid: CardGrid,
  Div: Div,
  div: Div,
  p: Text,
  h1: Title,
  button: Button,
};

export const getComponentTag = (tag: string) => {
  return componentTags[tag] || HTMLText;
};
