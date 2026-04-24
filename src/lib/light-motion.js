import React from 'react';

const filteredProps = new Set([
  'animate',
  'exit',
  'initial',
  'layout',
  'transition',
  'variants',
  'viewport',
  'whileFocus',
  'whileHover',
  'whileInView',
  'whileTap'
]);

const componentCache = new Map();

function createMotionComponent(tagName) {
  if (componentCache.has(tagName)) {
    return componentCache.get(tagName);
  }

  const MotionComponent = React.forwardRef(({ children, ...props }, ref) => {
    const sanitizedProps = {};

    Object.entries(props).forEach(([key, value]) => {
      if (!filteredProps.has(key)) {
        sanitizedProps[key] = value;
      }
    });

    return React.createElement(tagName, { ...sanitizedProps, ref }, children);
  });

  MotionComponent.displayName = `Motion(${tagName})`;
  componentCache.set(tagName, MotionComponent);

  return MotionComponent;
}

export const motion = new Proxy(
  {},
  {
    get: (_, tagName) => createMotionComponent(tagName)
  }
);

export const AnimatePresence = ({ children }) => React.createElement(React.Fragment, null, children);

export function useScroll() {
  return { scrollYProgress: 0 };
}

export function useTransform(_value, _inputRange, outputRange) {
  return outputRange?.[0] ?? 0;
}
