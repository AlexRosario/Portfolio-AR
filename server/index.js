import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();
const PORT = 3001;

// Fix __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ✅ Serve the 'public' folder as static
app.use(express.static(path.join(__dirname, '../public')));
console.log('Serving static files from:', path.join(__dirname, '../public'));

app.listen(PORT, () => {
	console.log(`Server is running at http://localhost:${PORT}`);
});
