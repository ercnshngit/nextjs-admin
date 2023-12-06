import { HStack } from "../components/h-stack";
import { Text } from "../components/text";
import { VStack } from "../components/v-stack";
import { Title } from "../components/title";
import { ComponentTagsType } from "../types";
import { CardGrid } from "../components/card-grid";
import { Div } from "../components/div";

export const componentTags: ComponentTagsType = {
  Text: Text,
  VStack: VStack,
  HStack: HStack,
  Image: Text,
  Title: Title,
  CardGrid: CardGrid,
  Div: Div,
};
