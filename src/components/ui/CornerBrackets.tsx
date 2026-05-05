/**
 * Decorative corner brackets — gives a "system UI / heads-up display" feel.
 * Place inside any `relative` container and it pins to the corners.
 */
export default function CornerBrackets({
  size = 18,
  color = "rgba(168,85,247,0.55)",
}: {
  size?: number;
  color?: string;
}) {
  const base: React.CSSProperties = {
    position: "absolute",
    width: size,
    height: size,
    borderColor: color,
    pointerEvents: "none",
  };
  return (
    <>
      <span aria-hidden style={{ ...base, top: 0, left: 0, borderTop: "1px solid", borderLeft: "1px solid" }} />
      <span aria-hidden style={{ ...base, top: 0, right: 0, borderTop: "1px solid", borderRight: "1px solid" }} />
      <span aria-hidden style={{ ...base, bottom: 0, left: 0, borderBottom: "1px solid", borderLeft: "1px solid" }} />
      <span aria-hidden style={{ ...base, bottom: 0, right: 0, borderBottom: "1px solid", borderRight: "1px solid" }} />
    </>
  );
}
