import React from 'react';
import ClassNames from 'classnames';
import { Transition, animated } from 'react-spring/renderprops';
import PropTypes from 'prop-types';

import './AnimatedNumbers.scss';

/**
 * List of separtors
 */
const separators = [',', '.'];


/**
 * Renders an animated JS locale formatted number string
 * @param value
 * @param fontSize
 * @param locale
 * @param format
 * @return {*}
 * @constructor
 */
const AnimatedNumbersComponent = ({ value, fontSize, locale, formatOptions, className }) => {
  const valueStr = (Number(value) || Number(0)).toLocaleString(locale, formatOptions);
  const valueStrArray = valueStr.split('');

  const fontSizeValue = fontSize || 40;
  const fontWidth = fontSizeValue * 0.5; // font width is estimated to half the font size

  // Creates animating list where the position of a number/separator depends on the preceding number/separator
  const { items, totalWidth } = valueStrArray.reduce((acc, val, i) => {
    const precedingItem = acc.items[i - 1];
    const currentItem = { value: val, x: 0, y: fontWidth, key: `${i}-${val}` };

    if (precedingItem) {
      currentItem.x = separators.includes(precedingItem.value)
        ? precedingItem.x + fontWidth * 0.5
        : precedingItem.x + fontWidth;
    }

    acc.items.push(currentItem);
    acc.totalWidth += currentItem.x - acc.totalWidth;

    return acc;
  }, {
    items: [],
    totalWidth: 0
  });

  const wrapWidth = totalWidth + fontWidth; // width of container

  const cellStyle = { position: 'absolute', left: 0 };
  const springConfig = { mass: 4, tension: 100, friction: 10 };

  const classNames = ClassNames('numberFormatContainer', className);

  return (
    <div className={classNames}>
      <div style={{ width: wrapWidth }} className="numberFormatWrap">
        <Transition
          items={items}
          initial={null}
          keys={v => v.key}
          from={({ y }) => ({ y: -y, opacity: 0 })}
          enter={({ x }) => ({ y: 0, x, opacity: 1 })}
          // update={({ y, x }) => ({ y, x, opacity: 1 })}
          leave={({ y, x }) => ({ y, x, opacity: 0 })}
          config={springConfig}
          trail={200}
        >
          {item => ({ opacity, x, y }) => (
            <animated.span
              style={{
                ...cellStyle,
                opacity,
                fontSize: fontSizeValue,
                transform: `translate3d(${x}px,${y}px,0px)`,
              }}
            >
              {item.value}
            </animated.span>
          )}
        </Transition>
      </div>
    </div>
  );
};


AnimatedNumbersComponent.propTypes = {
  value: PropTypes.number.isRequired,
  fontSize: PropTypes.number,
  locale: PropTypes.string,
  formatOptions: PropTypes.object,
};


export default AnimatedNumbersComponent;
