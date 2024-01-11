import CardGrid from "../components/tags/CardGrid";
import Div from "../components/tags/Div";
import HStack from "../components/tags/HStack";
import Image from "../components/tags/Image";
import RichText from "../components/tags/RichText";
import Text from "../components/tags/Text";
import Title from "../components/tags/Title";
import VStack from "../components/tags/VStack";
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
};

export const getComponent = async (file: string) => {
  try {
    const componentModule = await import(
      "../components/block-renderer/components/tags/" + file
    );
    const Component = componentModule.default;
    return Component;
  } catch (e) {
    console.log(e);
    return null;
  }
};
