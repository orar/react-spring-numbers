
const wrapWidth = totalWidth + fontWidth; // width of container

return (
  <div className="numberFormatContainer">
    <div style={{ width: wrapWidth }} className="numberFormatWrap">
      <Transition
        items={items}
        initial={null}
        keys={v => v.key}
        from={({ y }) => ({ y: -y, opacity: 0 })}
        enter={({ x }) => ({ y: 0, x, opacity: 1 })}
        leave={({ y, x }) => ({ y, x, opacity: 0 })}
        config={{ mass: 4, tension: 100, friction: 15 }}
        trail={200}
      >
        {item => ({ opacity, x, y }) => (
          <animated.span
            style={{
              opacity,
              position: 'absolute',
              left: 0,
              fontSize: fontSizeValue,
              transform: `translate3d(${x}px,${y}px,0px)`, // set text in position as if it's rendered as normal
            }}
          >
            {item.value}
          </animated.span>
        )}
      </Transition>
    </div>
  </div>
);
