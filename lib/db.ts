import Dexie, { Table } from 'dexie';

// Define an interface for the visitorCount table
interface VisitorCount {
  id?: number;
  count: number;
}

// Extend the Dexie class to include the visitorCount table
class VisitorCountDB extends Dexie {
  visitorCount!: Table<VisitorCount>;

  constructor() {
    super('VisitorCountDB');
    this.version(1).stores({
      visitorCount: '++id, count',
    });
  }
}

// Create a new database
const db = new VisitorCountDB();

// Initialize the visitor count if not present
async function initializeDatabase() {
  const count = await db.visitorCount.get(1);
  if (!count) {
    await db.visitorCount.add({ count: 0 });
  }
}

initializeDatabase();

export default db;