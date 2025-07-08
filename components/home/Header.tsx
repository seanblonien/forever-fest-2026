import { StyleProps } from '../../lib';
import { SkylineHeaderSvg } from '../icons';

export default function Header({
  className = '',
}: StyleProps) {
  return (
    <div className={className}>
      {/* Sean & Eva Skyline Logo */}
      <div className="flex justify-center">
        <div className="relative w-full max-h-32">
          <SkylineHeaderSvg className="w-full h-full" />
        </div>
      </div>
    </div>
  );
}
