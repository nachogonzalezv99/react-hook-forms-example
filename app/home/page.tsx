"use client";

import { Tabs, useHandleTabs } from "../components/Tabs/Tabs";
import { NormalForm } from "./components/1-normal";
import { FormWithArray } from "./components/2-array";
import FormWithWrapper from "./components/3-with-form-wrapper";
import ArrayFormWithWrapper from "./components/4-array-with-form-wrapper";

// const options: string[] = [];

// const options = ["hola", "adios", "nacho"] as const;

const options = [
  { label: "Normal form", value: "normal" },
  { label: "Array form", value: "array" },
  { label: "Normal wrapper form", value: "normal-wrapper" },
  { label: "Array wrapper form", value: "array-wrapper" },
] as const;

export default function Home() {
  const { changeTab, currentTab } = useHandleTabs(options, {
    queryKey: "form",
    defaultSelected: true,
    scroll: false,
  });

  return (
    <>
      <Tabs onTabChange={changeTab} selected={currentTab} options={options} />

      <div style={{ padding: "20px" }}>
        {currentTab === "normal" && <NormalForm editingUser={null} />}
        {currentTab === "array" && <FormWithArray editingUser={null} />}
        {currentTab === "normal-wrapper" && (
          <FormWithWrapper editingUser={null} />
        )}
        {currentTab === "array-wrapper" && (
          <ArrayFormWithWrapper editingUser={null} />
        )}
      </div>
    </>
  );
}
