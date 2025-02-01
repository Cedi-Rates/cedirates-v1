"use client";
import { Table } from "@medusajs/ui";
import { EmptyState } from "../ui/empty-state-watchlist";

const EmptyStateTable = () => {
  return (
    <>
      <div className="w-full overflow-x-scroll lg:overflow-x-hidden">
        <Table className="border-b border-black/5">
          <tr>
            <td colSpan={5}>
              <EmptyState />
            </td>
          </tr>
        </Table>
      </div>
    </>
  );
};

export default EmptyStateTable;
