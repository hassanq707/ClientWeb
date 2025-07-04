import { FiCopy } from 'react-icons/fi';
import { Tooltip } from 'react-tooltip';
import 'react-tooltip/dist/react-tooltip.css';

const ClipboardIcon = ({ id, textToCopy }) => {
  const handleCopy = () => {
    navigator.clipboard.writeText(textToCopy);
    const tooltip = document.getElementById(`tooltip-${id}`);
    if (tooltip) {
      tooltip.innerHTML = 'Copied!';
      setTimeout(() => {
        tooltip.innerHTML = 'Copy to clipboard!';
      }, 2000);
    }
  };

  return (
    <>
      <span
        onClick={handleCopy}
        className="cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity p-1 hover:bg-white/20 rounded"
        data-tooltip-id={`tooltip-${id}`}
        data-tooltip-content="Copy to clipboard"
        role="button"
        aria-label="Copy to clipboard"
      >
        <FiCopy className="text-gray-600 hover:text-indigo-600" size={14} />
      </span>
      <Tooltip id={`tooltip-${id}`} />
    </>
  );
};

export default ClipboardIcon;
