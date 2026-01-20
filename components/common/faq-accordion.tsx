import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { cn } from "@/lib/utils"

interface FAQItem {
  id: string
  question: string
  answer: string
}

interface FAQAccordionProps {
  items: FAQItem[]
  className?: string
  itemClassName?: string
  questionClassName?: string
  answerClassName?: string
}

export function FAQAccordion({
  items,
  className,
  itemClassName,
  questionClassName,
  answerClassName,
}: FAQAccordionProps) {
  return (
    <Accordion type="single" collapsible className={cn("space-y-4", className)}>
      {items.map((item) => (
        <AccordionItem
          key={item.id}
          value={item.id}
          className={cn("bg-card border-2 border-border rounded-xl px-6", itemClassName)}
        >
          <AccordionTrigger className={cn("text-left hover:no-underline py-6", questionClassName)}>
            <span className={cn("font-semibold text-lg pr-4")}>{item.question}</span>
          </AccordionTrigger>
          <AccordionContent className={cn("text-[15px] text-muted-foreground/90 leading-relaxed pb-6 pt-2", answerClassName)}>
            {item.answer}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  )
}
