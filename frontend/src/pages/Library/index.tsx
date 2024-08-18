import React from "react";
import { SemiboldText } from "../../theme/globalFonts";
import FormButton from "../../components/FormButton";

const Library = ({navigation}: any) => {
  return (
    <>
    <SemiboldText>Library</SemiboldText>
    <FormButton text="<3 Liked Songs" onPress={() => navigation.navigate("LikedSongs")}/>
    </>
  );
};

export default Library;


