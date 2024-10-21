import React from "react";
import Head from "next/head";
import Layout from "@/components/Layout/Layout";

export default function Home() {
  return (
    <>
    <Head>
      <title>Paw-nect Four!</title>
      <meta name="description" content="A cute Connect Four game with kittens and puppies" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <Layout />
   
  </>
  );
}
