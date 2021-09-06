import { forwardRef } from "react";
import { Link as RouterLink } from "react-router-dom";

export const CustomLink = forwardRef((props, ref) => (
  <RouterLink ref={ref} {...props} />
));
