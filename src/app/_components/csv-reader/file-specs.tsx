import { DialogDescription, DialogHeader, DialogTitle } from "../ui/dialog";

export const FileSpecs = () => (
  <DialogHeader>
    <DialogTitle>Upload file</DialogTitle>
    <DialogDescription>
      Upload a <code>.csv</code> file to import transactions in bulk. The file
      must be comma-separated and include the following columns{" "}
      <strong>in this order</strong>:
      <ul className="list-disc pl-6">
        <li>
          <strong>name</strong>
        </li>
        <li>
          <strong>type</strong> (INCOME | EXPENSE | INVESTMENT |
          INVESTMENT_WITHDRAWAL)
        </li>
        <li>
          <strong>amount</strong> (format: 10.00)
        </li>
        <li>
          <strong>date</strong> (format: dd/mm/yyyy)
        </li>
        <li>
          <strong>method</strong> (optional) (PIX | CARD | CASH | OTHER)
        </li>
      </ul>
    </DialogDescription>
  </DialogHeader>
);
