interface Props {
  rating: number;
  size?: "3" | "6" | "8";
  fontSize?: "sm" | "base" | "lg" | "xl";
  className?: string;
}

function Rating({ rating = 0, size = "3", fontSize = "sm", className }: Props) {
  if (rating > 10) rating = 10;
  return (
    <span className={className}>
      <div
        style={{
          background: `
          conic-gradient(rgb(193, 27, 64
          ) ${Math.round(
            360 * (rating / 10)
          )}deg, rgb(233, 233, 233) 3.6deg 0deg)`,
          width: `${size}rem`,
          height: `${size}rem`,
        }}
        className={`  circle-progess rounded-full`}
      >
        <span className={`text-gray-500 font-medium text-${fontSize}  z-10`}>
          {rating.toFixed(1)}
        </span>
      </div>
    </span>
  );
}

export default Rating;
