
import { runPipeline } from './orchestrator/pipeline';
const url = process.argv[2];
if (!url) throw new Error('URL required');
runPipeline(url);
