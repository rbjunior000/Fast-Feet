import React, { useState, useEffect, useRef } from 'react';
import { MoreHoriz } from '@material-ui/icons';

import { Container, Badge, Box } from './styles';

export default ({ options = [], id }) => {
  const [visible, setVisible] = useState(false);
  const ref = useRef();

  function useOnClickOutside(ref, handler) {
    useEffect(() => {
      const listener = event => {
        if (!ref.current || ref.current.contains(event.target)) {
          return;
        }

        handler(event);
      };

      document.addEventListener('mousedown', listener);
      document.addEventListener('touchstart', listener);

      return () => {
        document.removeEventListener('mousedown', listener);
        document.removeEventListener('touchstart', listener);
      };
    }, [ref, handler]);
  }

  return (
    <Container>
      <Badge onClick={() => setVisible(!visible)} visible={!visible}>
        <MoreHoriz />
      </Badge>
      <Box
        onClick={useOnClickOutside(ref, () => setVisible(false))}
        ref={ref}
        visible={visible}
      >
        <div className="divisor">
          <ul>
            {options.map(item => (
              <li>
                <img src={item.image} alt={item.title} />
                <button
                  type="button"
                  onClick={() => {
                    item.handleClick(id);
                    setVisible(false);
                  }}
                >
                  {item.title}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </Box>
    </Container>
  );
};
