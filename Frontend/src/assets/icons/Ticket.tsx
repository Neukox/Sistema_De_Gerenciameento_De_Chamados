export default function TicketIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
    >
      <path
        fill="currentColor"
        d="M4 5a2 2 0 0 0-2 2v2.5a1 1 0 0 0 1 1a1.5 1.5 0 1 1 0 3a1 1 0 0 0-1 1V17a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2.5a1 1 0 0 0-1-1a1.5 1.5 0 1 1 0-3a1 1 0 0 0 1-1V7a2 2 0 0 0-2-2z"
      ></path>
    </svg>
  );
}
