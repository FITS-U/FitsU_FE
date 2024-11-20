"use client"

// import { useState } from "react";
import AfterLinkPage from "./components/AfterLink";
import BeforeLinkPage from "./components/BeforeLink";

const HomePage: React.FC = () => {
  // const [isLinked, setIsLinked] = useState<boolean> (false);
  const isLinked = true;

  return (
    <div>
      {isLinked ? (
        <AfterLinkPage />
      ) : (
        <BeforeLinkPage />
      )}
    </div>
  )
}

export default HomePage;
