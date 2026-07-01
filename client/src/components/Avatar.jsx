function Avatar({ name, size = "md" }) {
  const sizes = {
    sm: "w-8 h-8 text-xs",
    md: "w-10 h-10 text-sm",
    lg: "w-14 h-14 text-lg",
  }

  const initials = name
    ? name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
    : "?"

  return (
    <div
      className={`${sizes[size]} bg-blue-600 text-white rounded-full flex items-center justify-center font-bold`}
    >
      {initials}
    </div>
  )
}

export default Avatar