import { extendTheme } from "@chakra-ui/react";
import { cardAnatomy } from "@chakra-ui/anatomy";
import { createMultiStyleConfigHelpers } from "@chakra-ui/react";

const { definePartsStyle } =
  createMultiStyleConfigHelpers(cardAnatomy.keys);

const variants = {
  selected: definePartsStyle({
    container: {
      border: "2px solid red",
      margin: "-2px"
    },
  }),
};

const customTheme = extendTheme({
  components: {
    Card: {
      variants,
    },
  },
});

export default customTheme;