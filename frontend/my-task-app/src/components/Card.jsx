
export const Card = ({ children, className = "", ...props }) => (
  <div
    className={`rounded-xl bg-white shadow-sm border border-gray-200 ${className}`}
    {...props}
  >
    {children}
  </div>
);

export const CardContent = ({ children, className = "" }) => (
  <div className={`p-3 ${className}`}>{children}</div>
);
