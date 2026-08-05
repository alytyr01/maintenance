import { cn } from '../lib/utils'

interface GridPatternProps {
  squares: [number, number][]
  className?: string
}

export function GridPattern({ squares, className }: GridPatternProps) {
  return (
    <svg
      className={cn('grid-pattern', className)}
      width="100%"
      height="100%"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="none"
    >
      <defs>
        <pattern
          id="grid"
          width="40"
          height="40"
          patternUnits="userSpaceOnUse"
        >
          <path
            d="M 40 0 L 0 0 0 40"
            fill="none"
            stroke="currentColor"
            strokeWidth="0.75"
            opacity="0.25"
          />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#grid)" />
      {squares.map(([col, row], i) => (
        <rect
          key={i}
          x={col * 40 + 1}
          y={row * 40 + 1}
          width={38}
          height={38}
          fill="currentColor"
          opacity="0.15"
          rx="4"
        />
      ))}
    </svg>
  )
}