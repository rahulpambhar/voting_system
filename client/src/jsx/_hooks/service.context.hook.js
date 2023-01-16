import { useContext } from "react";
import { ServiceContext } from "../_contex/contractsContext";

export default function useServiceContextHook() {
  const values = useContext(ServiceContext);
  return values;
}
