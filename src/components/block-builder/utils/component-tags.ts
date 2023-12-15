import { HStack } from "../components/tags/h-stack";
import { Text } from "../components/tags/text";
import { VStack } from "../components/tags/v-stack";
import { Title } from "../components/tags/title";
import { ComponentTagsType } from "../types";
import { CardGrid } from "../components/tags/card-grid";
import { Div } from "../components/tags/div";
import { HTMLText } from "../components/tags/html-text";
import Image from "../components/tags/image";
import Button from "../components/tags/button";

export const componentTags: ComponentTagsType = {
  Text: Text,
  VStack: VStack,
  HStack: HStack,
  Image: Image,
  Title: Title,
  CardGrid: CardGrid,
  Div: Div,
};
