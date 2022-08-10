import { Text, HStack, Switch, useColorMode, Stagger } from "native-base";
import ScanBillBox from "@components/Box/ScanBillBox";
import AddManuallyBox from "@components/Box/AddManuallyBox";
import Layout from "@components/Box/Layout";
export default function Home() {
  return (
    <Layout>
      <Stagger
        visible
        initial={{
          opacity: 0,
          scale: 0,
          translateY: 34,
        }}
        animate={{
          translateY: 0,
          scale: 1,
          opacity: 1,
          transition: {
            type: "spring",
            mass: 0.8,
            stagger: {
              offset: 30,
              reverse: true,
            },
          },
        }}
      >
        <ScanBillBox />
        <AddManuallyBox />
      </Stagger>
    </Layout>
  );
}
