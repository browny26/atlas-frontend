import { Table, TableBody, TableCell, TableHeader, TableRow } from "./ui/table";
import Badge from "./ui/Badge";

// Define the table data
const tableData = [
  {
    id: 1,
    intrests: ["food", "culture"],
    destination: "Tokyo",
    budget: "1.000",
    days: "5",
  },
  {
    id: 2,
    intrests: ["art", "music"],
    destination: "New York",
    budget: "300",
    days: "3",
  },
  {
    id: 3,
    intrests: ["history"],
    destination: "Rome",
    budget: "530",
    days: "7",
  },
  {
    id: 4,
    intrests: ["food", "adventure"],
    destination: "Austria",
    budget: "50",
    days: "2",
  },
];

export default function BasicTableOne() {
  return (
    <div className="overflow-hidden border border-gray-100 bg-white shadow">
      <div className="max-w-full overflow-x-auto">
        <Table>
          {/* Table Header */}
          <TableHeader className="border-b border-gray-100">
            <TableRow>
              <TableCell
                isHeader
                className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs"
              >
                Destination
              </TableCell>
              <TableCell
                isHeader
                className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs"
              >
                Interests
              </TableCell>
              <TableCell
                isHeader
                className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs"
              >
                Days
              </TableCell>
              <TableCell
                isHeader
                className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs"
              >
                Budget
              </TableCell>
            </TableRow>
          </TableHeader>

          {/* Table Body */}
          <TableBody className="divide-y divide-gray-100">
            {tableData.map((order) => (
              <TableRow key={order.id}>
                <TableCell className="px-5 py-4 sm:px-6 text-start">
                  {order.destination}
                </TableCell>
                <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm space-x-2">
                  {order.intrests.map((intrest, idx) => (
                    <Badge
                      key={idx}
                      size="sm"
                      color="info" // puoi gestire i colori dinamici se vuoi
                    >
                      {intrest}
                    </Badge>
                  ))}
                </TableCell>
                <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm">
                  {order.days}
                </TableCell>
                <TableCell className="px-4 py-3 text-gray-500 text-theme-sm">
                  {order.budget}€
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
