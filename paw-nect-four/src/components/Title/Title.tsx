import React from "react";

interface TitleProps {
    text: string;
  }

  export default function Title ({ text }: TitleProps) {
    return (
      <h1 className="text-4xl font-bold text-center my-4">
        {text}
      </h1>
    );
  };