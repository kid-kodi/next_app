import { promises as fs } from "fs";
import path from "path";
import { z } from "zod";
import { taskSchema } from "./types";

// Simulate a database read for tasks.
export async function getUsers() {
  const data = await fs.readFile(
    path.join(process.cwd(), "src/data/tasks.json")
  );

  const tasks = JSON.parse(data.toString());

  return z.array(taskSchema).parse(tasks);
}

// Simulate a database read for tasks.
export async function getTasks() {
    const data = await fs.readFile(
      path.join(process.cwd(), "src/data/tasks.json")
    );
  
    const tasks = JSON.parse(data.toString());
  
    return z.array(taskSchema).parse(tasks);
  }

  // Simulate a database read for tasks.
export async function saveActivityLogsNotification() {
    const data = await fs.readFile(
      path.join(process.cwd(), "src/data/tasks.json")
    );
  
    const tasks = JSON.parse(data.toString());
  
    return z.array(taskSchema).parse(tasks);
  }

  // Simulate a database read for tasks.
export async function sendInvitation() {
    const data = await fs.readFile(
      path.join(process.cwd(), "src/data/tasks.json")
    );
  
    const tasks = JSON.parse(data.toString());
  
    return z.array(taskSchema).parse(tasks);
  }