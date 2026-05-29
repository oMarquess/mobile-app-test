import PoppinsBold from "@/assets/fonts/Poppins-Bold.ttf";
import PoppinsMedium from "@/assets/fonts/Poppins-Medium.ttf";
import PoppinsRegular from "@/assets/fonts/Poppins-Regular.ttf";
import PoppinsSemiBold from "@/assets/fonts/Poppins-SemiBold.ttf";

import { fonts } from "./tokens";

export const appFonts = {
  [fonts.regular]: PoppinsRegular,
  [fonts.medium]: PoppinsMedium,
  [fonts.semiBold]: PoppinsSemiBold,
  [fonts.bold]: PoppinsBold,
};
