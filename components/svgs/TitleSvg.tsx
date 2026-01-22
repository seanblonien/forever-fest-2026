import { CSSProperties } from 'react';
import { SvgProps } from '../../lib';

// Reusable style objects
const baseLeagueGothicStyle: CSSProperties = {
  fontFamily: 'var(--font-league-gothic), \'League Gothic\', Arial, sans-serif',
  fontVariationSettings: '\'wdth\' 100',
};

const pinkFillStyle: CSSProperties = {
  fill: '#de1ace',
};

const lightPinkFillStyle: CSSProperties = {
  fill: '#fcade7',
};

const largeTextStyle: CSSProperties = {
  ...baseLeagueGothicStyle,
  fontSize: '372.77px',
};

const mediumTextStyle: CSSProperties = {
  ...baseLeagueGothicStyle,
  fontSize: '263.47px',
};

const smallTextStyle: CSSProperties = {
  ...baseLeagueGothicStyle,
  fontSize: '138.96px',
};

const alexBrushStyle: CSSProperties = {
  fontFamily: 'var(--font-alex-brush), \'Alex Brush\', cursive',
  fontSize: '52.07px',
};

export const TitleSvg: React.FC<SvgProps> = (props) => (
  <svg
    aria-label='Forever Fest Title'
    viewBox='0 0 797.77 518.64'
    xmlns='http://www.w3.org/2000/svg'
    {...props}
  >
    <g>
      <g>
        <text
          style={{ ...largeTextStyle, ...pinkFillStyle }}
          transform='translate(11.02 425.45)'
        >
          <tspan x='0' y='0'>F</tspan>
        </text>
        <text
          style={{ ...mediumTextStyle, ...pinkFillStyle }}
          transform='translate(121.73 318.15)'
        >
          <tspan x='0' y='0'>O</tspan>
        </text>
        <text
          style={{ ...smallTextStyle, ...pinkFillStyle }}
          transform='translate(206.83 219.08)'
        >
          <tspan x='0' y='0'>R</tspan>
        </text>
        <text
          style={{ ...smallTextStyle, ...pinkFillStyle }}
          transform='translate(260.32 219.08)'
        >
          <tspan x='0' y='0'>EVER</tspan>
        </text>
        <text
          style={{ ...smallTextStyle, ...pinkFillStyle }}
          transform='translate(500.2 219.08)'
        >
          <tspan x='0' y='0'>FE</tspan>
        </text>
        <text
          style={{ ...mediumTextStyle, ...pinkFillStyle }}
          transform='translate(580.68 320.26)'
        >
          <tspan x='0' y='0'>S</tspan>
        </text>
        <text
          style={{ ...largeTextStyle, ...pinkFillStyle }}
          transform='translate(674.02 425.45)'
        >
          <tspan x='0' y='0'>T</tspan>
        </text>
      </g>
      <g>
        <text
          style={{ ...largeTextStyle, ...lightPinkFillStyle }}
          transform='translate(0 410.88)'
        >
          <tspan x='0' y='0'>F</tspan>
        </text>
        <text
          style={{ ...mediumTextStyle, ...lightPinkFillStyle }}
          transform='translate(110.71 303.58)'
        >
          <tspan x='0' y='0'>O</tspan>
        </text>
        <text
          style={{ ...smallTextStyle, ...lightPinkFillStyle }}
          transform='translate(195.81 204.51)'
        >
          <tspan x='0' y='0'>R</tspan>
        </text>
        <text
          style={{ ...smallTextStyle, ...lightPinkFillStyle }}
          transform='translate(249.3 204.51)'
        >
          <tspan x='0' y='0'>EVER</tspan>
        </text>
        <text
          style={{ ...smallTextStyle, ...lightPinkFillStyle }}
          transform='translate(489.18 204.51)'
        >
          <tspan x='0' y='0'>FE</tspan>
        </text>
        <text
          style={{ ...mediumTextStyle, ...lightPinkFillStyle }}
          transform='translate(569.66 305.69)'
        >
          <tspan x='0' y='0'>S</tspan>
        </text>
        <text
          style={{ ...largeTextStyle, ...lightPinkFillStyle }}
          transform='translate(663.01 410.87)'
        >
          <tspan x='0' y='0'>T</tspan>
        </text>
      </g>
      <text
        style={{ ...alexBrushStyle, ...lightPinkFillStyle }}
        transform='translate(304.3 57.41) scale(.84 1)'
      >
        <tspan x='0' y='0'>Presents</tspan>
      </text>
    </g>
  </svg>
);
