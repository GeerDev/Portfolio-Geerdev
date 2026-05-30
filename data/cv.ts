export { basics } from './basics';
export { work } from './work';
export { volunteer } from './volunteer';
export { education } from './education';
export { awards } from './awards';
export { reviews } from './reviews';

import * as all from './basics';
import * as _work from './work';
import * as _volunteer from './volunteer';
import * as _education from './education';
import * as _awards from './awards';
import * as _reviews from './reviews';

const combined = {
  basics: (all as any).basics,
  work: (_work as any).work,
  volunteer: (_volunteer as any).volunteer,
  education: (_education as any).education,
  awards: (_awards as any).awards,
  reviews: (_reviews as any).reviews
};

export default combined;
