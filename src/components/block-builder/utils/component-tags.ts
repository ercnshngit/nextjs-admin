import { HStack } from "../components/h-stack";
import { Text } from "../components/text";
import { VStack } from "../components/v-stack";
import { Title } from "../components/title";
import { ComponentTagsType } from "../types";
import { CardGrid } from "../components/card-grid";
import { Div } from "../components/div";
import { HTMLText } from "../components/html-text";

export const componentTags: ComponentTagsType = {
  Text: Text,
  VStack: VStack,
  HStack: HStack,
  Image: Text,
  Title: Title,
  CardGrid: CardGrid,
  Div: Div,
  div: Div,
  p: HTMLText,
  h1: Title,
  h2: Title,
  h3: Title,
  h4: Title,
  h5: Title,
  h6: Title,
  span: Text,
  img: Text,
  ul: Text,
  li: Text,
  a: Text,
  button: Text,
};
