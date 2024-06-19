import { Button, Flex, Text } from "@chakra-ui/react";
import { ethers } from "ethers";
import { JsonRpcSigner } from "ethers";
import { FC, useEffect, useState } from "react";

const App: FC = () => {
  const [signer, setSigner] = useState<JsonRpcSigner | null>(null);

  const getSigner = async () => {
    if (!window.ethereum) return;

    const provider = new ethers.BrowserProvider(window.ethereum);

    setSigner(await provider.getSigner());
  };

  const onClickMetamask = async () => {
    try {
      getSigner();

      localStorage.setItem("isLogin", "true");
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const localIsLogin = localStorage.getItem("isLogin");

    if (localIsLogin === "true") {
      getSigner();
    }
  }, []);

  return (
    <Flex
      bgColor="red.100"
      w="100%"
      minH="100vh"
      justifyContent="center"
      alignItems="center"
      flexDir="column"
    >
      {signer ? (
        <Text>{signer.address}</Text>
      ) : (
        <Button onClick={onClickMetamask}>🦊 로그인</Button>
      )}
    </Flex>
  );
};

export default App;
