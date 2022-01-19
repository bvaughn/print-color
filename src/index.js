const COLORS = {
  background: {
    bgBlack: {
      browser: [0, 0, 0],
      node: '\x1b[40m',
    },
    bgRed: {
      browser: [255, 0, 0],
      node: '\x1b[41m',
    },
    bgGreen: {
      browser: [0, 255, 0],
      node: '\x1b[42m',
    },
    bgYellow: {
      browser: [255, 255, 0],
      node: '\x1b[43m',
    },
    bgBlue: {
      browser: [0, 0, 255],
      node: '\x1b[44m',
    },
    bgMagenta: {
      browser: [255, 0, 255],
      node: '\x1b[45m',
    },
    bgCyan: {
      browser: [0, 255, 255],
      node: '\x1b[46m',
    },
    bgWhite: {
      browser: [255, 255, 255],
      node: '\x1b[47m',
    },
  },
  foreground: {
    black: {
      browser: [0, 0, 0],
      node: '\x1b[30m',
    },
    red: {
      browser: [255, 0, 0],
      node: '\x1b[31m',
    },
    green: {
      browser: [0, 255, 0],
      node: '\x1b[32m',
    },
    yellow: {
      browser: [255, 255, 0],
      node: '\x1b[33m',
    },
    blue: {
      browser: [0, 0, 255],
      node: '\x1b[34m',
    },
    magenta: {
      browser: [255, 0, 255],
      node: '\x1b[35m',
    },
    cyan: {
      browser: [0, 255, 255],
      node: '\x1b[36m',
    },
    white: {
      browser: [255, 255, 255],
      node: '\x1b[37m',
    },
  },
};

const NODE_RESET = '\x1b[0m';
const NODE_BOLD = '\x1b[1m';
const NODE_DIM = '\x1b[2m';

const isNode =
  typeof process !== 'undefined' &&
  process.versions != null &&
  process.versions.node != null;

const isBrowserDarkTheme =
  !isNode &&
  typeof window.matchMedia === 'function' &&
  window.matchMedia('(prefers-color-scheme: dark)').matches;

function createColor(config = {}) {
  const {backgroundColor = '', weight = ''} = config;
  let {color = ''} = config;

  function print(...string) {
    if (isNode) {
      console.log(`${backgroundColor}${color}${weight}${string.join(' ')}${NODE_RESET}`);
    } else {
      if (!color) {
        color = isBrowserDarkTheme ? [255, 255, 255] : [0, 0, 0];
      }

      let backgroundColorStyle = '';
      if (backgroundColor) {
        backgroundColorStyle = `background-color: rgb(${backgroundColor.join(
          ',',
        )});`;
      }

      let colorStyle = '';
      if (weight === NODE_DIM) {
        colorStyle = `color: rgba(${color.join(',')},0.5);`;
      } else {
        colorStyle = `color: rgb(${color.join(',')});`;
      }

      let weightStyle = '';
      if (weight === NODE_BOLD) {
        weightStyle = 'font-weight: bold;';
      }

      console.log(
        '%c%s',
        `${backgroundColorStyle}${colorStyle}${weightStyle}`,
        string.join(' '),
      );
    }
  }

  for (const key in COLORS.background) {
    Object.defineProperty(print, key, {
      get: () =>
        createColor({
          ...config,
          backgroundColor: isNode
            ? COLORS.background[key].node
            : COLORS.background[key].browser,
        }),
    });
  }

  for (const key in COLORS.foreground) {
    Object.defineProperty(print, key, {
      get: () =>
        createColor({
          ...config,
          color: isNode
            ? COLORS.foreground[key].node
            : COLORS.foreground[key].browser,
        }),
    });
  }

  Object.defineProperty(print, 'bold', {
    get: () =>
      createColor({
        ...config,
        weight: NODE_BOLD,
      }),
  });

  Object.defineProperty(print, 'dim', {
    get: () =>
      createColor({
        ...config,
        weight: NODE_DIM,
      }),
  });

  return print;
}

const baseConfig = createColor();

export const {
  bold,
  dim,

  bgBlack,
  bgRed,
  bgGreen,
  bgYellow,
  bgBlue,
  bgMagenta,
  bgCyan,
  bgWhite,

  black,
  red,
  green,
  yellow,
  blue,
  magenta,
  cyan,
  white,
} = baseConfig;
