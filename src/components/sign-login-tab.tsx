"use client";
import { Tab, Tabs } from "@nextui-org/react";
import SignUpPage from "./signup/signup";
import { useState } from "react";
import LoginPage from "./login/login";

export default function SignUpLoginTab() {
  const [selected, setSelected] = useState<string>("login");
  return (
    <div>
      <Tabs
        aria-label="opitons"
        selectedKey={selected}
        onSelectionChange={(key) => setSelected(key as string)}
        fullWidth
        variant="bordered"
      >
        <Tab key="signup" title="Regístrarse">
          <SignUpPage />
        </Tab>
        <Tab key="login" title="Iniciar sesión">
          <LoginPage />
        </Tab>
      </Tabs>
    </div>
  );
}
