import { parse } from 'csv-parse';
import fs from 'node:fs';

const filePath = new URL('./tasks.csv', import.meta.url);

const csvParse = parse({
  delimiter: ',',
  fromLine: 2,
  skipEmptyLines: true,
});

async function execute() {
  const lines = fs.createReadStream(filePath).pipe(csvParse);

  for await (const line of lines) {
    const [title, description] = line;

    await fetch('http://localhost:3333/tasks', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title,
        description,
      })
    })
  }

}

execute()