export type Stat = {
  value: string;
  label: string;
};

// Lead with the founder record — it's the claim nobody else on a shortlist can
// make, and it's the one that's independently checkable.
export const stats: Stat[] = [
  { value: "4", label: "startups founded" },
  { value: "1", label: "acquired" },
  { value: "20+", label: "projects shipped" },
  { value: "6+", label: "years building" },
  { value: "12", label: "happy clients" },
];
