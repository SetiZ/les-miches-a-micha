import * as React from "react";
import { useCartStore } from "./store";

const Hydration = () => {
  React.useEffect(() => {
    useCartStore.persist.rehydrate();
  }, []); // (b)

  return null;
};

export default Hydration;
