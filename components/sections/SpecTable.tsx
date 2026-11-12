import { specColumns, specRows } from "@/data/model-y-specs";

const cell = "border-b border-black/15 px-6 py-4 align-top";

export function SpecTable() {
  return (
    <div
      tabIndex={0}
      role="region"
      aria-label="Хувилбаруудын харьцуулсан хүснэгт"
      className="w-full overflow-x-auto rounded-card bg-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-tesla-red-dark"
    >
      <table className="w-full min-w-[880px] text-left">
        <thead>
          <tr>
            {specColumns.map((column) => (
              <th key={column} scope="col" className={`${cell} font-semibold`}>
                {column}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {specRows.map((row, index) => (
            <tr key={index} className="last:*:border-b-0">
              <th scope="row" className={`${cell} font-medium`}>
                {row.label}
              </th>
              {row.values.map((value, column) => (
                <td key={column} className={cell}>
                  {value}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
