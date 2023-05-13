import React, { useEffect, useState } from "react";
import {
  HStack,
  Input,
  Button,
  Box,
  Container,
  VStack,
} from "@chakra-ui/react";
import Message from "./Components/Message";
import { app } from "./firebase";
import {
  onAuthStateChanged,
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import {getFirestore,addDoc,collection, serverTimestamp} from "firebase/firestore"


const auth = getAuth(app);
const db = getFirestore(app);

const login = () => {
  const provider = new GoogleAuthProvider();
  signInWithPopup(auth, provider);
};

const logout =()=>{
  signOut(auth);
}


const App = () => {
  const [User, setUser] = useState(false);
  const [message,setMessage]=useState("");
  const [messages,setMessages]=useState([]);

 
  const submit =async(e)=>{
    e.preventDefault();
    try {
      await addDoc(collection(db,"Messages"),{
        text:message,
        uid:User.uid,
        uri:User.photoURL,
        createdAt:serverTimestamp()
      });
      setMessage("");

    } catch (error) {
      alert(error);
    }
  }
  useEffect(() => {
   const unsubscibe = onAuthStateChanged(auth, (data) => {
      setUser(data);
    });

    return()=>{
      unsubscibe();
    };
  });
  return (
    <Box bg={"green.100"}>
      {User ? (
        <Container h={"100vh"} bg={"white"}>
          <VStack
            bg={"gray.100"}
            w={"full"}
            h={"full"}
            paddingY={"1"}
            overflowY={"auto"}
          >
            <Button onClick={logout} colorScheme="red" w={"full"} bg={"blue"}>
              Logout
            </Button>

            <VStack h={"full"} width={"full"}>
             {
              messages.map(item=>(
                <Message
                key={item.id} user={item.uri===User.uri?"me":"other"} text={item.text} uri={item.uri}/>
              ))
             }
            </VStack>

            <form onSubmit={submit} onChange={(e)=>setMessage(e.target.value)} style={{ width: "100%", marginTop: "600px" }}>
              <HStack>
                <Input value={message} placeholder="Enter a message" />
                <Button type="submit" colorScheme={"purple"}>
                  Send
                </Button>
              </HStack>
            </form>
          </VStack>
        </Container>
      ) : (
        <VStack h={"100vh"} justifyContent={"center"} bg={"blue.200"}>
          <Button
            onClick={login}
            colorScheme="green"
            border={"1px solid black"}
          >
            Sign in with goolgle
          </Button>
        </VStack>
      )}
    </Box>
  );
};

export default App;
