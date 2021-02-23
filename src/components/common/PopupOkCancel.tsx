import styled from 'styled-components';
import media from '../../lib/styles/media';
import PopupBase from './PopupBase';

type PopupOkCancelProps = {
  visible: boolean;
  title: string;
  message: string;
  onConfirm: () => Promise<void> | void;
};

function PopupOkCancel({ visible, onConfirm }: PopupOkCancelProps) {
  return (
    <PopupBase visible={visible}>
      <Block></Block>
    </PopupBase>
  );
}

const Block = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1.725rem 1.5rem;
  h3 {
    margin: 0;
  }
  p {
    line-height: 1.75;
    word-break: break-word;
    overflow-wrap: break-word;
    display: -webkit-box;
  }
  ${media.xsmall} {
    width: calc(100vw - 2rem);
  }
  ${media.small} {
    width: 25rem;
  }
`;

export default PopupOkCancel;
