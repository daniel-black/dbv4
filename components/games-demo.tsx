"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordion";
import { MiniGame } from "react-mini-games";

const games = ["runner", "paddle", "asteroids", "flappy", "snake"] as const;

export function GamesDemo() {
  return (
    <Accordion type="single" collapsible className="w-full">
      <AccordionItem value="item-1">
        <AccordionTrigger>Try mini games</AccordionTrigger>
        <AccordionContent className="space-y-4">
          {games.map((game) => (
            <div key={game}>
              <MiniGame
                game={game}
                title={game}
                highScoreKey={`${game}-high-score`}
                width={400}
                height={300}
              />
            </div>
          ))}
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
