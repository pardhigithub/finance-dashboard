const RoleSwitcher = ({ role, setRole }) => {
  return (
    <div className="mb-4 flex flex-col sm:flex-row">
      <select
        value={role}
        onChange={(e) => setRole(e.target.value)}
        className="p-2 border rounded"
      >
        <option value="viewer">Viewer</option>
        <option value="admin">Admin😏</option>
      </select>
    </div>
  );
};

export default RoleSwitcher;