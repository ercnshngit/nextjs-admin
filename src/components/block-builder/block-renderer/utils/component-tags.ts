import { HStack } from "../components/tags/h-stack";
import { Text } from "../components/tags/text";
import { VStack } from "../components/tags/v-stack";
import { Title } from "../components/tags/title";
import { CardGrid } from "../components/tags/card-grid";
import { Div } from "../components/tags/div";
import Image from "../components/tags/image";
import { RichText } from "../components/tags/richtext";
import NumberGraphic from "../components/tags/number-graphic";
import { ComponentTagsType } from "../types";
import { SliderOne } from "../components/tags/slider-one";

export const componentTags: ComponentTagsType = {
  Text: Text,
  VStack: VStack,
  HStack: HStack,
  Image: Image,
  Title: Title,
  CardGrid: CardGrid,
  Div: Div,
  RichText: RichText,
  NumberGraphic: NumberGraphic,
  AnaSlider: SliderOne,
};
