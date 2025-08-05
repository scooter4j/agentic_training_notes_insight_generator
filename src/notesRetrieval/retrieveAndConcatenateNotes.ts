//import * as fs from 'fs';
import * as path from 'path';
import * as fs from "node:fs";

// Function to extract the date from the "Title:" field in the file
function extractDateFromTitle(title: string): Date | null {
    const dateMatch = title.match(/Training Notes, (\d{2}\/\d{2}\/\d{2})/);
    if (dateMatch) {
        const dateStr = dateMatch[1];
        const [month, day, year] = dateStr.split('/').map((part) => parseInt(part, 10));
        // Adjust the year to be 20yy (as the format is MM/DD/YY)
        const fullYear = 2000 + year;
        return new Date(fullYear, month - 1, day);
    }
    return null;
}

// Function to read files from a directory and process them
/*export async function concatenateNotes(directory: string | undefined, outputFile?: string): Promise<string> {
    console.log(`[concatenateNotes]: entering 'execute'`);
    directory = directory || process.cwd();
    try {
        const files = fs.readdirSync(directory).filter((file) => file.endsWith('.txt'));

        const fileDetails: { filename: string; content: string; date: Date | null }[] = [];

        // Read each file and extract the date from the "Title:"
        for (const file of files) {
            const filePath = path.join(directory, file);
            const content = fs.readFileSync(filePath, 'utf-8');

            // Assuming the first line contains the "Title:" field
            const titleLine = content.split('\n')[0];
            const fileDate = extractDateFromTitle(titleLine);

            fileDetails.push({
                filename: file,
                content: content,
                date: fileDate,
            });
        }

        // Sort files by date (newest to oldest)
        fileDetails.sort((a, b) => {
            if (!a.date || !b.date) return 0;
            return b.date.getTime() - a.date.getTime();
        });

        // Concatenate files, separated by "====="
        let concatenatedNotes = '';

        for (const fileDetail of fileDetails) {
            concatenatedNotes += `\n\n${'='.repeat(50)}\n\n`; // Separator line
            concatenatedNotes += fileDetail.content;
        }

        // Write the master file if output file is specified
        if (outputFile) {
            fs.writeFileSync(outputFile, concatenatedNotes);
            console.log('Master file has been created successfully.');
        }
        return concatenatedNotes;
    } catch (error) {
        console.error('Error reading or processing files:', error);
        throw error;
    }
}*/
