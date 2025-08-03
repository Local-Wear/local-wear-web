"use client";
import React from "react";
import { Button } from "../ui/button";
import { Menu } from "lucide-react";
import useMobileNavSheet from "@/hook/use-mobile-nav";

export default function MobileNavTrigger() {
  const { onOpen } = useMobileNavSheet();

  return (
    <Button
      variant={"link"}
      size="icon"
      className="md:hidden text-white hover:bg-white/10 hover:text-white"
      onClick={onOpen}
    >
      <Menu size={24} />
    </Button>
  );
}
