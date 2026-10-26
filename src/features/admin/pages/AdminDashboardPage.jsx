import { useAdmin } from "../hooks/useAdmin";
import Button from "../../../components/common/Button";
import Loader from "../../../components/common/Loader";
import ErrorMessage from "../../../components/common/ErrorMessage";

export default function AdminDashboardPage() {
  const { applications, reports, isLoading, error, approveApplication, rejectApplication, resolveReport } = useAdmin();

  if (isLoading) return <Loader label="Loading admin dashboard..." />;

  return (
    <div className="max-w-3xl mx-auto mt-10 space-y-10">
      <ErrorMessage message={error} />

      <section>
        <h2 className="text-lg font-semibold mb-3">Pending tutor applications</h2>
        {applications.map((app) => (
          <div key={app.id} className="border rounded-md p-3 mb-2 flex justify-between items-center">
            <div>
              <p className="font-medium">{app.applicant?.fullName}</p>
              <p className="text-sm text-gray-500">{app.institutionName} — {app.educationLevel}</p>
            </div>
            <div className="flex gap-2">
              <Button onClick={() => approveApplication(app.id)}>Approve</Button>
              <Button variant="danger" onClick={() => rejectApplication(app.id, "Did not meet criteria")}>Reject</Button>
            </div>
          </div>
        ))}
      </section>

      <section>
        <h2 className="text-lg font-semibold mb-3">Open reports</h2>
        {reports.map((report) => (
          <div key={report.id} className="border rounded-md p-3 mb-2 flex justify-between items-center">
            <div>
              <p className="text-sm">{report.reason}</p>
              <p className="text-xs text-gray-500">{report.targetType}</p>
            </div>
            <div className="flex gap-2">
              <Button onClick={() => resolveReport(report.id, "ACTION_TAKEN")}>Action taken</Button>
              <Button variant="secondary" onClick={() => resolveReport(report.id, "DISMISSED")}>Dismiss</Button>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}
