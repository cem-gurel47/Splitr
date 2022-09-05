import { StackParamList } from "@models/stackParams";

declare global {
  namespace ReactNavigation {
    interface RootParamList extends StackParamList {}
  }
}
