import fs from 'node:fs'

import sql from 'better-sqlite3'
import slugify from 'slugify';
import xss from 'xss';

const db = sql('meals.db')

import { IMealPayload, IMealResponse } from '@/app/meals/types';


export async function getMeals() {
  // await new Promise((resolve) => setTimeout(resolve, 5000));

  // throw new Error('Loading meals failed');
  return db.prepare('SELECT * FROM meals').all() as IMealResponse[];
}

export function getMeal(slug: string) {
  return db.prepare('SELECT * FROM meals WHERE slug = ?').get(slug) as IMealResponse;
}

export async function saveMeal(meal: IMealPayload) {
  meal.slug = slugify(meal.title, { lower: true });
  meal.instructions = xss(meal.instructions);

  const image = meal.image as File
  const extension = image.name.split('.').pop();
  const filename = `${meal.slug}.${extension}`;

  const stream = fs.createWriteStream(`public/assets/${filename}`);
  const bufferedImage = await image.arrayBuffer();

  stream.write(Buffer.from(bufferedImage), (error) => {
    if(error) {
      throw new Error('Saving image failed!');
    }
  });

  meal.image = `/assets/${filename}`;

  db.prepare(`
    INSERT INTO meals
      (title, summary, instructions, creator, creator_email, image, slug)
    VALUES (
      @title,
      @summary,
      @instructions,
      @creator,
      @creator_email,
      @image,
      @slug
    )
  `).run(meal);
}