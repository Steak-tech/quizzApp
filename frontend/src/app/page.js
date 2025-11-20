'use client'

import { useEffect, useState } from "react";
import PlayButton from "./components/PlayButton";

export default function Home() {
  return (
      <main>
        <h1>Le fruit de la Culture</h1>
        <PlayButton /> 
      </main>
  );
}
