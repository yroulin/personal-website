"use client";

import { useState, useRef } from "react";
import { motion, PanInfo } from "framer-motion";

type Position = "front" | "middle" | "back";

interface TestimonialCardProps {
  handleShuffle: () => void;
  testimonial: string;
  position: Position;
  id: number;
  author: string;
}

const TESTIMONIALS = [
  {
    id: 12,
    testimonial:
      "Yves delivered one of the cleanest AEM implementations I've seen. Scalable, accessible, and weeks ahead of schedule.",
    author: "Sofia M. — Digital Director @ Nestlé",
  },
  {
    id: 24,
    testimonial:
      "Brought a level of craftsmanship to our component library that the whole team still references. A genuinely rare find.",
    author: "Marcus T. — Engineering Lead @ Publicis",
  },
  {
    id: 36,
    testimonial:
      "Understands both design systems and enterprise constraints. The final interfaces looked exactly like the prototypes.",
    author: "Elena R. — Product Manager @ L'Oréal",
  },
];

function TestimonialCard({
  handleShuffle,
  testimonial,
  position,
  id,
  author,
}: TestimonialCardProps) {
  const dragRef = useRef(0);
  const isFront = position === "front";

  return (
    <motion.div
      style={{
        zIndex: position === "front" ? 2 : position === "middle" ? 1 : 0,
        background: "oklch(0.15 0.010 55 / 0.88)",
        border: "1px solid oklch(0.26 0.009 55)",
      }}
      animate={{
        rotate:
          position === "front"
            ? "-6deg"
            : position === "middle"
            ? "0deg"
            : "6deg",
        x:
          position === "front"
            ? "0%"
            : position === "middle"
            ? "33%"
            : "66%",
      }}
      drag={true}
      dragElastic={0.35}
      dragListener={isFront}
      dragConstraints={{ top: 0, left: 0, right: 0, bottom: 0 }}
      onDragStart={(_e: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
        dragRef.current = info.point.x;
      }}
      onDragEnd={(_e: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
        if (dragRef.current - info.point.x > 150) {
          handleShuffle();
        }
        dragRef.current = 0;
      }}
      transition={{ duration: 0.35 }}
      className={`absolute left-0 top-0 grid h-[450px] w-[350px] select-none place-content-center space-y-6 rounded-2xl p-6 shadow-2xl backdrop-blur-sm ${
        isFront ? "cursor-grab active:cursor-grabbing" : ""
      }`}
    >
      <img
        src={`https://i.pravatar.cc/128?img=${id}`}
        alt={`Avatar of ${author}`}
        className="pointer-events-none mx-auto h-32 w-32 rounded-full object-cover"
        style={{ border: "2px solid oklch(0.26 0.009 55)" }}
      />
      <p
        className="text-center text-lg italic leading-relaxed"
        style={{ color: "oklch(0.65 0.008 55)" }}
      >
        &ldquo;{testimonial}&rdquo;
      </p>
      <p
        className="text-center text-sm font-semibold tracking-wide"
        style={{ color: "oklch(0.68 0.17 52)" }}
      >
        {author}
      </p>
    </motion.div>
  );
}

export function ShuffleCards() {
  const [positions, setPositions] = useState<Position[]>([
    "front",
    "middle",
    "back",
  ]);

  const handleShuffle = () => {
    setPositions((prev) => {
      const next = [...prev];
      next.unshift(next.pop()!);
      return next;
    });
  };

  return (
    <div className="testimonial-wrap">
      <div className="testimonial-stack">
        {TESTIMONIALS.map((t, i) => (
          <TestimonialCard
            key={t.id}
            {...t}
            handleShuffle={handleShuffle}
            position={positions[i]}
          />
        ))}
      </div>
      <p className="testimonial-hint" aria-hidden="true">
        drag to shuffle
      </p>
    </div>
  );
}
