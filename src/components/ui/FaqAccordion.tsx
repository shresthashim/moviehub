"use client";

import * as Accordion from "@radix-ui/react-accordion";
import { FiPlus } from "react-icons/fi";

export default function FaqAccordion({ items }: { items: { question: string; answer: string }[] }) {
  return (
    <Accordion.Root type="single" collapsible defaultValue="item-0" className="space-y-3">
      {items.map((faq, i) => (
        <Accordion.Item
          key={i}
          value={`item-${i}`}
          className="group overflow-hidden rounded-2xl border border-border bg-surface transition-colors data-[state=open]:border-accent/40"
        >
          <Accordion.Header>
            <Accordion.Trigger className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left outline-none ring-accent/40 focus-visible:ring-2">
              <span className="text-base font-semibold text-foreground sm:text-lg">{faq.question}</span>
              <span className="grid size-7 shrink-0 place-items-center rounded-full bg-surface-2 text-muted transition-all duration-300 group-data-[state=open]:rotate-45 group-data-[state=open]:bg-accent group-data-[state=open]:text-accent-foreground">
                <FiPlus className="size-4" />
              </span>
            </Accordion.Trigger>
          </Accordion.Header>
          <Accordion.Content className="overflow-hidden data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down">
            <p className="px-6 pb-5 leading-relaxed text-muted">{faq.answer}</p>
          </Accordion.Content>
        </Accordion.Item>
      ))}
    </Accordion.Root>
  );
}
