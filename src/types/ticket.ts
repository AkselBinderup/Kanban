import type { Priority, Status } from "./auth";

export interface Ticket {
  ticketId: number;
  title: string;
  description: string;
  reporter: string;
  assignedSupporter: string | null;
  priority: Priority;
  status: Status;
  blockedReason: string | null;
  createdAt: string;
}