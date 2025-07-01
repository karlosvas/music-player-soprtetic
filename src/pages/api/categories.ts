import type { APIRoute } from "astro";
import { deleteCategory, getAllCategories, insertCategory } from "../../db/db";

// Obtener todas las categorías
export const GET: APIRoute = async () => {
  try {
    const categories = getAllCategories();
    return new Response(JSON.stringify(categories), { status: 200 });
  } catch (error) {
    console.error("Error fetching categories:", error);
    return new Response(JSON.stringify({ error: "Failed to fetch categories" }), { status: 500 });
  }
};

// Añadir una nueva categoría
export const POST: APIRoute = async ({ request }) => {
  try {
    const { name } = await request.json();

    if (!name) return new Response(JSON.stringify({ error: "Missing required field: name" }), { status: 400 });

    insertCategory(name);
    return new Response(JSON.stringify({ success: true }), { status: 201 });
  } catch (error) {
    console.error("Error inserting category:", error);
    return new Response(JSON.stringify({ error: "Failed to insert category" }), { status: 500 });
  }
};

// Eliminar una categoría
export const DELETE: APIRoute = async ({ request }) => {
  try {
    const { name } = await request.json();

    if (!name) return new Response(JSON.stringify({ error: "Missing required field: name" }), { status: 400 });

    deleteCategory(name);
    return new Response(null, { status: 204 });
  } catch (error) {
    console.error("Error deleting category:", error);
    return new Response(JSON.stringify({ error: "Failed to delete category" }), { status: 500 });
  }
};
