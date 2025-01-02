"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Globe } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";

export const LanguageSelect = ({ locale }: { locale: string }) => {
  const [selectedLocale, setSelectedLocale] = useState(locale);

  const router = useRouter();

  const onSelectChange = (value: string) => {
    setSelectedLocale(value);
    router.replace(`/${value}`);
  };

  return (
    <Select value={selectedLocale} onValueChange={onSelectChange}>
      <SelectTrigger className="flex items-center gap-x-1">
        <Globe /> <span>{locale.toUpperCase()}</span>
      </SelectTrigger>
      <SelectContent className="w-fit">
        <SelectItem value="en">English</SelectItem>
        <SelectItem value="ru">Русский</SelectItem>
      </SelectContent>
    </Select>
  );
};
