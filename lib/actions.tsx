'use server';

import { IMealPayload } from "@/app/meals/types";
import { saveMeal } from "./meals";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

interface FormState {
  message: string | null;
 }

 interface FormDataPayload {
  [key: string]: any;
 }

function isInvalidText(text?: string | null) {
  return !text || text.trim() === ''
}

export async function handleShareMeal(prevState: FormState, formData: FormDataPayload) {
  const image = formData.get('image') as File

  const meal: IMealPayload = {
    title: formData.get('title') as string,
    summary: formData.get('summary') as string,
    instructions: formData.get('instructions') as string,
    image,
    creator: formData.get('name') as string,
    creator_email: formData.get('email') as string,
  }

  if(
    isInvalidText(meal.title) ||
    isInvalidText(meal.summary) ||
    isInvalidText(meal.instructions) ||
    isInvalidText(meal.creator) ||
    isInvalidText(meal.creator_email) ||
    !meal.creator_email.includes('@') ||
    !image || image.size === 0
  ) {
    return {
      message: 'Invalid input'
    }
  }

  await saveMeal(meal);
  revalidatePath('/meals');
  redirect('/meals');
}