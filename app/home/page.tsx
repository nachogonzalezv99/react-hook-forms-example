"use client";

import { Tabs, useHandleTabs } from "../components/Tabs/Tabs";
import ArrayFormWithWrapper from "./components/4-array-with-form-wrapper";

// const options: string[] = [];

// const options = ["hola", "adios", "nacho"] as const;

const options = [
  { label: "Hola", value: "hola", disabled: true },
  { label: "Adios", value: "adios", disabled: false },
  { label: "Nacho", value: "nacho", disabled: false },
] as const;

export default function Home() {
  const { changeTab, currentTab } = useHandleTabs(options, {
    queryKey: "test",
    defaultSelected: false,
    scroll: true,
  });

  return (
    <>
      {/* <NormalForm editingUser={null} /> */}
      {/* <FormWithArray editingUser={null} /> */}
      {/* <FormWithWrapper editingUser={null} /> */}
      <ArrayFormWithWrapper editingUser={null} />

      <Tabs onTabChange={changeTab} selected={currentTab} options={options} />

      {currentTab === "hola" && <div style={{ padding: "10px" }}>Hola</div>}
      {currentTab === "adios" && <div style={{ padding: "10px" }}>Adios</div>}
      {currentTab === "nacho" && <div style={{ padding: "10px" }}>Nacho</div>}
    </>
  );
}
