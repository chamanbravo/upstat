import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "../ui/button";
import Link from "next/link";
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
            <TableHead>Slug</TableHead>
            <TableHead></TableHead>
            <TableHead></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data?.map((i: any) => (
            <TableRow key={i.id}>
              <TableCell>{i.name}</TableCell>
              <TableCell>{i.slug}</TableCell>
              <TableCell>
                <Button variant="outline" className="h-[30px]">
                  <Link href={`/status/${i.slug}`}>Visit</Link>
                </Button>
              </TableCell>
              <TableCell className="w-10">
                <DataTableActions id={i.id} slug={i.slug} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
