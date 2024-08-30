"use client";

import { NormalForm } from "./components/1-normal";
import { FormWithArray } from "./components/2-array";
import FormWithWrapper from "./components/3-with-form-wrapper";
import ArrayFormWithWrapper from "./components/4-array-with-form-wrapper";

export default function Home() {
  return (
    <>
      {/* <NormalForm editingUser={null} /> */}
      {/* <FormWithArray editingUser={null} /> */}
      {/* <FormWithWrapper editingUser={null} /> */}
      <ArrayFormWithWrapper editingUser={null} />
    </>
  );
}
