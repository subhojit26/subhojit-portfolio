/**
 * Small animated illustrations at the top of each project card.
 * In profile.js, a project's `visual` field picks one of these by key.
 * To add one: write a component here, add it to `visuals`, style it in Projects.css.
 */

function JobsVisual() {
  const rows = [
    [70, 40, '98%'],
    [55, 35, '91%'],
    [62, 28, '87%'],
  ];
  return (
    <div className="vis-jobs">
      {rows.map(([a, b, score]) => (
        <div className="vis-job-row" key={score}>
          <i />
          <div>
            <span style={{ width: `${a}%` }} />
            <span style={{ width: `${b}%` }} />
          </div>
          <em>{score}</em>
        </div>
      ))}
      <div className="vis-toast">📬 6:00 AM · 12 new jobs for you</div>
    </div>
  );
}

function MailVisual() {
  return (
    <div className="vis-mail">
      <div className="ln" style={{ width: '60%' }} />
      <div className="ln" style={{ width: '90%' }} />
      <div className="ln" style={{ width: '75%' }} />
      <div className="ai">AI Reply</div>
      <div className="typed" />
    </div>
  );
}

export const visuals = {
  jobs: JobsVisual,
  mail: MailVisual,
};
