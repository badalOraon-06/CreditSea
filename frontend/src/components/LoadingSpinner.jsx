import './LoadingSpinner.css';

export default function LoadingSpinner({ size = 40 }) {
  const style = { width: size, height: size };
  return (
    <div className="loading-spinner" style={style} aria-label="Loading" />
  );
}
