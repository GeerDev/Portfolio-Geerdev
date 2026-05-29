export { basics } from './basics';
export { work } from './work';
export { volunteer } from './volunteer';
export { education } from './education';
export { awards } from './awards';
export { publications } from './publications';
export { skills } from './skills';
export { languages } from './languages';
export { projects } from './projects';
export { blog } from './blog';
export { reviews } from './reviews';

import * as all from './basics';
import * as _work from './work';
import * as _volunteer from './volunteer';
import * as _education from './education';
import * as _awards from './awards';
import * as _publications from './publications';
import * as _skills from './skills';
import * as _languages from './languages';
import * as _projects from './projects';
import * as _blog from './blog';
import * as _reviews from './reviews';

const combined = {
  basics: (all as any).basics,
  work: (_work as any).work,
  volunteer: (_volunteer as any).volunteer,
  education: (_education as any).education,
  awards: (_awards as any).awards,
  publications: (_publications as any).publications,
  skills: (_skills as any).skills,
  languages: (_languages as any).languages,
  projects: (_projects as any).projects,
  blog: (_blog as any).blog,
  reviews: (_reviews as any).reviews
};

export default combined;
