import { Cog, RotateCw, Wind, Disc, Lightbulb, Zap, Wrench } from "lucide-react";

// Maps the framework-agnostic icon keys stored in data files to actual
// lucide-react icon components. Centralizing this mapping means the data
// layer never needs to import React/JSX, and the visual icon for a given
// part type can be changed in exactly one place.
//
// NOTE: these are plain object lookups (not resolver functions) so that
// consuming components reference a stable component identity at render
// time, rather than calling a function that returns one.
export const partIconMap = {
  "cylinder-head": Cog,
  clutch: RotateCw,
  turbo: Wind,
  shock: Disc,
  headlight: Lightbulb,
  alternator: Zap,
};

export const DefaultPartIcon = Wrench;

// Icons representing each vehicle subsystem, used by the navbar map sidebar
// and the SVG diagram.
export const subsystemIcons = {
  Engine: Cog,
  Suspension: Disc,
  Body: Lightbulb,
  Electrical: Zap,
};
