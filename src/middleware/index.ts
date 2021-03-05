import { Application } from '@/declarations';
import schemas from './schemas';

const middlewares: ((app: Application) => void)[] = [
  schemas,
];

export default middlewares;
