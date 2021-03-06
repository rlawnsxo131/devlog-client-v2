import { css } from '@emotion/react';
import media from '../../lib/styles/media';
import PopupBase from './PopupBase';
import Button from './Button';

interface PopupOkCancelProps {
  visible: boolean;
  title: string;
  message: string;
  onConfirm: () => Promise<void> | void;
  onCancel?: () => Promise<void> | void;
}

function PopupOkCancel({
  visible,
  title,
  message,
  onConfirm,
  onCancel,
}: PopupOkCancelProps) {
  return (
    <PopupBase visible={visible}>
      <div css={block}>
        <h3>{title}</h3>
        <p>{message}</p>
        <div css={buttonBlock}>
          {onCancel && (
            <Button color="darkGray" onClick={onCancel}>
              취소
            </Button>
          )}
          <Button color="indigo" onClick={onConfirm}>
            확인
          </Button>
        </div>
      </div>
    </PopupBase>
  );
}

const block = css`
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

const buttonBlock = css`
  display: flex;
  flex-flow: row wrap;
  justify-content: flex-end;
`;

export default PopupOkCancel;
