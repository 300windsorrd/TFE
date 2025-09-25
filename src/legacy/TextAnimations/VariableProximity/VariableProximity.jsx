// Legacy VariableProximity neutralized. Replaced with a simple, accessible
// text-only stub that renders the label to avoid accidental imports breaking
// older branches while removing the original implementation and its name.

export default function LegacyVariableProximityStub({ label }) {
  return <span aria-hidden>{label}</span>;
}
