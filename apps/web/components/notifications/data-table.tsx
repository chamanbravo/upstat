import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import DataTableActions from "./data-table-actions";

interface Props {
  data: any;
}

export default function DataTable({ data }: Props) {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Provider</TableHead>
            <TableHead></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data?.map((i: any) => (
            <TableRow key={i.id}>
              <TableCell>{i.name}</TableCell>
              <TableCell>{i.provider}</TableCell>
              <TableCell className="w-10">
                <DataTableActions id={i.id} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
