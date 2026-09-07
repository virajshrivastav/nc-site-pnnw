export function Mark({ className = "" }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 120 64"
      fill="none"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="round"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      <path d="M12 52V22M24 52V14M36 52V26M48 52V10M60 52V20M72 52V8M84 52V24M96 52V16M108 52V28" />
      <path d="M4 56h112" strokeWidth="2" />
    </svg>
  );
}
