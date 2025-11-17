// Module 1 - TypeScript Study Tracker
// This program tracks small study sessions using the Kaizen idea:
// continuous improvement through small daily efforts.

// ----- Class definition (Classes requirement) -----
class StudySession {
  constructor(
    public title: string,
    public minutes: number,
    public completed: boolean = false
  ) {}

  describe(): string {
    return `${this.title} - ${this.minutes} min - ${
      this.completed ? "Done" : "Pending"
    }`;
  }
}

// ----- Initial list of sessions (Lists requirement) -----
const initialSessions: StudySession[] = [
  new StudySession("Read TypeScript docs", 20, true),
  new StudySession("Practice functions and types", 25, true),
  new StudySession("Review async/await", 15, false),
  new StudySession("Refactor previous code", 30, false)
];

// ----- Recursive function to sum minutes (Recursion requirement) -----
function totalMinutes(sessions: StudySession[], index: number = 0): number {
  if (index >= sessions.length) {
    return 0;
  }
  return sessions[index].minutes + totalMinutes(sessions, index + 1);
}

// ----- Async function to simulate loading extra sessions (Async requirement) -----
async function loadExtraSessions(): Promise<StudySession[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const extra: StudySession[] = [
        new StudySession("Watch a tutorial video", 15, true),
        new StudySession("Write documentation", 20, false)
      ];
      resolve(extra);
    }, 400); // simulate small delay
  });
}

// ----- Main tracker logic (Output + Exceptions + Orchestration) -----
async function runStudyTracker(): Promise<void> {
  console.log("=== TypeScript Study Tracker ===\n");

  console.log("Initial study sessions:");
  initialSessions.forEach((session, i) => {
    console.log(`${i + 1}. ${session.describe()}`);
  });

  const initialTotal = totalMinutes(initialSessions);
  console.log(`\nTotal planned minutes (initial): ${initialTotal} min\n`);

  try {
    const extraSessions = await loadExtraSessions();

    if (extraSessions.length === 0) {
      // Demonstrate throwing and handling an exception
      throw new Error("No extra study sessions were loaded.");
    }

    console.log("Extra study sessions loaded:");
    extraSessions.forEach((session, i) => {
      console.log(`E${i + 1}. ${session.describe()}`);
    });

    const allSessions = [...initialSessions, ...extraSessions];
    const combinedTotal = totalMinutes(allSessions);

    console.log(
      `\nCombined total minutes (initial + extra): ${combinedTotal} min`
    );
  } catch (error) {
    console.error(
      "Error while loading extra sessions:",
      (error as Error).message
    );
  }

  console.log(
    "\nReminder: Small, consistent study sessions lead to real progress.\n"
  );
}

// ----- Program entry point -----
runStudyTracker().catch((error) => {
  console.error("Unexpected error:", (error as Error).message);
});
