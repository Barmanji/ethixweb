"use client";

import { useState } from "react";

const steps = [
  {
    number: "01",
    title: "Listen",
    body: "Start with the people, goals, and friction behind the brief.",
    detail:
      "We map the customer journey, team constraints, and the outcomes that matter before shaping a solution.",
  },
  {
    number: "02",
    title: "Find the shape",
    body: "Agree on a focused plan, the right tools, and what we’ll learn.",
    detail:
      "You get a clear scope, working milestones, and a practical explanation of the decisions behind the plan.",
  },
  {
    number: "03",
    title: "Build together",
    body: "Share work early, make clear decisions, and keep momentum visible.",
    detail:
      "We show real progress as it happens, invite useful feedback, and keep owners and next steps easy to find.",
  },
  {
    number: "04",
    title: "Keep improving",
    body: "Launch with care and use what we learn to choose the next move.",
    detail:
      "We check the experience after launch, look at meaningful signals, and agree on the next improvement together.",
  },
];

export default function ProcessFlipCards() {
  const [open, setOpen] = useState<string | null>(null);
  return (
    <div className="process-steps">
      {steps.map((step) => {
        const active = open === step.number;
        return (
          <article
            className={`process-card${active ? " is-flipped" : ""}`}
            key={step.number}
          >
            <div className="process-card-inner">
              <div className="process-card-face process-card-front">
                <span>{step.number}</span>
                <h3>{step.title}</h3>
                <p>{step.body}</p>
                <button
                  type="button"
                  onClick={() => setOpen(active ? null : step.number)}
                  aria-expanded={active}
                  aria-label={`More about ${step.title}`}
                >
                  More about this step <b aria-hidden="true">↗</b>
                </button>
              </div>
              <div className="process-card-face process-card-back">
                <span>{step.number} / HOW WE WORK</span>
                <h3>{step.title}</h3>
                <p>{step.detail}</p>
                <button type="button" onClick={() => setOpen(null)}>
                  Back to overview <b aria-hidden="true">↙</b>
                </button>
              </div>
            </div>
          </article>
        );
      })}
    </div>
  );
}
