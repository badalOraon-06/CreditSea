import './BasicDetailsCard.css';

export default function BasicDetailsCard({ basicDetails, creditScore }) {
  return (
    <div className="basic-card">
      <div className="basic-left">
        <h3>{basicDetails?.fullName || 'N/A'}</h3>
        <div className="meta">
          <span className="pan">{basicDetails?.pan || 'PAN N/A'}</span>
          {basicDetails?.mobileNumber && <span className="mobile">{basicDetails.mobileNumber}</span>}
        </div>
      </div>
      <div className="basic-right">
        <div className="score">{creditScore?.score ?? '—'}</div>
        <div className="score-label">Score</div>
      </div>
    </div>
  );
}
