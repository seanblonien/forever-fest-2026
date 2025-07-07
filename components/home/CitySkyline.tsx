interface CitySkylineProps {
  width?: number;
  height?: number;
  className?: string;
}

export default function CitySkyline({
  width = 400,
  height = 60,
  className = ''
}: CitySkylineProps) {
  return (
    <div className={`flex justify-center ${className}`}>
      <svg
        width={width}
        height={height}
        viewBox={`0 0 ${width} ${height}`}
        className="text-white fill-current opacity-40"
      >
        <rect x="20" y="30" width="12" height="30" />
        <rect x="35" y="25" width="8" height="35" />
        <rect x="46" y="35" width="6" height="25" />
        <rect x="55" y="20" width="15" height="40" />
        <rect x="75" y="28" width="9" height="32" />
        <rect x="88" y="18" width="12" height="42" />
        <rect x="105" y="33" width="7" height="27" />
        <rect x="118" y="12" width="18" height="48" />
        <rect x="140" y="24" width="10" height="36" />
        <rect x="155" y="30" width="8" height="30" />
        <rect x="168" y="21" width="13" height="39" />
        <rect x="185" y="27" width="7" height="33" />
        <rect x="198" y="18" width="12" height="42" />
        <rect x="215" y="36" width="9" height="24" />
        <rect x="230" y="24" width="10" height="36" />
        <rect x="245" y="30" width="7" height="30" />
        <rect x="258" y="27" width="12" height="33" />
        <rect x="275" y="22" width="8" height="38" />
        <rect x="288" y="29" width="11" height="31" />
        <rect x="305" y="25" width="9" height="35" />
        <rect x="320" y="31" width="6" height="29" />
        <rect x="332" y="19" width="14" height="41" />
        <rect x="350" y="26" width="10" height="34" />
        <rect x="365" y="32" width="8" height="28" />
        <rect x="378" y="28" width="12" height="32" />
      </svg>
    </div>
  );
}
