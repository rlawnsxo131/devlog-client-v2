import { keyframes } from 'styled-components';

const slideLeft = keyframes`
  0% {
    transform: translateX(100%);
  }
  100% {
    transform: translateX(0%);
  };
`;

const slideRight = keyframes`
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(0%);
  };
`;

const fadeIn = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`;

const fadeOut = keyframes`
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
`;

const popInFromBottom = keyframes`
  0% {
    opacity: 0;
    transform: translateY(400px) scale(0.75);
  }
  75% {
    opacity: 1;
    transform: translateY(-16px) scale(1.0);
  }
  100% {
    opacity: 1;
    transform: translateY(0px);
  }`;

const popOutToBottom = keyframes`
  0% {
    opacity: 1;
    transform: translateY(0px) scale(1.0);
  }
  100% {
    opacity: 0;
    transform: translateY(400px) scale(0.75);
  }`;

const shake = keyframes`
  0% {
      transform: translate(-30px);
  }
  25% {
      transform: translate(15px);
  }
  50% {
      transform: translate(-10px);
  }
  75% {
      transform: translate(5px);
  }
  100% {
      transform: translate(0px);
  }
`;

const shining = keyframes`
   0% {
    opacity: 0.5;
  }
  50% {
    opacity: 1;
  }
  100% {
    opacity: 0.5;
  }
`;

const transitions = {
  slideLeft,
  slideRight,
  fadeIn,
  fadeOut,
  popInFromBottom,
  popOutToBottom,
  shake,
  shining,
};

export default transitions;
