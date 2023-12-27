import CardGrid from "../components/tags/card-grid";
import Div from "../components/tags/div";
import HStack from "../components/tags/h-stack";
import NumberGraphic from "../components/tags/number-graphic";
import RichText from "../components/tags/richtext";
import SliderOne from "../components/tags/slider-one";
import Title from "../components/tags/title";
import VStack from "../components/tags/v-stack";
import { ComponentTagsType } from "../types";

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
